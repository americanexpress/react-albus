# React Albus

> “Let us `<Step>` into the night and pursue that flighty temptress, adventure.”
>
> \-- _Albus Dumbledore_

## What is React [Albus](http://u.kanobu.ru/comments/images/3c682662-4e19-49c6-b85b-539db47ff838.gif)?
React Albus is a React component library for building declarative multi-step flows (also known as Wizards).  You are responsible for writing your own steps and configuring their ordering, but React Albus will maintain the flow-related state for you.

React Albus also allows you to create routed flows, conditionally skip steps in your flow, and create custom elements to suit your needs.

## Example

```jsx
import React from 'react';
import { Wizard, Step, Steps, Navigation } from 'react-albus';

const Simple = () =>
  <Wizard>
    <Steps>
      <Step path="firstStep">
        <h1>First Step</h1>
        <Navigation
          render={({ next }) =>
            <button onClick={next}>Next</button>}
        />
      </Step>
      <Step path="secondStep">
        <h1>Second Step</h1>
        <Navigation
          render={({ next, previous }) =>
            <div>
              <button onClick={next}>Next</button>
              <button onClick={previous}>Previous</button>
            </div>}
        />
      </Step>
      <Step path="thirdStep">
        <h1>Third Step</h1>
        <Navigation
          render={({ previous }) =>
            <button onClick={previous}>Previous</button>}
        />
      </Step>
    </Steps>
  </Wizard>;

export default Simple;
```
To explore [more examples](https://github.com/americanexpress/react-albus/tree/master/examples), `git clone`, `npm install` and `npm start`.

## API

- [`<Wizard>`](#wizard)
- [`<Step>`](#step)
- [`<Steps>`](#steps)
- [`<Navigation>`](#navigation)
- [`withWizard`](#withwizard)
- [`context.wizard`](#contextwizard)

---

### `<Wizard>`

#### Props
##### `onNext(step, steps, push)`: function *(optional)*
A function that will be called by Wizard to determine the next step to proceed to.

##### Params
* `step`: An object describing the current step with the signature: `{ path: string, name: string }`.
* `steps`: An array of `step` objects in the order they were declared in `<Steps>`.
* `push(path)`: A function that can be called with the `path` of the step that you want to proceed to.  Calling this function without arguments will proceed to the next step.

If you do not pass an `onNext` prop, `<Wizard>` will proceed directly to the next step.

##### `className`: string *(optional)*
CSS classes to be added to the `<div>` created by `<Wizard>`.
##### `render(wizard)`: function *(optional)*
A function that will be used as the render function of `<Wizard>`.

##### Params
* `wizard`: The [`context.wizard`](#contextwizard) object.

---

### `<Step>`
Wraps all the content that will be conditionally shown when the step is active.

#### Props
##### `path`: string
Unique key for each step.
##### `name`: string *(optional)*
A name for the step that can later be accessed on [`context.wizard`](#contextwizard).
##### `className`: string *(optional)*
CSS classes to be added to the `<div>` created by `<Step>`.

---

### `<Steps>`
Wraps all of the `<Step>` components for your flow.  The only direct children of `<Steps>` should be `<Step>` components.

#### Props
##### `step`: object ***(optional)***
An object describing the current step with the signature: `{ path: string, name: string }`.  Defining this prop will make `<Steps>` a [controlled component](https://facebook.github.io/react/docs/forms.html).

---

### `<Navigation>`
Exposes the Wizard navigation functionality for your components to use.  Extends its child's props with [`context.wizard`](#contextwizard) and passes [`context.wizard`](#contextwizard) to its render prop.
#### Props
##### `render(wizard)`: function *(optional)*
A function that will be used as the render function of `<Navigation>`.

##### Params
* `wizard`: The [`context.wizard`](#contextwizard) object.

---

### `withWizard()`
A higher order component that spreads [`context.wizard`](#contextwizard) across the wrapped component's props.

---

### `context.wizard`
`<Wizard>` adds this object to context with the following properties:

* `step` (object): Describes the current step with signature: `{ path: string, name: string }`.
* `steps` (array): Array of `step` objects in the order they were declared within `<Steps>`.
* `history` (object): The backing [`history`](https://github.com/ReactTraining/history#properties) object.
* `next()` (function): Moves to the next step in order.
* `previous()` (function): Moves to the previous step in order.
* `go(n)` (function): Moves *n* steps in history.
* `push(path)` (function): Moves to the step with prop `path`.

## Usage with React Router

Internally, React Albus uses [history](https://github.com/ReactTraining/history) to maintain the ordering of steps.  This makes integrating with React Router (or any other router) as easy as providing Albus with a `history` object and a `basename` where it is living.

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
We welcome Your interest in the American Express Open Source Community on Github. Any Contributor to any Open Source Project managed by the American Express Open Source Community must accept and sign an Agreement indicating agreement to the terms below. Except for the rights granted in this Agreement to American Express and to recipients of software distributed by American Express, You reserve all right, title, and interest, if any, in and to Your Contributions. Please [fill out the Agreement](http://goo.gl/forms/mIHWH1Dcuy).

## License
Any contributions made under this project will be governed by the [Apache License 2.0](https://github.com/americanexpress/react-albus/blob/master/LICENSE.txt).

## Code of Conduct
This project adheres to the [American Express Community Guidelines](https://github.com/americanexpress/react-albus/wiki/Code-of-Conduct).
By participating, you are expected to honor these guidelines.

[![Analytics](https://ga-beacon.appspot.com/UA-85897603-1/react-albus/README.md?useReferrer)](https://github.com/americanexpress/react-albus)
