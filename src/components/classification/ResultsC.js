import React, { useState } from "react";
import { Box, Text, Heading, Stack, Button } from "@chakra-ui/react";
import html2pdf from "html2pdf.js";
import ConfusionMatrix from "./ConfusionMatrix";

const ResultsC = ({ output }) => {
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [isLoadingFull, setIsLoadingFull] = useState(false);

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

  //   const handleAfterDownload = () => {
  // setIsLoading(false);
  //   };

  //   const handleAfterDownloadFull = () => {
  // setIsLoadingFull(false);
  //   };

  const handleDownloadFull = (id) => {
    const element = document.getElementById(id);
    const currentDate = new Date().toLocaleDateString().replace(/\//g, "-");
    const currentTime = new Date().toLocaleTimeString().replace(/:/g, "-");

    // setIsLoadingFull(true);

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
              <Text>Accuracy Score: {object.acs}</Text>
              <Text>Precision Score: {object.ps}</Text>
              <Text>Recall Score: {object.rs}</Text>
              <Text>F1 Score: {object.f1s}</Text>
              {/* <ConfusionMatrix y_true={object.y_test} y_pred={object.pred}/> */}
            </Stack>
            <Button
              onClick={() => handleDownload(object.model)}
              colorScheme="blue"
              borderRadius={15}
            >
              Download {object.model}'s results and confusion matrix as PDF
            </Button>
          </Stack>
        ))}
      </Box>
      <Button
        onClick={() => handleDownloadFull("full")}
        colorScheme="blue"
        borderRadius={15}
      >
        Download full results as PDF
      </Button>
    </Stack>
  );
};

export default ResultsC;
