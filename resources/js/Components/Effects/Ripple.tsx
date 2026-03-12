import { useState, useLayoutEffect } from 'react';

interface RippleProps {
    color?: string;
    duration?: number;
}

const Ripple = ({ color = 'rgba(255, 255, 255, 0.45)', duration = 600 }: RippleProps) => {
    const [rippleArray, setRippleArray] = useState<{ x: number; y: number; size: number, id: number }[]>([]);

    const addRipple = (event: React.MouseEvent<HTMLDivElement>) => {
        const container = event.currentTarget.getBoundingClientRect();

        // Calculamos o tamanho para garantir que a onda cubra o botão todo
        const size = container.width > container.height ? container.width * 2.5 : container.height * 2.5;
        const x = event.clientX - container.left - size / 2;
        const y = event.clientY - container.top - size / 2;

        const newRipple = { x, y, size, id: Date.now() };

        // Adicionamos a nova onda sem limpar as anteriores imediatamente
        setRippleArray((prev) => [...prev, newRipple]);
    };

    // Removemos a onda individualmente após a animação
    const cleanRipple = (id: number) => {
        setRippleArray((prev) => prev.filter((ripple) => ripple.id !== id));
    };

    return (
        <div
            className="absolute inset-0 z-0 overflow-hidden"
            onMouseDown={addRipple}
        >
            {rippleArray.map((ripple) => (
                <span
                    key={ripple.id}
                    onAnimationEnd={() => cleanRipple(ripple.id)}
                    style={{
                        top: ripple.y,
                        left: ripple.x,
                        width: ripple.size,
                        height: ripple.size,
                        backgroundColor: color,
                    }}
                    className="absolute rounded-full pointer-events-none animate-ripple"
                />
            ))}
        </div>
    );
};

export default Ripple;
