import { useEffect, useRef, useState } from "react";
import { createMemoryHistory } from "history";

function useHistory({ steps, basename, history, exactMatch }) {
  const [activePath, setActivePath] = useState("");
  const historyRef = useRef(history || createMemoryHistory());

  const getPathToStep = pathname => {
    const id = pathname.replace(`${basename}/`, "");
    const [step] = steps.filter(s =>
      exactMatch ? s === id : id.startsWith(s)
    );
    return step;
  };

  useEffect(() => {
    const unlisten = historyRef.current.listen(({ pathname }) => {
      const nextPath = getPathToStep(pathname);

      if (steps.includes(nextPath)) {
        setActivePath(nextPath);
      }
    });

    const { pathname } = historyRef.current.location;
    const nextPath = getPathToStep(pathname);

    if (steps.includes(nextPath)) {
      setActivePath(nextPath);
    }

    return unlisten;
  });

  const handleNext = onNext => nextPath => {
    const nextStep = nextPath || steps[steps.indexOf(activePath) + 1];
    onNext(nextStep);
  };

  return {
    ...historyRef.current,
    pathname: activePath,
    push: handleNext(historyRef.current.push),
    replace: handleNext(historyRef.current.replace)
  };
}

export default useHistory;
