import React, { type FC } from 'react';
import type { TraktHistoryItem } from '../types';

interface Props {
    item: TraktHistoryItem;
    onSearch: (query: string) => void;
}

const TraktHistoryCard: FC<Props> = ({ item, onSearch }) => {
    const isMovie = item.type === 'movie';
    const title = isMovie ? item.movie?.title : item.show?.title;
    const year = isMovie ? item.movie?.year : item.show?.year;
    const subtitle = isMovie
        ? `${year}`
        : `S${String(item.episode?.season).padStart(2, '0')}E${String(item.episode?.number).padStart(2, '0')} · ${item.episode?.title}`;

    return (
        <button
            className='card squareCard scalableCard squareCard-scalable'
            style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, textAlign: 'left' }}
            onClick={() => title && onSearch(title)}
            title={`Search for "${title}"`}
        >
            <div className='cardBox'>
                <div className='cardScalable'>
                    <div className='cardPadder cardPadder-square' />
                    <div className='cardContent' style={{ background: 'var(--card-background, rgba(255,255,255,0.05))', borderRadius: '4px' }}>
                        <div style={{ padding: '0.75em', display: 'flex', flexDirection: 'column', gap: '0.3em', height: '100%' }}>
                            <div style={{
                                fontSize: '1.8em',
                                textAlign: 'center',
                                paddingTop: '0.2em',
                                opacity: 0.4
                            }}>
                                {isMovie ? '🎬' : '📺'}
                            </div>
                            <div className='cardText' style={{ fontWeight: 'bold', fontSize: '0.85em', marginTop: 'auto' }}>
                                {title}
                            </div>
                            <div className='cardText' style={{ fontSize: '0.75em', color: 'var(--text-color-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {subtitle}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
};

export default TraktHistoryCard;
