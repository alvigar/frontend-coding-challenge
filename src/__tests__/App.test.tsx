import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

// Mock RootComponent to avoid rendering the entire app tree in this unit test
jest.mock("../pages/Root/index", () => {
    return function MockRoot() {
        return <div data-testid="root-component">Root Component</div>;
    };
});

// Mock i18n
jest.mock("../i18n", () => ({}));

describe("AppContainer", () => {
    it("renders without crashing and displays RootComponent", () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId("root-component")).toBeInTheDocument();
    });
});
