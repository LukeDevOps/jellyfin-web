import React, { type FC, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import Page from 'components/Page';
import { useRealDebridSearch, CATEGORY_MOVIES, CATEGORY_TV } from 'apps/stable/features/realdebrid/api/useRealDebridSearch';
import { useRealDebridStream } from 'apps/stable/features/realdebrid/api/useRealDebridStream';
import RealDebridResults from 'apps/stable/features/realdebrid/components/RealDebridResults';

const RealDebridPage: FC = () => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState(CATEGORY_MOVIES);
    const [streamingHash, setStreamingHash] = useState<string | null>(null);
    const [debouncedQuery] = useDebounceValue(query, 500);

    const { data = [], isPending, isError } = useRealDebridSearch(debouncedQuery, category);
    const streamMutation = useRealDebridStream();

    const handleStream = async (magnetUrl: string, infoHash: string) => {
        setStreamingHash(infoHash);
        try {
            const { url } = await streamMutation.mutateAsync(magnetUrl);
            window.open(url, '_blank');
        } finally {
            setStreamingHash(null);
        }
    };

    return (
        <Page
            id='realDebridPage'
            title='Real-Debrid Search'
            className='mainAnimatedPage libraryPage allLibraryPage noSecondaryNavPage'
        >
            <div className='padded-left padded-right padded-top' style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
                <input
                    className='emby-input'
                    type='search'
                    placeholder='Search movies & TV...'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    style={{ flex: 1, maxWidth: '480px' }}
                />
                <select
                    className='emby-select'
                    value={category}
                    onChange={e => setCategory(Number(e.target.value))}
                >
                    <option value={CATEGORY_MOVIES}>Movies</option>
                    <option value={CATEGORY_TV}>TV</option>
                </select>
            </div>

            {debouncedQuery ? (
                <RealDebridResults
                    results={data}
                    isPending={isPending}
                    isError={isError}
                    streamingHash={streamingHash}
                    onStream={handleStream}
                />
            ) : (
                <div className='noItemsMessage centerMessage'>
                    Search for a movie or TV show to find RD-cached streams.
                </div>
            )}
        </Page>
    );
};

export default RealDebridPage;
