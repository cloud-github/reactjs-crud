import React from "react";
import { shallow } from "enzyme";
import App from "./app";

it("renders without crashing", () => {
  shallow(<App />);
});
