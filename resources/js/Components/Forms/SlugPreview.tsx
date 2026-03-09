import React from 'react';

interface Props {
    prefix: string; // Ex: "/prato/", "/menu/", "/categoria/"
    slug: string;
    label?: string;
    className?: string;
}

export default function SlugPreview({
    prefix,
    slug,
    label = 'URL Atual:',
    className = ''
}: Props) {
    const formattedPrefix = prefix.endsWith('/') ? prefix : `${prefix}/`;

    return (
        <div className={`bg-gray-50 p-3 border border-dashed border-gray-200 rounded-[1px] ${className}`}>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {label}
            </span>
            <div className="text-sm font-mono text-blue-600 mt-1 truncate">
                {formattedPrefix}{slug || '...'}
            </div>
        </div>
    );
}
