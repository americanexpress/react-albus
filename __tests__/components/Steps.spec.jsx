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
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { Steps } from "../../src";
import useWizard from "../../src/hooks/useWizard";

const mockOnInit = jest.fn();

jest.mock("../../src/hooks/useWizard", () =>
  jest.fn(() => ({
    step: {
      id: null
    },
    onInit: mockOnInit
  }))
);

const Step = () => null;

describe("Steps", () => {
  let rendered;

  afterEach(() => {
    rendered.unmount();
  });

  it("should call init", () => {
    act(() => {
      rendered = mount(
        <Steps>
          <Step id="hogwarts" />
        </Steps>
      );
    });

    expect(mockOnInit).toHaveBeenCalledWith([{ id: "hogwarts" }]);
  });

  it("should render correct child if controlled", () => {
    useWizard.mockImplementationOnce(() => ({
      onInit: mockOnInit
    }));

    act(() => {
      rendered = mount(
        <Steps step={{ id: "gryffindor" }}>
          <Step id="hogwarts" />
          <Step id="gryffindor" />
        </Steps>
      );
    });

    expect(rendered).toMatchSnapshot();
  });
});
