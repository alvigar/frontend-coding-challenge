import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../index";

// Mock react-i18next
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key
    }),
    Trans: ({ i18nKey }: { i18nKey: string }) => <span>{i18nKey}</span>
}));

describe("Home Page", () => {
    it("renders welcome message", () => {
        render(<Home />);
        expect(screen.getByText("home.welcome")).toBeInTheDocument();
    });

    it("renders introduction using Trans", () => {
        render(<Home />);
        expect(screen.getByText("home.intro")).toBeInTheDocument();
    });

    it("renders list of issues", () => {
        render(<Home />);
        // There are 5 issues in the list
        // We can check for some titles
        expect(screen.getByText(/Console error/i)).toBeInTheDocument();
        expect(screen.getByText(/The word "known" should be displayed bold/i)).toBeInTheDocument();
    });
});
