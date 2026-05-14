import React, { type FC, useState } from 'react';
import { useStartTraktAuth, usePollTraktAuth } from '../api/useTraktAuth';

type PendingAuth = { userCode: string; verificationUrl: string; deviceCode: string; interval: number };

const TraktConnect: FC = () => {
    const [authData, setAuthData] = useState<PendingAuth | null>(null);
    const [copied, setCopied] = useState(false);

    const startAuth = useStartTraktAuth();
    const poll = usePollTraktAuth(authData?.deviceCode ?? null, authData?.interval ?? 5);

    const handleConnect = () => {
        setAuthData(null);
        startAuth.mutate(undefined, { onSuccess: setAuthData });
    };

    const handleCopy = () => {
        if (authData?.userCode) {
            void navigator.clipboard.writeText(authData.userCode).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    if (authData && !poll.data?.authenticated) {
        return (
            <div style={{ textAlign: 'center', padding: '1.5em 0', width: '100%', maxWidth: '60em' }}>
                <p style={{ marginBottom: '0.75em', color: 'var(--text-color-secondary)', fontSize: '0.9em' }}>
                    Go to{' '}
                    <a href={authData.verificationUrl} target='_blank' rel='noreferrer'
                        style={{ color: 'var(--accent-color, #00a4dc)' }}>
                        {authData.verificationUrl}
                    </a>
                    {' '}and enter this code:
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75em' }}>
                    <div style={{
                        fontSize: '2em',
                        fontWeight: 'bold',
                        letterSpacing: '0.2em',
                        padding: '0.3em 0.8em',
                        border: '2px solid var(--accent-color, #00a4dc)',
                        borderRadius: '8px',
                        userSelect: 'text'
                    }}>
                        {authData.userCode}
                    </div>
                    <button
                        className='emby-button'
                        onClick={handleCopy}
                        title={copied ? 'Copied!' : 'Copy code'}
                        style={{ padding: '0.3em', background: 'none', border: 'none', cursor: 'pointer', opacity: copied ? 0.5 : 1 }}
                    >
                        <span className='material-icons' style={{ fontSize: '1.5em', verticalAlign: 'middle' }}>
                            {copied ? 'check' : 'content_copy'}
                        </span>
                    </button>
                </div>
                <p style={{ color: 'var(--text-color-secondary)', fontSize: '0.8em', marginTop: '0.75em' }}>
                    Waiting for activation...
                </p>
            </div>
        );
    }

    return (
        <div style={{ textAlign: 'center', padding: '1.5em 0' }}>
            <p style={{ color: 'var(--text-color-secondary)', marginBottom: '0.75em', fontSize: '0.9em' }}>
                Connect Trakt to see your watch history
            </p>
            <button
                className='raised emby-button'
                onClick={handleConnect}
                disabled={startAuth.isPending}
                style={{ fontSize: '0.9em' }}
            >
                {startAuth.isPending ? 'Connecting...' : 'Connect with Trakt'}
            </button>
            {startAuth.isError && (
                <p style={{ color: 'var(--error-color, #cc0000)', marginTop: '0.5em', fontSize: '0.85em' }}>
                    {(startAuth.error as any)?.response?.data || (startAuth.error as any)?.message || 'Connection failed'}
                </p>
            )}
        </div>
    );
};

export default TraktConnect;
