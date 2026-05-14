import React, { type FC } from 'react';
import { usePoster } from '../api/usePoster';
import { CATEGORY_MOVIES, CATEGORY_TV } from '../api/useRealDebridSearch';
import type { TraktHistoryItem } from '../types';

interface Props {
    item: TraktHistoryItem;
    onSearch: (query: string, category: number) => void;
}

const TraktHistoryCard: FC<Props> = ({ item, onSearch }) => {
    const isMovie = item.type === 'movie';
    const title = isMovie ? item.movie?.title : item.show?.title;
    const year = isMovie ? item.movie?.year : item.show?.year;
    const subtitle = isMovie
        ? String(year)
        : `S${String(item.episode?.season).padStart(2, '0')}E${String(item.episode?.number).padStart(2, '0')}`;
    const tmdbId = isMovie ? item.movie?.ids.tmdb : item.show?.ids.tmdb;

    const { data: posterUrl } = usePoster(isMovie, tmdbId);

    return (
        <button
            className='card portraitCard scalableCard portraitCard-scalable'
            style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, textAlign: 'left', flex: '0 0 auto', width: '10em' }}
            onClick={() => title && onSearch(isMovie ? title : `${title} ${subtitle}`, isMovie ? CATEGORY_MOVIES : CATEGORY_TV)}
            title={`Search for "${isMovie ? title : `${title} ${subtitle}`}"`}
        >
            <div className='cardBox'>
                <div className='cardScalable'>
                    <div className='cardPadder cardPadder-portrait' />
                    <div className='cardContent' style={{ borderRadius: '4px', overflow: 'hidden', background: 'var(--card-background, rgba(255,255,255,0.05))' }}>
                        {posterUrl ? (
                            <img
                                className='cardImage'
                                src={posterUrl}
                                alt={title}
                                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3em', opacity: 0.3 }}>
                                {isMovie ? '🎬' : '📺'}
                            </div>
                        )}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '1.5em 0.5em 0.5em',
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.85))'
                        }}>
                            <div className='cardText' style={{ fontWeight: 600, fontSize: '0.8em', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {title}
                            </div>
                            <div className='cardText' style={{ fontSize: '0.7em', color: 'rgba(255,255,255,0.65)' }}>
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
