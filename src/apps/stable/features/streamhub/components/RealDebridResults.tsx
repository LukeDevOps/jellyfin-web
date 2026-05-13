import React, { type FC } from 'react';
import Loading from 'components/loading/LoadingComponent';
import RealDebridResultCard from './RealDebridResultCard';
import type { DebridSearchResult } from '../types';

interface Props {
    results: DebridSearchResult[];
    isPending: boolean;
    isError: boolean;
    streamingHash: string | null;
    onStream: (magnetUrl: string, infoHash: string) => void;
}

const RealDebridResults: FC<Props> = ({ results, isPending, isError, streamingHash, onStream }) => {
    if (isPending) return <Loading />;

    if (isError) return (
        <div className='noItemsMessage centerMessage'>
            Failed to fetch results. Check that Prowlarr and Real-Debrid are configured.
        </div>
    );

    if (results.length === 0) return (
        <div className='noItemsMessage centerMessage'>
            No RD-cached results found. Try a different search term.
        </div>
    );

    return (
        <div className='itemsContainer vertical-wrap padded-left padded-right'>
            {results.map(result => (
                <RealDebridResultCard
                    key={result.infoHash}
                    result={result}
                    isStreaming={streamingHash === result.infoHash}
                    onStream={magnetUrl => onStream(magnetUrl, result.infoHash)}
                />
            ))}
        </div>
    );
};

export default RealDebridResults;
