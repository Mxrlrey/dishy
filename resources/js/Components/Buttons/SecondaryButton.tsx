import { ButtonHTMLAttributes } from 'react';
import { Ripple } from "@/Components/Effects";
import { cn } from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string;
    processing?: boolean;
}

export default function SecondaryButton({
                                            className = '',
                                            disabled,
                                            children,
                                            icon = 'fa-pencil',
                                            processing,
                                            ...props
                                        }: Props) {
    return (
        <button
            {...props}
            disabled={disabled || processing}
            className={cn(
                // Base e Layout
                "relative overflow-hidden inline-flex items-center justify-center rounded-[1px] shadow-sm",
                "text-white transition-all duration-100 ease-out",

                // Cores e Borda
                "border border-transparent bg-[#1b84e7]",

                // Transições e Hover
                "hover:bg-[#156cb8] focus:outline-none",

                // Efeito "Afundar"
                "active:bg-[#115694] active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.2)] active:scale-[0.98]",

                // Estados de desabilitado
                "disabled:opacity-25",

                // Tamanhos dinâmicos
                children ? "px-4 py-2" : "px-3 py-1",

                // Classes extras passadas por prop
                className
            )}
        >
            {/* Efeito de onda branca suave sobre o azul */}
            {!disabled && !processing && <Ripple color="rgba(255, 255, 255, 0.3)" />}

            <span className="relative z-10 flex items-center pointer-events-none">
                <i
                    className={`fa ${icon} text-sm ${children ? 'mr-2' : ''}`}
                    aria-hidden="true"
                />

                {children && (
                    <span className="text-[11px] font-bold uppercase tracking-widest leading-none">
                        {children}
                    </span>
                )}
            </span>
        </button>
    );
}
