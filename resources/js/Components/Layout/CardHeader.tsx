import React from 'react';
import { Link } from '@inertiajs/react';
import { PrimaryButton } from '@/Components';

interface Props {
    title: string;
    buttonHref?: string;
    buttonLabel?: string;
}

export default function CardHeader({ title, buttonHref, buttonLabel }: Props) {
    return (
        <div className="flex justify-between items-center mb-6 px-1">
            <p className="text-sm text-gray-600 italic">{title}</p>
            {buttonHref && (
                <Link href={buttonHref}>
                    <PrimaryButton icon="fa-plus">
                        {buttonLabel}
                    </PrimaryButton>
                </Link>
            )}
        </div>
    );
}
