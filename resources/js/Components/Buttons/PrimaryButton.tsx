import { ButtonHTMLAttributes } from 'react';
import { Ripple } from "@/Components/Effects";
import {cn} from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string;
    processing?: boolean;
}

export default function PrimaryButton({
        className = '',
        disabled,
        children,
        icon = 'fa-plus',
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
                "text-[14px] font-normal leading-[1.42857143] text-white",

                // Cores e Borda
                "border border-[#81c868] bg-[#81c868]",

                // Transições e Hover
                "transition-all duration-100 ease-out hover:bg-[#70b359] focus:outline-none",

                // Efeito "Afundar"
                "active:bg-[#63a34f] active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.2)] active:scale-[0.98]",

                // Estados de desabilitado
                "disabled:opacity-25",

                // Tamanhos dinâmicos
                children ? "px-[12px] py-[6px]" : "w-10 h-10",

                // Classes extras passadas por prop
                className
            )}
        >
            {!disabled && !processing && <Ripple color="rgba(255, 255, 255, 0.3)" />}

            <span className="relative z-10 flex items-center pointer-events-none">
                <i className={`fa ${icon} ${children ? 'mr-2' : ''}`} aria-hidden="true" />
                {children && <span>{children}</span>}
            </span>
        </button>
    );
}
