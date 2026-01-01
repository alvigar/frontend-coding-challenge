import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StoreProvider, useUserStore } from "../index";
import UserStore from "../store";

describe("User Service", () => {
    it("StoreProvider provides the store", () => {
        const TestComponent = () => {
            const store = useUserStore();
            return <div>{store instanceof UserStore ? "Store Present" : "No Store"}</div>;
        };

        const { getByText } = render(
            <StoreProvider>
                <TestComponent />
            </StoreProvider>
        );

        expect(getByText("Store Present")).toBeInTheDocument();
    });

    it("useUserStore returns null if used outside provider", () => {
        // Manually test hook context consumption without renderHook
        let storeValue: any = undefined;
        const TestComponent = () => {
            storeValue = useUserStore();
            return null;
        };

        render(<TestComponent />);
        expect(storeValue).toBeNull();
    });
});
