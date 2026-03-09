import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string;
}

export default function InfoButton({
   className = '',
   disabled,
   children,
   icon = 'fa-info',
   ...props
}: Props) {

    const sizeClasses = children ? 'px-4 py-2' : 'px-4 py-1';

    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center border border-transparent bg-[#34d3eb] text-white transition duration-150 ease-in-out hover:bg-[#2cb9ce] focus:outline-none disabled:opacity-25 rounded-[1px] shadow-sm ${sizeClasses} ${className}`
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
