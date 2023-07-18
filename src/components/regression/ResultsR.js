import React, { useState } from "react";
import { Box, Text, Heading, Stack, Button, Spinner } from "@chakra-ui/react";
import ChartComponent from "./ChartComponent";
import html2pdf from "html2pdf.js";

const ResultsR = ({ output }) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [isLoading_full, setIsLoading_full] = useState(false);

  const handleDownload = (id) => {
    const element = document.getElementById(id);
    const currentDate = new Date().toLocaleDateString().replace(/\//g, "-");
    const currentTime = new Date().toLocaleTimeString().replace(/:/g, "-");

    // setIsLoading(true);

    html2pdf()
      .set({
        filename: `${id}-results (${currentDate}_${currentTime}).pdf`,
        jsPDF: { format: "a4", orientation: "landscape" },
      })
      .from(element)
      .save();
  };

  // const handleAfterDownload = () => {
    // setIsLoading(false);
  // };

  // const handleAfterDownload_full = () => {
    // setIsLoading_full(false);
  // };

  const handleDownload_full = (id) => {
    const element = document.getElementById(id);
    const currentDate = new Date().toLocaleDateString().replace(/\//g, "-");
    const currentTime = new Date().toLocaleTimeString().replace(/:/g, "-");

    // setIsLoading_full(true);

    html2pdf()
      .set({
        filename: `${id}-results (${currentDate}_${currentTime}).pdf`,
        jsPDF: { format: "a4", orientation: "landscape" },
      })
      .from(element)
      .save();
  };

  return (
    <Stack
      border="2px solid black"
      w="98%"
      p={2}
      m={2}
      borderRadius={15}
      mt={7}
    >
      <Box id="full">
        <Heading size="md" m={3} mt={4} mb={4}>
          Results:
        </Heading>
        {output.map((object) => (
          <Stack
            key={object.model}
            border="1px dashed blue"
            borderRadius={15}
            m={2}
            p={2}
            style={{ pageBreakAfter: "always" }}
            width={{ lg: "975px" }}
          >
            <Stack id={object.model} p={2} m={3} spacing={2}>
              <Text align="center" fontSize="xl">
                <b>{object.model}</b>
              </Text>
              <Text>R-Squared: {object.r2}</Text>
              <Text>Root Mean Square Error: {object.rmse}</Text>
              <Text>Mean Square Error: {object.mse}</Text>
              <Text>Mean Absolute Error: {object.mae}</Text>
              {/* <Box id={object.model}_chart> */}
              <ChartComponent
                y_test={object.y_test}
                pred={object.pred}
                title={object.model}
              />
              {/* </Box> */}
            </Stack>
            <Button
              onClick={() => handleDownload(object.model)}
              colorScheme="blue"
              borderRadius={15}
            >
              Download {object.model}'s results and chart as PDF
            </Button>
            {/* <Button
              onClick={() => handleDownload(object.model+"_chart")}
              colorScheme="blue"
              borderRadius={15}
            >
            Download {object.model}'s Chart as PDF
            </Button> */}
          </Stack>
        ))}
      </Box>
      <Button
        onClick={() => handleDownload_full("full")}
        colorScheme="blue"
        borderRadius={15}
      >
        Download full results as PDF
      </Button>
    </Stack>
  );
};

export default ResultsR;
