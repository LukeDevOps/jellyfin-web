import React, { type FC } from 'react';
import { useTraktHistory } from '../api/useTraktHistory';
import TraktHistoryCard from './TraktHistoryCard';

interface Props {
    onSearch: (query: string) => void;
}

const TraktHistory: FC<Props> = ({ onSearch }) => {
    const { data: history, isPending } = useTraktHistory(5);

    if (isPending) return null;

    if (!history?.length) {
        return (
            <p style={{ textAlign: 'center', color: 'var(--text-color-secondary)', fontSize: '0.85em', padding: '0.5em 0' }}>
                No watch history yet — start watching something!
            </p>
        );
    }

    return (
        <div style={{ width: '100%', maxWidth: '60em' }}>
            <p style={{ color: 'var(--text-color-secondary)', fontSize: '0.8em', marginBottom: '0.5em', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Continue Watching
            </p>
            <div className='itemsContainer vertical-wrap' style={{ display: 'flex', gap: '0.5em', flexWrap: 'nowrap' }}>
                {history.map(item => (
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
