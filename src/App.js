import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

// Component
import Grid from "./components/Grid";

// Services
import deviceMockService from "./services/deviceService";

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h2`
  text-decoration: underline;
`;

function App() {
  const [data, setData] = useState([]);

  const columns = [
    { column: "", accessor: "checked" },
    { column: "Name", accessor: "name" },
    { column: "Device", accessor: "device" },
    { column: "Path", accessor: "path" },
    { column: "Status", accessor: "status" },
  ];

  useEffect(() => {
    try {
      deviceMockService().then((result) => {
        const formattedData = result.map((item) => {
          return { ...item, checked: false };
        });
        setData(formattedData);
      });
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  return (
    <Container>
      <Heading aria-label="Device Details">DEVICE DETAILS</Heading>
      <Grid dataTestId="grid" data={data} columns={columns}></Grid>
    </Container>
  );
}

export default App;
