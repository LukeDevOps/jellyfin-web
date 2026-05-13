import React, { type FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebounceValue } from 'usehooks-ts';
import 'material-design-icons-iconfont';

import Page from 'components/Page';
import Input from 'elements/emby-input/Input';
import { useRealDebridSearch, CATEGORY_MOVIES, CATEGORY_TV } from 'apps/stable/features/streamhub/api/useRealDebridSearch';
import { useRealDebridStream } from 'apps/stable/features/streamhub/api/useRealDebridStream';
import { useTraktStatus } from 'apps/stable/features/streamhub/api/useTraktStatus';
import RealDebridResults from 'apps/stable/features/streamhub/components/RealDebridResults';
import TraktConnect from 'apps/stable/features/streamhub/components/TraktConnect';
import TraktHistory from 'apps/stable/features/streamhub/components/TraktHistory';

const SearchBar: FC<{
    query: string;
    category: number;
    onQueryChange: (q: string) => void;
    onCategoryChange: (c: number) => void;
}> = ({ query, category, onQueryChange, onCategoryChange }) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1em', width: '100%', maxWidth: '60em' }}>
        <span className='material-icons search' aria-hidden='true' style={{ fontSize: '2em', marginBottom: '0.1em' }} />
        <div className='inputContainer flex-grow' style={{ marginBottom: 0 }}>
            <Input
                id='rdSearchInput'
                type='text'
                placeholder='Search movies & TV shows...'
                autoComplete='off'
                maxLength={80}
                value={query}
                onChange={e => onQueryChange(e.target.value)}
            />
        </div>
        <div className='selectContainer' style={{ minWidth: '8em', marginBottom: 0 }}>
            <select
                className='emby-select'
                value={category}
                onChange={e => onCategoryChange(Number(e.target.value))}
            >
                <option value={CATEGORY_MOVIES}>Movies</option>
                <option value={CATEGORY_TV}>TV</option>
            </select>
        </div>
    </div>
);

const RealDebridPage: FC = () => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState(CATEGORY_MOVIES);
    const [streamingHash, setStreamingHash] = useState<string | null>(null);
    const [debouncedQuery] = useDebounceValue(query, 500);

    const { data: traktStatus } = useTraktStatus();
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
            title='Find Movies & TV'
            className='mainAnimatedPage libraryPage allLibraryPage noSecondaryNavPage'
        >
            {debouncedQuery ? (
                <>
                    <div className='padded-left padded-right padded-top' style={{ display: 'flex', justifyContent: 'center' }}>
                        <SearchBar
                            query={query}
                            category={category}
                            onQueryChange={setQuery}
                            onCategoryChange={setCategory}
                        />
                    </div>
                    <RealDebridResults
                        results={data}
                        isPending={isPending}
                        isError={isError}
                        streamingHash={streamingHash}
                        onStream={handleStream}
                    />
                </>
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 'calc(100dvh - 64px)',
                    gap: '2em',
                    padding: '0 1.5em'
                }}>
                    <SearchBar
                        query={query}
                        category={category}
                        onQueryChange={setQuery}
                        onCategoryChange={setCategory}
                    />

                    {traktStatus?.authenticated
                        ? <TraktHistory onSearch={setQuery} />
                        : <TraktConnect />
                    }

                    <Link
                        to='/home'
                        className='emby-button'
                        style={{ width: '100%', maxWidth: '60em', textAlign: 'center', padding: '0.75em', fontSize: '0.95em' }}
                    >
                        <span className='material-icons' style={{ verticalAlign: 'middle', marginRight: '0.4em', fontSize: '1.2em' }}>video_library</span>
                        Browse Your Library
                    </Link>
                </div>
            )}
        </Page>
    );
};

export default RealDebridPage;
