import { render, screen , fireEvent} from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  const handleOnClick = jest.fn();

  it('should render button with "Button" label by default', () => {
    render(<Button handleOnClick={handleOnClick} />);
    const button = screen.getByText(/Button/i);
    expect(button).toBeInTheDocument();
  });

  it('should render button with "Download Selected" label prop', () => {
    const label = "Download Selected";
    render(<Button handleOnClick={handleOnClick} label={label} />);

    const button = screen.getByText(label);
    expect(button).toBeInTheDocument();
  });

  it('should handle on click event', () => {
    render(<Button handleOnClick={handleOnClick} />);

    const button = screen.getByText(/Button/i);
    fireEvent.click(button);
    expect(handleOnClick).toHaveBeenCalled();
  });

  it('should handle on disbled prop', () => {
    render(<Button handleOnClick={handleOnClick} disabled/>);

    const button = screen.getByText(/Button/i);
    fireEvent.click(button);
    expect(handleOnClick).not.toHaveBeenCalled();
  });
});
