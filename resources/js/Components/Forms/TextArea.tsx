import { forwardRef, useEffect, useImperativeHandle, useRef, TextareaHTMLAttributes } from 'react';

export default forwardRef(function TextArea(
    {
        className = '',
        isFocused = false,
        ...props
    }: TextareaHTMLAttributes<HTMLTextAreaElement> & { isFocused?: boolean },
    ref,
) {
    const localRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <textarea
            {...props}
            className={
                'w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-[1px] shadow-sm mt-1 text-sm transition-colors ' +
                className
            }
            ref={localRef}
        />
    );
});
