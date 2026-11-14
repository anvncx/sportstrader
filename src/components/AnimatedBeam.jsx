import { useEffect, useState } from 'react';

/** SVG beam that measures two element refs and animates a short highlight along their path. */
export function AnimatedBeam({ containerRef, fromRef, toRef, curvature = 0, reverse = false, pathColor = '#343c33', beamColor = '#b7f34a', pathWidth = 1, beamWidth = 2, duration = 2.8, className = '' }) {
  const [path, setPath] = useState('');

  useEffect(() => {
    const container = containerRef.current;
    const from = fromRef.current;
    const to = toRef.current;
    if (!container || !from || !to) return undefined;

    const update = () => {
      const bounds = container.getBoundingClientRect();
      const start = from.getBoundingClientRect();
      const end = to.getBoundingClientRect();
      const x1 = start.left + start.width / 2 - bounds.left;
      const y1 = start.top + start.height / 2 - bounds.top;
      const x2 = end.left + end.width / 2 - bounds.left;
      const y2 = end.top + end.height / 2 - bounds.top;
      const direction = reverse ? -1 : 1;
      const cx = (x1 + x2) / 2;
      const cy = (y1 + y2) / 2 + curvature * direction;
      setPath(`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);
    };

    update();
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(container);
    resizeObserver.observe(from);
    resizeObserver.observe(to);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [containerRef, fromRef, toRef, curvature, reverse]);

  if (!path) return null;
  return <svg className={`animated-beam-svg ${className}`} aria-hidden="true" focusable="false">
    <path d={path} fill="none" stroke={pathColor} strokeWidth={pathWidth}/>
    <path className="animated-beam-glow" d={path} fill="none" stroke={beamColor} strokeWidth={beamWidth * 4} strokeLinecap="round" strokeDasharray="120 880" pathLength="1000" style={{ '--beam-duration': `${duration}s` }}/>
    <path className="animated-beam-trace" d={path} fill="none" stroke={beamColor} strokeWidth={beamWidth} strokeLinecap="round" strokeDasharray="72 928" pathLength="1000" style={{ '--beam-duration': `${duration}s`, '--beam-color': beamColor }}/>
  </svg>;
}

export default AnimatedBeam;
