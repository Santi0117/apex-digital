"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import "./ScrollStack.css";

export type ScrollStackItemProps = {
  children: ReactNode;
  itemClassName?: string;
  style?: CSSProperties;
};

export const ScrollStackItem = ({
  children,
  itemClassName = "",
  style,
}: ScrollStackItemProps) => (
  <div
    className={`scroll-stack-card ${itemClassName}`.trim()}
    style={style}
  >
    {children}
  </div>
);

export type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  /** Extra space between card layout boxes (px). */
  itemDistance?: number;
  /** Vertical step between sticky tops (px). */
  itemStackDistance?: number;
  /** Sticky top for the first card (CSS length, e.g. "12vh" or "96px"). */
  stackPosition?: string;
  /** Kept for API compatibility — unused with sticky stack. */
  itemScale?: number;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
};

/**
 * Card stack powered by CSS `position: sticky`.
 * No scroll-linked JS transforms → no vibration on trackpads.
 */
export default function ScrollStack({
  children,
  className = "",
  itemDistance = 80,
  itemStackDistance = 28,
  stackPosition = "12vh",
}: ScrollStackProps) {
  const items = useMemo(() => {
    const list = Children.toArray(children);
    return list.map((child, index) => {
      if (!isValidElement(child)) return child;

      const el = child as ReactElement<ScrollStackItemProps>;
      const prevStyle = el.props.style ?? {};

      return cloneElement(el, {
        style: {
          ...prevStyle,
          ["--stack-index" as string]: index,
          ["--stack-gap" as string]: `${itemStackDistance}px`,
          ["--stack-top" as string]: stackPosition,
          marginBottom:
            index < list.length - 1 ? `${itemDistance}px` : undefined,
          zIndex: index + 1,
        },
      });
    });
  }, [children, itemDistance, itemStackDistance, stackPosition]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()}>
      <div className="scroll-stack-inner">{items}</div>
    </div>
  );
}
