import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string;
}

export default function DangerButton({
 className = '',
 disabled,
 children,
 icon = 'fa-eraser',
 ...props
}: Props) {

    const sizeClasses = children ? 'px-4 py-2' : 'px-3 py-1';

    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center border border-transparent bg-[#f05050] text-white transition duration-150 ease-in-out hover:bg-[#d43f3f] focus:outline-none disabled:opacity-25 rounded-[1px] shadow-sm ${sizeClasses} ${className}`
            }
            disabled={disabled}
        >
            <i
                className={`fa ${icon} text-sm ${children ? 'mr-2' : ''}`}
                aria-hidden="true"
            ></i>

            {children && (
                <span className="text-[11px] font-bold uppercase tracking-widest leading-none">
                    {children}
                </span>
            )}
        </button>
    );
}
