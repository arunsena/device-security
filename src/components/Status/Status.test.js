import { render, screen } from "@testing-library/react";
import Status from "./Status";

describe("Status Component", () => {
  it("should render Status component", () => {
    render(<Status label="test label" status=""></Status>);

    const status = screen.getByText(/test label/i);
    expect(status).toBeInTheDocument();
  });

  it("should render Status component with status UP", () => {
    render(<Status label="Up Status" status="up"></Status>);

    const statusLabel = screen.getByText(/Up Status/i);
    const status = screen.getByTestId("status");
    expect(statusLabel).toBeInTheDocument();
    expect(status).toBeInTheDocument();
  });
});
