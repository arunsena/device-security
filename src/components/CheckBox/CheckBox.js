import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// CheckBox Component
const CheckBox = (props) => {
  const { checkBoxProps, defaultChecked, handleOnSelect, value } = props;

  const checkBoxRef = useRef();
  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    checkBoxRef.current.checked = value === 1;
    checkBoxRef.current.indeterminate = value === -1;
  }, [value]);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const onChange = () => {
    setChecked(!checked);
    handleOnSelect && handleOnSelect(checked);
  };

  return (
    <input
      aria-checked={checked}
      checked={checked}
      data-testid="checkBox"
      onChange={onChange}
      ref={checkBoxRef}
      type="checkbox"
      {...checkBoxProps}
    ></input>
  );
};

// PropTypes
CheckBox.propTypes = {
  checkBoxProps: PropTypes.object,
  handleOnSelect: PropTypes.func,
  value: PropTypes.number,
  defaultChecked: PropTypes.bool,
};

// Default props
CheckBox.defaultProps = {
  defaultChecked: false,
};

export default CheckBox;
