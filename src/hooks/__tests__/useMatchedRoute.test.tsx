import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import useMatchedRoute from "../useMatchedRoute";

// We need to define routes properly. 
// TRoute interface in types/global typically has path and Component.
const Home = () => <div>Home Page</div>;
const Data = () => <div>Data Page</div>;

const routes: any[] = [
    { path: "/home", Component: Home },
    { path: "/data/:id", Component: Data }
];

const TestComponent = ({ initialRoute, options, fallback }: { initialRoute: string, options?: any, fallback?: React.FC }) => {
    const { MatchedElement, route, params } = useMatchedRoute(routes, fallback, options);
    return (
        <div>
            <div data-testid="route-path">{route?.path}</div>
            <div data-testid="route-params">{JSON.stringify(params)}</div>
            <div data-testid="matched-element">{MatchedElement}</div>
        </div>
    );
};

describe("useMatchedRoute", () => {
    it("matches simple route", () => {
        render(
            <MemoryRouter initialEntries={["/home"]}>
                <TestComponent initialRoute="/home" />
            </MemoryRouter>
        );

        expect(screen.getByText("Home Page")).toBeInTheDocument();
        expect(screen.getByTestId("route-path")).toHaveTextContent("/home");
    });

    it("matches dynamic route with params", () => {
        render(
            <MemoryRouter initialEntries={["/data/123"]}>
                <TestComponent initialRoute="/data/123" />
            </MemoryRouter>
        );

        expect(screen.getByText("Data Page")).toBeInTheDocument();
        expect(screen.getByTestId("route-path")).toHaveTextContent("/data/:id");
        expect(screen.getByTestId("route-params")).toHaveTextContent('{"id":"123"}');
    });

    it("supports transition options (slide)", () => {
        render(
            <MemoryRouter initialEntries={["/home"]}>
                <TestComponent initialRoute="/home" options={{ transition: "slide-left" }} />
            </MemoryRouter>
        );
        expect(screen.getByText("Home Page")).toBeInTheDocument();
    });

    it("supports transition options (grow)", () => {
        render(
            <MemoryRouter initialEntries={["/home"]}>
                <TestComponent initialRoute="/home" options={{ transition: "grow" }} />
            </MemoryRouter>
        );
        expect(screen.getByText("Home Page")).toBeInTheDocument();
    });

    it("matches sub path", () => {
        const subPathRoutes = [
            { path: "/parent/child", Component: () => <div>Child</div> }
        ];

        const SubPathTest = () => {
            const { MatchedElement } = useMatchedRoute(subPathRoutes, undefined, { matchOnSubPath: true });
            return <div>{MatchedElement}</div>;
        };

        render(
            <MemoryRouter initialEntries={["/parent/child/more"]}>
                <SubPathTest />
            </MemoryRouter>
        );
        expect(screen.getByText("Child")).toBeInTheDocument();
    });
    it("supports transition options (none)", () => {
        render(
            <MemoryRouter initialEntries={["/home"]}>
                <TestComponent initialRoute="/home" options={{ transition: "none" }} />
            </MemoryRouter>
        );
        expect(screen.getByText("Home Page")).toBeInTheDocument();
    });

    it("renders fallback when no route matches", () => {
        const Fallback = () => <div>Fallback Page</div>;

        render(
            <MemoryRouter initialEntries={["/unmatched"]}>
                <TestComponent
                    initialRoute="/unmatched"
                    fallback={Fallback}
                />
            </MemoryRouter>
        );
        expect(screen.getByText("Fallback Page")).toBeInTheDocument();
    });
});
