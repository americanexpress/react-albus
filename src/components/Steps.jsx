import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import useWizard from "../hooks/useWizard";

const Steps = ({ step, children: childSteps }) => {
  const { step: wizardStep, onInit } = useWizard();

  useEffect(() => {
    const steps = React.Children.map(childSteps, child => {
      const {
        props: { children, ...config }
      } = child;
      return config;
    });

    onInit(steps);
  }, []);

  const { id: activeId } = step || wizardStep;
  const [child = null] = React.Children.toArray(childSteps).filter(
    ({ props: { id } }) => id === activeId
  );

  return child;
};

Steps.propTypes = {
  children: PropTypes.node.isRequired,
  step: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
};

Steps.defaultProps = {
  step: null
};

export default memo(Steps);
