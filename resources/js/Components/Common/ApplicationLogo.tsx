import { ImgHTMLAttributes } from 'react';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src="/img/dishy.svg"
            alt="Dishy Logo"
            className={`block h-32 w-auto object-contain transition-all duration-300 ease-in-out transform hover:scale-110 ${props.className}`}
        />
    );
}
