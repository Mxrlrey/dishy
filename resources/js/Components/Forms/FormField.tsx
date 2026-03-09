import React, { ReactNode } from 'react';
import { InputLabel, InputError } from '@/Components';

interface FormFieldProps {
    label?: string;
    htmlFor: string;
    error?: string;
    children: ReactNode;
    className?: string;
}

export default function FormField({
  label,
  htmlFor,
  error,
  children,
  className = ''
}: FormFieldProps) {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <InputLabel htmlFor={htmlFor} value={label} />
            )}

            <div className="mt-1">
                {children}
            </div>

            {error && (
                <InputError message={error} className="mt-2" />
            )}
        </div>
    );
}
