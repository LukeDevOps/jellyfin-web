import React, { type FC } from 'react';
import type { DebridSearchResult } from '../types';

interface Props {
    result: DebridSearchResult;
    onStream: (magnetUrl: string) => void;
    isStreaming: boolean;
}

const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const RealDebridResultCard: FC<Props> = ({ result, onStream, isStreaming }) => (
    <div className='card squareCard scalableCard squareCard-scalable'>
        <div className='cardBox'>
            <div className='cardScalable'>
                <div className='cardPadder cardPadder-square' />
                <div className='cardContent'>
                    <div style={{ padding: '0.75em', display: 'flex', flexDirection: 'column', gap: '0.4em', height: '100%' }}>
                        <div className='cardText' style={{ fontWeight: 'bold', fontSize: '0.85em' }}>
                            {result.title}
                        </div>
                        <div className='cardText secondary' style={{ fontSize: '0.75em', color: 'var(--text-color-secondary)' }}>
                            {formatBytes(result.size)} &bull; {result.seeders} seeders &bull; {result.indexer}
                        </div>
                        <div style={{ marginTop: 'auto' }}>
                            <button
                                className='raised button-submit emby-button'
                                onClick={() => onStream(result.magnetUrl)}
                                disabled={isStreaming}
                                style={{ width: '100%', fontSize: '0.8em' }}
                            >
                                {isStreaming ? 'Loading...' : '▶ Stream'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default RealDebridResultCard;
