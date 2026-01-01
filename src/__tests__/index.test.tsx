import ReactDOM from "react-dom";
import App from "../App";

jest.mock("react-dom", () => ({
    render: jest.fn()
}));

jest.mock("../App", () => () => <div data-testid="app-mock">App</div>);

describe("index.tsx", () => {
    it("renders App into root", () => {
        // Setup root element
        const root = document.createElement("div");
        root.id = "root";
        document.body.appendChild(root);

        // We need to require index.tsx to trigger execution
        require("../index");

        expect(ReactDOM.render).toHaveBeenCalledWith(
            expect.anything(), // <React.StrictMode><App /></React.StrictMode>
            root
        );
    });
});
