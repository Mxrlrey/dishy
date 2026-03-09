import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string;
}

export default function PrimaryButton({
  className = '',
  disabled,
  children,
  icon = 'fa-plus',
  ...props
}: Props) {

    const sizeClasses = children ? 'px-[12px] py-[6px]' : 'w-10 h-10';

    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center border border-[#81c868] bg-[#81c868] text-[14px] font-normal leading-[1.42857143] text-white transition-all duration-300 ease-out hover:bg-[#70b359] focus:outline-none disabled:opacity-25 rounded-[1px] shadow-sm ${sizeClasses} ${className}`
            }
            disabled={disabled}
        >
            <i
                className={`fa ${icon} ${children ? 'mr-2' : ''}`}
                aria-hidden="true"
            ></i>

            {children && (
                <span className="">
                    {children}
                </span>
            )}
        </button>
    );
}
