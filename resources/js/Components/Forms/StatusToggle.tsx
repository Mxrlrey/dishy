import React from 'react';
import { cn } from "@/lib/utils";
import { Ripple } from "@/Components/Effects";

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
            className={cn(
                // Base e Layout
                "relative overflow-hidden inline-flex items-center justify-center rounded-[1px] shadow-sm",
                "w-[85px] h-[26px] text-[10px] font-bold uppercase tracking-wider text-white",
                "transition-all duration-100 ease-out",

                // Cores dinâmicas (Ativo vs Inativo)
                value
                    ? "bg-[#81c868] hover:bg-[#72b35c] active:bg-[#63a34f]"
                    : "bg-[#dc3545] hover:bg-[#c82333] active:bg-[#bd2130]",

                // Efeito "Afundar"
                "active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.2)] active:scale-[0.96]",

                // Estados de desabilitado
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer focus:outline-none"
            )}
        >
            {/* Efeito de onda branca suave */}
            {!disabled && <Ripple color="rgba(255, 255, 255, 0.3)" />}

            <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
                <i className={`fa ${value ? 'fa-check-circle' : 'fa-times-circle'} w-3`}></i>
                <span>{value ? 'Ativo' : 'Inativo'}</span>
            </span>
        </button>
    );
}
