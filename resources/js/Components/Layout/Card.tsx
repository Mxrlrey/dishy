import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function Card({ children, className = '' }: Props) {
    return (
        <div className={`bg-white overflow-hidden shadow-sm rounded-[1px] p-6 ${className}`}>
            {children}
        </div>
    );
}
