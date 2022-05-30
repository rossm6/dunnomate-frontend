import { useCallback, useState } from "react";

export default function useLives(lives) {
  const [state, setState] = useState(lives);

  const decrease = useCallback(() => {
    setState(state - 1);
  }, [state, setState]);

  const increase = useCallback(() => {
    setState(state + 1);
  }, [state, setState]);

  return [state, decrease, increase];
}