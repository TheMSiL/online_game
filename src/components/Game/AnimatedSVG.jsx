import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const AnimatedSVG = () => {
    const svgRef = useRef(null);
    const pathRef1 = useRef(null);
    const pathRef2 = useRef(null);

    useEffect(() => {
        if (svgRef.current) {
            const animateSVG = () => {
                const { x, y } = svgRef.current.getBoundingClientRect();
                gsap.fromTo(svgRef.current, {
                    x,
                    y,
                    attr: { height: 400, width: 600 },
                }, {
                    duration: 3,
                    ease: 'power1.inOut',
                    onComplete: animateSVG
                });
            };
            animateSVG();
        }
    }, []);

    return (
        <svg ref={svgRef} width='800' height='300' className='jet_svg'>
            <defs>
                <linearGradient id='grad' x1='0' x2='1' y1='0' y2='1'>
                    <stop stopColor='#9d7aff' stopOpacity='.33'></stop>
                    <stop offset='.987' stopColor='#9d7aff' stopOpacity='0'></stop>
                </linearGradient>
                <linearGradient id='grad_stroke' x1='0' x2='1' y1='0' y2='1'>
                    <stop stopColor='#9D7AFF'></stop>
                    <stop offset='.787' stopColor='#622BFC'></stop>
                    <stop offset='1' stopColor='#5c24fc' stopOpacity='0'></stop>
                </linearGradient>
            </defs>
            <g>
                <path
                    ref={pathRef1}
                    d='M 0 0 Q 0 0 0 0'
                    fill='transparent'
                    stroke='url(#grad_stroke)'
                ></path>
                <path
                    ref={pathRef2}
                    d='M 0 0 Q 0 0 0 0 L 0 0 Z'
                    fill='url(#grad)'
                ></path>
            </g>
        </svg>
    );
};

export default AnimatedSVG;
