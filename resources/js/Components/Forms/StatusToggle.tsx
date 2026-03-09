import React from 'react';

interface Props {
    value: boolean;
    onChange: (newValue: boolean) => void;
    disabled?: boolean;
}

export default function StatusToggle({ value, onChange, disabled = false }: Props) {
    const toggle = () => {
        if (!disabled) {
            onChange(!value);
        }
    };

    return (
        <button
            type="button"
            onClick={toggle}
            disabled={disabled}
            className={`
        relative inline-flex items-center justify-center px-3 py-1 rounded-[1px]
        text-[10px] font-bold uppercase tracking-wider transition-all duration-200
        text-white shadow-sm active:scale-95
        w-[85px] h-[26px] /* Largura e altura fixas para manter o padrão */
        ${value ? 'bg-[#81c868] hover:bg-[#72b35c]' : 'bg-[#dc3545] hover:bg-[#c82333]'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `}
        >
        <span className="flex items-center justify-center gap-2">
            <i className={`fa ${value ? 'fa-check-circle' : 'fa-times-circle'} w-3`}></i>
            <span>{value ? 'Ativo' : 'Inativo'}</span>
        </span>
        </button>
    );
}
