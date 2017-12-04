# React Albus · [![Build Status](https://img.shields.io/travis/americanexpress/react-albus/master.svg?style=flat)](https://travis-ci.org/americanexpress/react-albus) [![Coverage Status](https://coveralls.io/repos/github/americanexpress/react-albus/badge.svg?branch=master)](https://coveralls.io/github/americanexpress/react-albus?branch=master) [![npm version](https://img.shields.io/npm/v/react-albus.svg?style=flat)](https://www.npmjs.com/package/react-albus)

> “Let us `<Step>` into the night and pursue that flighty temptress, adventure.”
>
> \-- _Albus Dumbledore_

## What is React Albus?
React Albus is a React component library used to build declarative multi-step journeys (also known as Wizards).  You define your step content and ordering and React Albus will manage the journey-related state for you.

React Albus is otherwise unopinionated and allows you to compose funcionality such as routing, animation, and analytics however you see fit.

## Installation

```
npm install react-albus
```

## Example

```jsx
import React from 'react';
import { Wizard, Steps, Step } from 'react-albus';

const Example = () => (
  <Wizard>
    <Steps>
      <Step
        id="merlin"
        render={({ next }) => (
          <div>
            <h1>Merlin</h1>
            <button onClick={next}>Next</button>
          </div>
        )}
      />
      <Step
        id="gandalf"
        render={({ next, previous }) => (
          <div>
            <h1>Gandalf</h1>
            <button onClick={next}>Next</button>
            <button onClick={previous}>Previous</button>
          </div>
        )}
      />
      <Step
        id="dumbledore"
        render={({ previous }) => (
          <div>
            <h1>Dumbledore</h1>
            <button onClick={previous}>Previous</button>
          </div>
        )}
      />
    </Steps>
  </Wizard>
);

export default Example;
```
## Demo

Check out the [demo page](http://americanexpress.io/react-albus)!

## API

- [`<Wizard>`](#wizard)
- [`<Steps>`](#steps)
- [`<Step>`](#step)
- [`withWizard`](#withwizard)
- [`wizardShape`](#wizardShape)
- [`context.wizard`](#contextwizard)

---

### `<Wizard>`

#### Props
##### `onNext(wizard)`: function *(optional)*
A function that will be called by `<Wizard>` to determine the next step to proceed to.

##### Params

* `wizard` (object): The [`context.wizard`](#contextwizard) object.

If you do not pass an `onNext` prop, `<Wizard>` will proceed directly to the next step.

##### `render(wizard)`: function *(optional)*
A function that will be used as the render function of `<Wizard>`.

##### Params
* `wizard` (object): The [`context.wizard`](#contextwizard) object.

---

### `<Steps>`
Wraps all of the `<Step>` components in your journey.  The only direct children of `<Steps>` should be `<Step>` components.

#### Props
##### `step`: object ***(optional)***
An object describing the current step with the structure: `{ id: string }`.  Defining a `step` prop will make `<Steps>` a [controlled component](https://facebook.github.io/react/docs/forms.html).

------

### `<Step>`

Wraps all the content that will be conditionally shown when the step is active.

#### Props

##### `id`: string

Unique key for each step.

In addition to `id`, any additional props added to `<Step>` will be available on each `step` object.  This can be used to add names, descriptions, or other metadata to each step.

`<WithWizard>` is an alias for `<Step>` that can be used to access [`context.wizard`](#contextwizard) anywhere within the `<Wizard>` tree.

---

### `withWizard()`
A higher order component that adds [`context.wizard`](#contextwizard) as a `wizard  ` prop on the wrapped component.

---

### `context.wizard`
`<Wizard>` provides an object on context with the following properties:

* `step` (object): Describes the current step with structure: `{ id: string }`.
* `steps` (array): Array of `step` objects in the order they were declared within `<Steps>`.
* `history` (object): The backing [`history`](https://github.com/ReactTraining/history#properties) object.
* `next()` (function): Moves to the next step in order.
* `previous()` (function): Moves to the previous step in order.
* `go(n)` (function): Moves `n` steps in history.
* `push(id)` (function): Pushes the step with corresponding `id` onto history.
* `replace(id)` (function): Replaces the current step in history with the step with corresponding `id`.

## Usage with React Router

Internally, React Albus uses [history](https://github.com/ReactTraining/history) to maintain the ordering of steps.  This makes integrating with React Router (or any other router) as easy as providing `<Wizard>` with `history` and `basename` props.

```jsx
import React from 'react';
import { Route } from 'react-router-dom';
import { Wizard } from 'react-albus';

const RoutedWizard = ({ children }) =>
  <Route
    render={({ history, match: { url } }) =>
      <Wizard history={history} basename={url}>
        {children}
      </Wizard>}
  />;

export default RoutedWizard;
```


## Contributing
We welcome Your interest in the American Express Open Source Community on Github. Any Contributor to any Open Source Project managed by the American Express Open Source Community must accept and sign an Agreement indicating agreement to the terms below. Except for the rights granted in this Agreement to American Express and to recipients of software distributed by American Express, You reserve all right, title, and interest, if any, in and to Your Contributions. Please [fill out the Agreement](https://cla-assistant.io/americanexpress/react-albus).

## License
Any contributions made under this project will be governed by the [Apache License 2.0](https://github.com/americanexpress/react-albus/blob/master/LICENSE.txt).

## Code of Conduct
This project adheres to the [American Express Community Guidelines](https://github.com/americanexpress/react-albus/wiki/Code-of-Conduct).
By participating, you are expected to honor these guidelines.

[![Analytics](https://ga-beacon.appspot.com/UA-85897603-1/react-albus/README.md?useReferrer)](https://github.com/americanexpress/react-albus)
