import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useHistory from "../hooks/useHistory";
import historyShape from "../historyShape";
import WizardContext from "../wizardContext";

const Wizard = ({ children, basename, history, exactMatch, onNext }) => {
  const [steps, setSteps] = useState([]);

  const getStepFromPath = path =>
    steps.find(step => step.id === path) || { id: null };

  const { pathname, ...wizardHistory } = useHistory({
    steps: steps.map(step => step.id),
    basename,
    history,
    exactMatch
  });

  useEffect(() => {
    if (steps.length > 0 && !pathname) {
      wizardHistory.push(steps[0].id);
    }
  }, [steps]);

  const handleNext = () => {
    if (onNext) {
      onNext({
        steps,
        step: getStepFromPath(pathname),
        ...wizardHistory
      });
    } else {
      wizardHistory.push();
    }
  };

  const step = getStepFromPath(pathname);
  const indexOfStep = steps.indexOf(step);

  const context = {
    step,
    steps,
    onNext: handleNext,
    onPrevious: wizardHistory.goBack,
    onInit: setSteps,
    hasNext: indexOfStep < steps.length - 1,
    hasPrevious: indexOfStep > 0,
    ...wizardHistory
  };

  return (
    <WizardContext.Provider value={context}>
      {typeof children === "function" ? children(context) : children}
    </WizardContext.Provider>
  );
};

Wizard.propTypes = {
  history: historyShape,
  basename: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  onNext: PropTypes.func,
  // eslint-disable-next-line react/boolean-prop-naming
  exactMatch: PropTypes.bool
};

Wizard.defaultProps = {
  basename: "",
  history: undefined,
  onNext: undefined,
  exactMatch: true
};

export default Wizard;
