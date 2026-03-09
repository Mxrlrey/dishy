import { HTMLAttributes } from 'react';

export default function InputError({
   message,
   className = '',
   ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p
            {...props}
            className={'text-xs text-red-500 mt-1 font-medium ' + className}
        >
            <i className="fas fa-exclamation-circle mr-1"></i> {message}
        </p>
    ) : null;
}
