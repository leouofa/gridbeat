import { useEffect, RefObject } from "react";

export function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    const events = ["mousedown", "touchstart"] as const;
    events.forEach((e) =>
      document.addEventListener(e, handleClickOutside as EventListener),
    );
    return () =>
      events.forEach((e) =>
        document.removeEventListener(e, handleClickOutside as EventListener),
      );
  }, [ref, handler]);
}
