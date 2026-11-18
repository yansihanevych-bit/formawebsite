"use client";
import { useEffect, useState } from "react";

/** true, когда прелоадер ушёл (или его не было): по этому сигналу стартуют анимации первого экрана */
export function useIntro() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (document.documentElement.classList.contains("preloaded")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- прелоадера нет — сразу готово
      setReady(true);
      return;
    }
    const on = () => setReady(true);
    window.addEventListener("fb:intro", on);
    const safety = setTimeout(on, 2500);
    return () => {
      window.removeEventListener("fb:intro", on);
      clearTimeout(safety);
    };
  }, []);
  return ready;
}
