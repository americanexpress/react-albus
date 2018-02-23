import React from 'react';
import { WithWizard } from 'react-albus';

const Navigation = () => (
  <WithWizard
    render={({ next, previous, step, steps }) => (
      <div className="example-buttons">
        {steps.indexOf(step) < steps.length - 1 && (
          <button className="btn-fluid margin-1-b" onClick={next}>
            Next
          </button>
        )}

        {steps.indexOf(step) > 0 && (
          <button className="btn-fluid btn-secondary" onClick={previous}>
            Back
          </button>
        )}
      </div>
    )}
  />
);

export default Navigation;
