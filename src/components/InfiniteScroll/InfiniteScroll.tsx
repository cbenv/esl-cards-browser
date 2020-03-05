/* Imports */

import noop from 'lodash/noop';
import React, { useEffect, useRef, useState } from 'react';
import throttle from 'lodash/throttle';

/* Setups */

interface Props {
  onIsAtBottomChange?: (isAtBottom: boolean) => void;
}

const SCROLL_THROTTLE_INTERVAL_MS = 100;

/* Component */

const InfiniteScroll: React.FC<Props> = ({ children, onIsAtBottomChange = noop }) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const bottomElementRef = useRef<HTMLDivElement>(null);

  /**
   * whenever isAtBottom state changes, communicate that to the parent element
   */
  useEffect(() => {
    onIsAtBottomChange(isAtBottom);
  }, [isAtBottom, onIsAtBottomChange]);

  /**
   * as long as this InfiniteScroll component is mounted, it should listen to scroll event 
   * and update isAtBottom state with whether or not the this component is scrolled to the bottom of the page
   */
  useEffect(() => {
    const scrollListener = throttle((event: Event) => {
      if (bottomElementRef && bottomElementRef.current) {
        const browserHeight = window.innerHeight;
        const scrollYPosition = window.scrollY;
        const bottomElementYPosition = bottomElementRef.current.offsetTop;
        setIsAtBottom(browserHeight + scrollYPosition >= bottomElementYPosition);
      }
    }, SCROLL_THROTTLE_INTERVAL_MS);

    window.addEventListener('scroll', scrollListener, { capture: true });
    return window.removeEventListener('scroll', scrollListener);
  }, []);
  
  return (
    <div>
      {children}
      <div ref={bottomElementRef}></div>
    </div>
  );
}

/* Exports */

export default InfiniteScroll;
