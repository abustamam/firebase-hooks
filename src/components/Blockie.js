import React, { useRef, useEffect } from 'react';
import blockies from 'ethereum-blockies';

const Blockie = ({ opts: { seed = '', size = 8, scale = 4 } = {} }) => {
  const opts = {
    seed,
    size,
    scale,
    color: '#dfe',
    bgcolor: '#aaa',
    spotcolor: '#000',
  };
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      blockies.render(opts, ref.current);
    }
  }, [opts]);
  return <canvas className="blockie" ref={ref} />;
};

export default Blockie;
