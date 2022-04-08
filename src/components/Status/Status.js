import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

// Styles
const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StatusIcon = styled.span`
  background-color: ${({ status }) => (status === "up" ? "#43e943" : "#fff")};
  border-radius: 50%;
  border: 1px solid ${({ status }) => (status === "up" ? "#43e943" : "#fff")};
  display: ${({ status }) => (status === "up" ? "inline-block" : "none")};
  height: 10px;
  margin-right: 5px;
  width: 10px;
`;

const StatusLabel = styled.span``;

// Status Component
const Status = (props) => {
  const { label, status } = props;

  return (
    <StatusContainer>
      <StatusIcon aria-label={status} data-testid="status"status={status}></StatusIcon>
      <StatusLabel aria-label={label}>
        {label.replace(label[0], label[0].toUpperCase())}
      </StatusLabel>
    </StatusContainer>
  );
};

// Prop Types
Status.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Status;
