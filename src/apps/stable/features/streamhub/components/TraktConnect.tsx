import React, { type FC, useState } from 'react';
import { useStartTraktAuth, usePollTraktAuth } from '../api/useTraktAuth';

const TraktConnect: FC = () => {
    const [authData, setAuthData] = useState<{ userCode: string; verificationUrl: string; deviceCode: string; interval: number } | null>(null);

    const startAuth = useStartTraktAuth();
    const poll = usePollTraktAuth(authData?.deviceCode ?? null, authData?.interval ?? 5);

    const handleConnect = async () => {
        const data = await startAuth.mutateAsync();
        setAuthData(data);
    };

    if (authData && !poll.data?.authenticated) {
        return (
            <div style={{ textAlign: 'center', padding: '1.5em 0' }}>
                <p style={{ marginBottom: '0.5em', color: 'var(--text-color-secondary)', fontSize: '0.9em' }}>
                    Go to <strong style={{ color: 'var(--text-color)' }}>{authData.verificationUrl}</strong> and enter this code:
                </p>
                <div style={{
                    display: 'inline-block',
                    fontSize: '2em',
                    fontWeight: 'bold',
                    letterSpacing: '0.2em',
                    padding: '0.3em 0.8em',
                    border: '2px solid var(--accent-color, #00a4dc)',
                    borderRadius: '8px',
                    marginBottom: '0.75em'
                }}>
                    {authData.userCode}
                </div>
                <p style={{ color: 'var(--text-color-secondary)', fontSize: '0.8em' }}>
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
        </div>
    );
};

export default TraktConnect;
