import { render, screen, fireEvent } from "@testing-library/react";
import Grid from "./Grid";

describe("Grid Component", () => {
  it("should render Grid component", () => {
    render(<Grid></Grid>);

    const selectAllCheckBox = screen.getByTestId("checkBox");
    const selectionCountLabel = screen.getByText(/None Selected/i);
    const table = screen.getByRole("table");
    expect(selectionCountLabel).toBeInTheDocument();
    expect(selectAllCheckBox).toBeInTheDocument();
    expect(selectAllCheckBox).not.toBeChecked();
    expect(table).toBeInTheDocument();
  });

  it("should render Grid component with data and columns", () => {
    const data = [
      {
        name: "smss.exe",
        device: "Stark",
        path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
        status: "scheduled",
      },
      {
        name: "netsh.exe",
        device: "Targaryen",
        path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
        status: "available",
      },
    ];

    const columns = [
      { column: "", accessor: "checked" },
      { column: "Name", accessor: "name" },
      { column: "Device", accessor: "device" },
      { column: "Path", accessor: "path" },
      { column: "Status", accessor: "status" },
    ];
    render(<Grid data={data} columns={columns}></Grid>);

    const selectionCountLabel = screen.getByText(/None Selected/i);
    const table = screen.getByRole("table");
    const statusLabel = screen.getByText(/available/i);
    expect(selectionCountLabel).toBeInTheDocument();
    expect(table).toBeInTheDocument();
    expect(statusLabel).toBeInTheDocument();
  });

  it("should toggle select all checkbox", () => {
    const data = [
      {
        name: "smss.exe",
        device: "Stark",
        path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
        status: "scheduled",
      },
      {
        name: "netsh.exe",
        device: "Targaryen",
        path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
        status: "available",
      },
    ];

    const columns = [
      { column: "", accessor: "checked" },
      { column: "Name", accessor: "name" },
      { column: "Device", accessor: "device" },
      { column: "Path", accessor: "path" },
      { column: "Status", accessor: "status" },
    ];
    render(<Grid data={data} columns={columns}></Grid>);

    const selectAllCheckBox = screen.getAllByTestId("checkBox");
    const table = screen.getByRole("table");
    fireEvent.click(selectAllCheckBox[0]);
    const selectionCountLabel = screen.getByText(/Selected 2/i);
    expect(selectAllCheckBox[0]).toBeInTheDocument();
    expect(selectAllCheckBox[0]).toBeChecked();
    expect(selectionCountLabel).toBeInTheDocument();
    expect(table).toBeInTheDocument();
  });
});
