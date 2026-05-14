import React, { type FC, useState } from 'react';
import { useTraktRecommendations } from '../api/useTraktRecommendations';
import { usePoster } from '../api/usePoster';
import { CATEGORY_MOVIES, CATEGORY_TV } from '../api/useRealDebridSearch';
import type { TraktRecommendationItem } from '../types';

const PAGE_SIZE = 5;

interface CardProps {
    item: TraktRecommendationItem;
    isMovie: boolean;
    onSearch: (query: string, category: number) => void;
}

const RecommendationCard: FC<CardProps> = ({ item, isMovie, onSearch }) => {
    const { data: posterUrl } = usePoster(isMovie, item.ids.tmdb);

    return (
        <button
            className='card portraitCard scalableCard portraitCard-scalable'
            style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, textAlign: 'left', flex: '0 0 auto', width: '10em' }}
            onClick={() => onSearch(item.title, isMovie ? CATEGORY_MOVIES : CATEGORY_TV)}
            title={`Search for "${item.title}"`}
        >
            <div className='cardBox'>
                <div className='cardScalable'>
                    <div className='cardPadder cardPadder-portrait' />
                    <div className='cardContent' style={{ borderRadius: '4px', overflow: 'hidden', background: 'var(--card-background, rgba(255,255,255,0.05))' }}>
                        {posterUrl ? (
                            <img
                                className='cardImage'
                                src={posterUrl}
                                alt={item.title}
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
                                {item.title}
                            </div>
                            <div className='cardText' style={{ fontSize: '0.7em', color: 'rgba(255,255,255,0.65)' }}>
                                {item.year}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
};

const NavButton: FC<{ icon: string; disabled: boolean; onClick: () => void }> = ({ icon, disabled, onClick }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        style={{
            background: 'none',
            border: 'none',
            cursor: disabled ? 'default' : 'pointer',
            opacity: disabled ? 0.2 : 0.8,
            padding: '0.25em',
            color: 'var(--text-color)',
            flexShrink: 0,
            transition: 'opacity 0.15s'
        }}
    >
        <span className='material-icons' style={{ fontSize: '2em' }}>{icon}</span>
    </button>
);

interface RowProps {
    type: 'movies' | 'shows';
    label: string;
    onSearch: (query: string, category: number) => void;
}

const TraktRecommendationRow: FC<RowProps> = ({ type, label, onSearch }) => {
    const [page, setPage] = useState(0);
    const { data: allItems, isPending } = useTraktRecommendations(type);
    const isMovie = type === 'movies';

    if (isPending || !allItems?.length) return null;

    const start = page * PAGE_SIZE;
    const items = allItems.slice(start, start + PAGE_SIZE);
    const isFirst = page === 0;
    const isLast = start + PAGE_SIZE >= allItems.length;

    return (
        <div style={{ width: '100%', maxWidth: '60em' }}>
            <p style={{ color: 'var(--text-color-secondary)', fontSize: '0.8em', marginBottom: '0.5em', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
                {label}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25em' }}>
                <NavButton icon='chevron_left' disabled={isFirst} onClick={() => setPage(p => p - 1)} />
                <div style={{ display: 'flex', flex: 1, gap: '0.75em', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {items.map(item => (
                        <RecommendationCard
                            key={item.ids.trakt}
                            item={item}
                            isMovie={isMovie}
                            onSearch={onSearch}
                        />
                    ))}
                </div>
                <NavButton icon='chevron_right' disabled={isLast} onClick={() => setPage(p => p + 1)} />
            </div>
        </div>
    );
};

export default TraktRecommendationRow;
