/*
 * Copyright (c) 2017 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

import React from "react";
import { shallow } from "enzyme";
import { withWizard } from "../src";

jest.mock("../src/hooks/useWizard", () =>
  jest.fn(() => ({ hogwarts: "rules" }))
);

const WrappedComponent = () => <div />;

describe("withWizard", () => {
  it("should add wizard prop to wrapped component", () => {
    const Wrapped = withWizard(WrappedComponent);
    const rendered = shallow(<Wrapped />);
    expect(rendered).toMatchSnapshot();
  });

  it("should use component props over context", () => {
    const Wrapped = withWizard(WrappedComponent);
    const rendered = shallow(<Wrapped wizard="hogwarts" />);
    expect(rendered).toMatchSnapshot();
  });
});
