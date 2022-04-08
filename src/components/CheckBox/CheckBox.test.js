import { render, screen, fireEvent } from "@testing-library/react";
import CheckBox from "./CheckBox";

describe("CheckBox Component", () => {
  it("should render checkbox component", () => {
    render(<CheckBox></CheckBox>);

    const checkbox = screen.getByTestId("checkBox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("should render checkbox component with checked value true", () => {
    render(<CheckBox value={1}></CheckBox>);

    const checkbox = screen.getByTestId("checkBox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it("should render checkbox component with checked value false", () => {
    render(<CheckBox value={0}></CheckBox>);

    const checkbox = screen.getByTestId("checkBox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("should toggle checkbox", () => {
    const handleOnSelect = jest.fn();
    render(
      <CheckBox value={0} handleOnSelect={() => handleOnSelect()}></CheckBox>
    );

    const checkbox = screen.getByTestId("checkBox");
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(handleOnSelect).toHaveBeenCalled();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
