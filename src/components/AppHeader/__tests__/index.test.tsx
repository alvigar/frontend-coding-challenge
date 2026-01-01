import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppHeader from "../index";
import { User } from "../../../api/services/User/store";
import { ThemeProvider } from "@mui/material/styles";
import { osapiens } from "../../../themes";

// Mock Material UI Grow to avoid JSDOM transition errors
jest.mock("@mui/material", () => {
    const originalModule = jest.requireActual("@mui/material");
    return {
        ...originalModule,
        Grow: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
    };
});

// Mock react-i18next
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: {
            language: "en",
            changeLanguage: jest.fn(),
            resolvedLanguage: "en"
        }
    })
}));

// Mock AvatarMenu to avoid complexity
jest.mock("../../AvatarMenu", () => () => <div data-testid="avatar-menu">AvatarMenu</div>);

describe("AppHeader", () => {
    const mockUser: User = {
        firstName: "John",
        lastName: "Doe",
        eMail: "john.doe@example.com"
    };

    const theme = osapiens.light;

    const renderComponent = (user: User = mockUser) => {
        return render(
            <ThemeProvider theme={theme}>
                <AppHeader user={user} pageTitle="Test Page" />
            </ThemeProvider>
        );
    };

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    it("renders page title and app title", () => {
        renderComponent();
        expect(screen.getByText("APPTITLE")).toBeInTheDocument(); // Uppercase from component
        expect(screen.getByText("TEST PAGE")).toBeInTheDocument(); // Uppercase from component
    });

    it("renders countdown and updates it", () => {
        renderComponent();
        // Initial state: 60 minutes = 3600 seconds. 
        // The component calculates countdown = 3600 - count.
        // 3600 / 60 = 60 minutes. 3600 % 60 = 0 seconds.
        // However, the logic is:
        // const hours = 1;
        // const minutes = hours * 60; // 60
        // const seconds = minutes * 60; // 3600
        // const countdown = seconds - count;
        // const countdownMinutes = `${~~(countdown / 60)}`.padStart(2, "0");
        // const countdownSeconds = (countdown % 60).toFixed(0).padStart(2, "0");

        expect(screen.getByText("60:00")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        // count becomes 1. countdown = 3599.
        // 3599 / 60 = 59.98 -> 59
        // 3599 % 60 = 59
        expect(screen.getByText("59:59")).toBeInTheDocument();
    });

    it("renders language switcher", () => {
        renderComponent();
        expect(screen.getByText("EN")).toBeInTheDocument();
    });

    it("renders avatar menu when user is present", () => {
        renderComponent();
        expect(screen.getByTestId("avatar-menu")).toBeInTheDocument();
    });
});
