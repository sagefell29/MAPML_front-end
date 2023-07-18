import React from "react";
import { Box, Text, Heading, Stack, Button } from "@chakra-ui/react";
import ChartComponent from "./regression/ChartComponent";
import html2pdf from "html2pdf.js";

const handleDownload = (id) => {
  const element = document.getElementById(id);  
  const currentDate = new Date().toLocaleDateString().replace(/\//g, "-");
  const currentTime = new Date().toLocaleTimeString().replace(/:/g, "-");

  html2pdf()
    .set({ filename: `${id} results (${currentDate})_(${currentTime}).pdf` })
    .from(element)
    .save();
};

const Test = ({ output }) => {
  return (
    <Stack border="2px solid black" w="98%" p={2} m={3} borderRadius={15}>
      <Box id="full">
        <Heading size="md" mb={4}>
          Results:
        </Heading>
        {output.map((object) => (
          <Stack
            key={object.model}
            border="1px dashed blue"
            borderRadius={15}
            m={2}
            p={2}
          >
            <Stack id={object.model} p={2} m={2}>
              <Text>
                <b>Model: {object.model}</b>
              </Text>
              <Text>R-Squared: {object.r2}</Text>
              <Text>RMSE: {object.rmse}</Text>
              <Text>MSE: {object.mse}</Text>
              <ChartComponent
                y_test={object.y_test}
                pred={object.pred}
                title={object.model}
              />
            </Stack>
            <Button
              onClick={() => handleDownload(object.model)}
              colorScheme="blue"
              borderRadius={15}
            >
              Download {object.model}'s results as PDF
            </Button>
          </Stack>
        ))}
      </Box>
      <Button
        onClick={() => handleDownload("full")}
        colorScheme="blue"
        borderRadius={15}
      >
        Download full results as PDF
      </Button>
    </Stack>
  );
};

export default Test;
