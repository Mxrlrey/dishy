import React from 'react';

interface Props {
    type: 'danger' | 'success' | 'info' | 'warning' | 'primary' | 'secondary';
    children: React.ReactNode;
    className?: string;
}

export default function Badge({ type, children, className = '' }: Props) {

    const variants = {
        danger: 'bg-[#dc3545]',    // Vermelho
        success: 'bg-[#81c868]',   // Verde
        primary: 'bg-[#1b84e7]',   // Azul
        info: 'bg-[#34d3eb]',      // Ciano
        warning: 'bg-[#f1b53d]',   // Amarelo/Laranja
        secondary: 'bg-[#6c757d]', // Cinza
    };

    return (
        <span
            className={
                `inline-block px-[0.6em] py-[0.3em] text-[10px] font-bold leading-none text-white text-center whitespace-nowrap align-baseline tracking-wider uppercase ${variants[type]} ${className}`
            }
        >
            {children}
        </span>
    );
}
