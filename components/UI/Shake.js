import { animated, useSpring } from 'react-spring';

import React from 'react'
const Wiggle = ({ rotation = 0, timing = 150, children }) => {
  const [isWiggled, setIsWiggled] = React.useState(false);
 const style = useSpring({
    display: 'inline-block',
    backfaceVisibility: 'hidden',
    transform: isWiggled
      ? `rotate(${rotation}deg)`
      : `rotate(0deg)`,
   config:{
     tension:300,
     friction:10
   }
  });

  React.useEffect(() => {
    //if (!isWiggled) {
    //  return;
    //}
    const timeoutId = window.setTimeout(() => {
      setIsWiggled(false);
    }, timing);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isWiggled, timing]);
  const trigger = () => {
    setIsWiggled(true);
  };
  return (
<animated.span onMouseEnter={trigger} style={style} >
      {children}
    </animated.span>
  );
};

export default Wiggle
