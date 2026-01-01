import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccessDenied from "../index";

// Mock translation
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key
    })
}));

describe("AccessDenied Page", () => {
    it("renders access denied message", () => {
        render(<AccessDenied />);
        // Checking if translation keys are rendered
        expect(screen.getByText("AccessDenied")).toBeInTheDocument();
        expect(screen.getByText("speakToYourAdmin")).toBeInTheDocument();
    });
});
