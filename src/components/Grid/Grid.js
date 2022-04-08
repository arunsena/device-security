import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

// Components
import Button from "../Button";
import CheckBox from "../CheckBox";
import Status from "../Status";

// Styles
const GridActions = styled.div`
  padding: 10px;
`;

const GridContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 1px 2px 2px 2px #ccc;
  overflow-x: auto;
  width: 80%;
`;

const GridCount = styled.span`
  margin-right: 50px;
`;

const GridData = styled.table`
  border-collapse: collapse;
  padding: 10px;
  width: 100%;
`;

const GridRow = styled.tr`
  background-color: ${({ selected }) => (selected ? "#eee" : "#fff")};
  cursor: pointer;
  &: hover {
    background-color: #eee;
  }
`;

const GridDataHeader = styled.th`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 15px;
  text-align: start;
`;

const GridDataItem = styled.td`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 15px;
`;

// Grid Component
const Grid = (props) => {
  const { columns, data, dataTestId } = props;
  const [gridData, setGridData] = useState(data);
  const [selectAllValue, setSelectAllValue] = useState(0);

  useEffect(() => {
    setGridData(data);
  }, [data]);

  const handleClick = () => {
    const selectedData = gridData
      .filter((item) => item.checked && item.status === "available")
      .map((item) => {
        return {
          device: item.device,
          path: item.path,
        };
      });
    console.log(selectedData);
    return alert(JSON.stringify(selectedData));
  };

  const handleSelectAll = (value) => {
    const result = gridData.map((item) => {
      return {
        ...item,
        checked: Boolean(!value),
      };
    });

    setGridData(result);
  };

  const handleSelect = (value, name) => {
    const result = gridData.map((item) => {
      if (name !== item.name) {
        return item;
      }
      return {
        ...item,
        checked: !value,
      };
    });

    const selectedCount = result.filter((item) => item.checked).length;
    const selectAllValue =
      selectedCount !== gridData.length && selectedCount > 0
        ? -1
        : Number(!value);

    setSelectAllValue(selectAllValue);
    setGridData(result);
  };

  const selectionCount = gridData.filter((item) => item.checked).length;

  return (
    <GridContainer data-testid={dataTestId}>
      <GridActions>
        <CheckBox
          value={selectAllValue}
          handleOnSelect={(event) => handleSelectAll(event)}
        ></CheckBox>
        <GridCount aria-label="selected row count">
          {selectionCount ? `Selected ${selectionCount}` : "None Selected"}
        </GridCount>
        <Button
          label="Download Selected"
          handleOnClick={() => handleClick()}
        ></Button>
      </GridActions>
      <GridData aria-label="grid table" aria-describedby="Device Details Table">
        <thead>
          <GridRow>
            {columns.map((column, index) => (
              <GridDataHeader key={index}>{column.column}</GridDataHeader>
            ))}
          </GridRow>
        </thead>
        <tbody>
          {gridData?.map((item) => (
            <GridRow key={item.name} selected={item.checked}>
              <GridDataItem>
                <CheckBox
                  defaultChecked={item.checked}
                  handleOnSelect={(event) => handleSelect(event, item.name)}
                ></CheckBox>
              </GridDataItem>
              <GridDataItem>{item.name}</GridDataItem>
              <GridDataItem>{item.device}</GridDataItem>
              <GridDataItem>{item.path}</GridDataItem>
              <GridDataItem>
                <Status
                  label={item.status}
                  status={item.status === "available" ? "up" : "down"}
                ></Status>
              </GridDataItem>
            </GridRow>
          ))}
        </tbody>
      </GridData>
    </GridContainer>
  );
};

// PropTypes
Grid.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

// Default Props
Grid.defaultProps = {
  columns: [],
  data: [],
};

export default Grid;
