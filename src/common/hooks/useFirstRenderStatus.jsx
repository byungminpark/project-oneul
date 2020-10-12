import { useEffect, useRef } from 'react';

const useFirstRenderStatus = () => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return isFirstRender.current;
};

export default useFirstRenderStatus;
