import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function Container({ children, className = '' }: Props) {
    return (
        <div className={`py-12 ${className}`}>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
}
