import React from 'react';
import './ShimmerButton.css';

/** Magic UI-inspired shimmer action that can render as a semantic button or link. */
export default function ShimmerButton({ as: Element = 'button', className = '', contentClassName = 'shimmer-button-content', children, shimmerColor = 'rgba(255,255,255,.8)', duration = '2.8s', onHoverOnly = false, style, ...props }) {
  return <Element className={`shimmer-button ${onHoverOnly ? 'shimmer-button-on-interaction' : ''} ${className}`.trim()} style={{ '--shimmer-color': shimmerColor, '--shimmer-duration': duration, ...style }} {...props}>
    <span className="shimmer-button-sheen" aria-hidden="true"/>
    <span className={contentClassName}>{children}</span>
  </Element>;
}
