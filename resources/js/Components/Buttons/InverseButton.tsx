import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string;
}

export default function InverseButton({
  className = '',
  disabled,
  children,
  icon = 'fa-file-pdf-o',
  ...props
}: Props) {

    const sizeClasses = children ? 'px-[12px] py-[6px]' : 'w-10 h-10';

    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center border border-[#4c5667] bg-[#4c5667] text-[14px] font-normal text-white transition-all duration-300 ease-out hover:bg-[#363e4a] focus:outline-none disabled:opacity-25 rounded-[1px] shadow-sm ${sizeClasses} ${className}`
            }
            disabled={disabled}
        >
            <i
                className={`fa ${icon} ${children ? 'mr-2' : ''}`}
                aria-hidden="true"
            ></i>

            {children && (
                <span>{children}</span>
            )}
        </button>
    );
}
