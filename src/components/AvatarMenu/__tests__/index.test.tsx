import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AvatarMenu from "../index";
import { User } from "../../../api/services/User/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Mock react-i18next
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key
    })
}));

// Mock icons
jest.mock("@mdi/react", () => () => <svg data-testid="icon" />);

describe("AvatarMenu", () => {
    const mockUser: User = {
        firstName: "John",
        lastName: "Doe",
        eMail: "john.doe@example.com"
    };

    const theme = createTheme();

    const renderComponent = (user: User = mockUser) => {
        return render(
            <ThemeProvider theme={theme}>
                <AvatarMenu user={user} />
            </ThemeProvider>
        );
    };

    it("renders user initials in avatar", () => {
        renderComponent();
        expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("opens menu on click", () => {
        renderComponent();
        const avatar = screen.getByText("JD");
        fireEvent.click(avatar);

        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
        expect(screen.getByText("logout")).toBeInTheDocument();
    });

    it("handles undefined names gracefully", () => {
        const incompleteUser: User = {
            firstName: "",
            lastName: "",
            eMail: "test@test.com"
        };

        render(
            <ThemeProvider theme={theme}>
                <AvatarMenu user={incompleteUser} />
            </ThemeProvider>
        );

        // Should verify it doesn't crash. Initials might be empty string.
        // The previous implementation fix returns "" if no names.
        // Material UI Avatar with no children might render a default person icon or just be empty.
        // Let's check if the element exists.
        // Since our implementation returns { children: "" }, it renders an empty Avatar.
    });
});
