import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Wizard, Steps, Step } from 'react-albus';
import { Line } from 'rc-progress';
import Navigation from './Navigation';
import './exampleAnimation.css';

const AddProgressBar = () => (
  <BrowserRouter>
    <div className="row pad-t">
      <div className="col-xs-6 col-xs-offset-3">
        <Route
          render={({ history }) => (
            <Wizard history={history}>
              {({ steps, step }) => (
                <div>
                  <Line
                    percent={((steps.indexOf(step) + 1) / steps.length) * 100}
                    className="pad-b"
                  />
                  <TransitionGroup>
                    <CSSTransition
                      key={step.id}
                      classNames="example"
                      timeout={{ enter: 500, exit: 500 }}
                    >
                      <div className="example-steps fluid">
                        <Steps key={step.id}>
                          <Step id="gandalf">
                            <h1 className="text-align-center">Gandalf</h1>
                          </Step>
                          <Step id="dumbledore">
                            <h1 className="text-align-center">Dumbledore</h1>
                          </Step>
                          <Step id="ice-king">
                            <h1 className="text-align-center">Ice King</h1>
                          </Step>
                        </Steps>
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
                  <Navigation />
                </div>
              )}
            </Wizard>
          )}
        />
      </div>
    </div>
  </BrowserRouter>
);

render(<AddProgressBar />, document.getElementById('add-progress-bar'));
