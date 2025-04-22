import { useEffect, useRef, useState } from 'react';

const LazyComponent = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Solo se activa una vez
                }
            },
            {
                root: null,         // viewport
                rootMargin: '0px',
                threshold: 0.2      // 20% visible para activarse
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return <div ref={ref}>{isVisible ? children : null}</div>;
};

export default LazyComponent;