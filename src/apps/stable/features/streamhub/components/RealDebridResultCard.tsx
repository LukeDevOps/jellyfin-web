import React, { type FC } from 'react';
import type { DebridSearchResult } from '../types';

interface Props {
    result: DebridSearchResult;
    onStream: (magnetUrl: string) => void;
    isStreaming: boolean;
}

const formatBytes = (bytes: number) => {
    if (bytes === 0) return '—';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const QUALITY_STYLES: Record<string, { background: string; color: string }> = {
    '4K':    { background: '#7c3aed', color: '#fff' },
    '1080p': { background: '#1d4ed8', color: '#fff' },
    '720p':  { background: '#0f766e', color: '#fff' },
    '480p':  { background: '#71717a', color: '#fff' },
    'SD':    { background: '#3f3f46', color: '#a1a1aa' },
};

const RealDebridResultCard: FC<Props> = ({ result, onStream, isStreaming }) => {
    const badgeStyle = QUALITY_STYLES[result.quality] ?? QUALITY_STYLES['SD'];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 5em 8em',
            alignItems: 'center',
            gap: '1em',
            padding: '0.75em 1em',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            minWidth: 0
        }}>
            {/* Title */}
            <div style={{ minWidth: 0 }}>
                <div style={{
                    fontWeight: 600,
                    fontSize: '0.9em',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: 'var(--text-color)'
                }}>
                    {result.title}
                </div>
                <div style={{ fontSize: '0.75em', color: 'var(--text-color-secondary)', marginTop: '0.2em' }}>
                    {formatBytes(result.size)} &bull; {result.seeders} seeders &bull; {result.indexer}
                </div>
            </div>

            {/* Quality badge */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span style={{
                    ...badgeStyle,
                    fontSize: '0.7em',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    padding: '0.25em 0.6em',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap'
                }}>
                    {result.quality}
                </span>
            </div>

            {/* Stream button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    className='raised button-submit emby-button'
                    onClick={() => onStream(result.magnetUrl)}
                    disabled={isStreaming}
                    style={{ width: '100%', fontSize: '0.8em' }}
                >
                    {isStreaming ? 'Loading…' : '▶ Stream'}
                </button>
            </div>
        </div>
    );
};

export default RealDebridResultCard;
