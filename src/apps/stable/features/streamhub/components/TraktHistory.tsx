import React, { type FC } from 'react';
import { useTraktHistory } from '../api/useTraktHistory';
import TraktHistoryCard from './TraktHistoryCard';
import type { TraktHistoryItem } from '../types';

interface Props {
    onSearch: (query: string, category: number) => void;
}

const uniqueKey = (item: TraktHistoryItem) =>
    item.type === 'movie'
        ? `movie-${item.movie?.ids.trakt ?? item.movie?.title}`
        : `show-${item.show?.ids.trakt ?? item.show?.title}`;

const TraktHistory: FC<Props> = ({ onSearch }) => {
    const { data: history, isPending } = useTraktHistory(20);

    if (isPending) return null;

    const unique = history
        ? history.filter((item, idx, arr) => arr.findIndex(x => uniqueKey(x) === uniqueKey(item)) === idx).slice(0, 5)
        : [];

    if (!unique.length) {
        return (
            <p style={{ textAlign: 'center', color: 'var(--text-color-secondary)', fontSize: '0.85em', padding: '0.5em 0' }}>
                No watch history yet — start watching something!
            </p>
        );
    }

    return (
        <div style={{ width: '100%', maxWidth: '60em' }}>
            <p style={{ color: 'var(--text-color-secondary)', fontSize: '0.8em', marginBottom: '0.5em', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
                Continue Watching
            </p>
            <div style={{ display: 'flex', gap: '0.75em', flexWrap: 'wrap', justifyContent: 'center' }}>
                {unique.map(item => (
                    <TraktHistoryCard
                        key={item.id}
                        item={item}
                        onSearch={onSearch}
                    />
                ))}
            </div>
        </div>
    );
};

export default TraktHistory;
