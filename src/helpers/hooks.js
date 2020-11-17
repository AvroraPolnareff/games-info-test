import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * Detects whether click is outside or isn't and runs given handler
 * @param handler
 * @param ref
 */
export function useOnClickOutside(handler, ref) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
