import { SelectHTMLAttributes, forwardRef, useRef } from 'react';

export default forwardRef(function SelectInput(
    { className = '', children, ...props }: SelectHTMLAttributes<HTMLSelectElement>,
    ref
) {
    return (
        <select
            {...props}
            className={
                'w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-[1px] shadow-sm mt-1 text-sm transition-colors ' +
                className
            }
        >
            {children}
        </select>
    );
});
