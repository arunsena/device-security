import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";

import deviceMockService from "./services/deviceService";

describe("App component", () => {
  it("should render app", async () => {
    render(<App />);
    await act(async () => {
      await deviceMockService();
    });

    const heading = screen.getByText(/DEVICE DETAILS/i);
    const grid = screen.getByTestId("grid");
    const checkBoxes = screen.getAllByRole("checkbox");
    expect(heading).toBeInTheDocument();
    expect(grid).toBeInTheDocument();
    expect(checkBoxes.length).toBe(6);
  });
});
