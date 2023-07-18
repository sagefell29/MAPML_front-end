import React, { useState } from "react";
import {
  ChakraProvider,
  CSSReset,
  Box,
  Stack,
  Heading,
  FormControl,
  HStack,
  FormLabel,
  Select,
  Input,
  Flex,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import Test from "./components/Test";
import Results from "./components/regression/ResultsR";
import AttributeSelection from "./components/AttributeSelection";
import ModelSelectionR from "./components/regression/ModelSelectionR";
import ModelSelectionC from "./components/classification/ModelSelectionC";

const BackendURL = "http://127.0.0.1:8000/api";

const AppTest = () => {
  const [file, setFile] = useState(null);
  const [outputAttribute, setOutputAttribute] = useState("");
  const [threshold, setThreshold] = useState("0");
  const [selectedModels, setSelectedModels] = useState(["Linear_Regression"]);
  const [response, setResponse] = useState(null);
  const [selectedTask, setSelectedTask] = useState("regression");
  const [enableOutlierDetection, setEnableOutlierDetection] = useState(false);
  const [outlierDetectionMethod, setOutlierDetectionMethod] = useState("None");
  const [enableDimensionalityReduction, setEnableDimensionalityReduction] =
    useState(false);
  const [dimensionalityReductionMethod, setDimensionalityReductionMethod] =
    useState("None");
  const [handleCategoricalVariable, setCategoricalVariable] = useState("None");

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append("dataset", file);
    formData.append("output_Attribute", outputAttribute);
    formData.append("threshold", threshold);
    formData.append("model_Type", selectedModels);
    formData.append("task", selectedTask);
    formData.append("Outlier_Detection", enableOutlierDetection);
    formData.append("OD_Method", outlierDetectionMethod);
    formData.append("Dimensionality_Reduction", enableDimensionalityReduction);
    formData.append("DR_Method", dimensionalityReductionMethod);
    formData.append("handle_categorical_variable", handleCategoricalVariable);

    try {
      // Send POST request to backend
      const response = await axios.post(`${BackendURL}/predict`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Handle the response
      console.log("Response:", response.data);
      setResponse(response.data); // Store the response data
    } catch (error) {
      console.error("Error:", error); // Display an error message or take appropriate action
    }
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Stack
        align="center"
        w="98%"
        m={2}
        p={3}
        border="2px solid black"
        borderRadius={15}
      >
        <Heading mb={5}>CIMAP Trial</Heading>
        <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
          <Box border="1px dashed blue" p={3} mb={3} borderRadius={15}>
            <FormControl>
              <HStack>
                <FormLabel m={2} w={{ sm: "130px" }}>
                  Task:
                </FormLabel>
                <Select
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                >
                  <option value="regression">Regression</option>
                  <option value="classification">Classification</option>
                </Select>
              </HStack>
            </FormControl>
          </Box>

          <Box border="1px dashed blue" p={3} mb={3} borderRadius={15}>
            <FormControl>
              <HStack>
                <FormLabel m={2} w={{ sm: "130px" }}>
                  Upload File:
                </FormLabel>
                <Input m={2} type="file" onChange={handleFileUpload} />
              </HStack>
            </FormControl>
          </Box>

          {file && selectedTask && (
            <Box border="1px dashed blue" p={3} mb={3} borderRadius={15}>
              <FormControl>
                <HStack>
                  <FormLabel m={2} w={{ sm: "130px" }}>
                    Select Output Attribute:
                  </FormLabel>
                  <AttributeSelection
                    file={file}
                    selectedTask={selectedTask}
                    outputAttribute={outputAttribute}
                    setOutputAttribute={setOutputAttribute}
                  />
                </HStack>
              </FormControl>
            </Box>
          )}

          {file && selectedTask && (
            <Box border="1px dashed blue" p={3} mb={3} borderRadius={15}>
              <FormControl>
                <HStack>
                  <FormLabel m={2} w={{ sm: "130px" }}>
                    Handling Categorical Variables:
                  </FormLabel>
                  <Select
                    value={handleCategoricalVariable}
                    onChange={(e) => setCategoricalVariable(e.target.value)}
                  >
                    <option value={"None"}>No operation</option>
                    <option value={"remove"}>
                      Remove Categorical Variables
                    </option>
                    <option value={"label"}>Apply Label Encoding</option>
                    <option value={"one_hot"}>Apply One-Hot Encoding</option>
                  </Select>
                </HStack>
              </FormControl>
            </Box>
          )}

          {file && selectedTask && (
            <Box border="1px dashed blue" p={3} mb={3} borderRadius={15}>
              <FormControl>
                <HStack>
                  <FormLabel m={2} w={{ sm: "130px" }}>
                    Enable Outlier Detection:
                  </FormLabel>
                  <Select
                    value={enableOutlierDetection}
                    onChange={(e) => setEnableOutlierDetection(e.target.value)}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </Select>
                </HStack>
              </FormControl>
            </Box>
          )}

          {enableOutlierDetection === "Yes" && (
            <Box border="1px dashed blue" p={3} mb={3} borderRadius={15}>
              <FormControl>
                <HStack>
                  <FormLabel m={2} w={{ sm: "130px" }}>
                    Outlier Detection Method:
                  </FormLabel>
                  <Select
                    value={outlierDetectionMethod}
                    onChange={(e) => setOutlierDetectionMethod(e.target.value)}
                  >
                    <option value="None">None</option>
                    <option value="lof">Local Outlier Factor (LOF)</option>
                    <option value="isf">Isolation Forest (IF)</option>
                  </Select>
                </HStack>
              </FormControl>
            </Box>
          )}

          {file && selectedTask && (
            <Box border="1px dashed blue" p={3} mb={3} borderRadius={15}>
              <FormControl>
                <HStack>
                  <FormLabel m={2} w={{ sm: "130px" }}>
                    Enable Dimensionality Reduction:
                  </FormLabel>
                  <Select
                    value={enableDimensionalityReduction}
                    onChange={(e) =>
                      setEnableDimensionalityReduction(e.target.value)
                    }
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </Select>
                </HStack>
              </FormControl>
            </Box>
          )}

          {enableDimensionalityReduction === "Yes" && (
            <Box border="1px dashed blue" p={3} mb={3} borderRadius={15}>
              <FormControl>
                <HStack>
                  <FormLabel m={2} w={{ sm: "130px" }}>
                    Dimensionality Reduction Method:
                  </FormLabel>
                  <Select
                    value={dimensionalityReductionMethod}
                    onChange={(e) =>
                      setDimensionalityReductionMethod(e.target.value)
                    }
                  >
                    <option value="None">None</option>
                    <option value="pca">
                      Principal Component Analysis (PCA)
                    </option>
                    <option value="rfe">
                      Recursive Feature Elimination (RFE)
                    </option>
                  </Select>
                </HStack>
              </FormControl>
            </Box>
          )}

          {enableDimensionalityReduction === "Yes" && (
            <FormControl mb={4}>
              <HStack border="1px dashed blue" p={3} mb={3} borderRadius={15}>
                <FormLabel m={2} w={{ sm: "130px" }}>
                  N of Columns Required:
                </FormLabel>
                <Input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                />
              </HStack>
            </FormControl>
          )}

          {selectedTask === "regression" && (
            <FormControl>
              <HStack border="1px dashed blue" p={3} mb={3} borderRadius={15}>
                <FormLabel m={2} w={{ sm: "130px" }}>
                  Models:
                </FormLabel>
                <ModelSelectionR
                  selectedModels={selectedModels}
                  setSelectedModels={setSelectedModels}
                />
              </HStack>
            </FormControl>
          )}

          {selectedTask === "classification" && (
            <FormControl>
              <HStack border="1px dashed blue" p={3} mb={3} borderRadius={15}>
                <FormLabel m={2} w={{ sm: "130px" }}>
                  Models:
                </FormLabel>
                <ModelSelectionC
                  selectedModels={selectedModels}
                  setSelectedModels={setSelectedModels}
                />
              </HStack>
            </FormControl>
          )}
          <Flex justify="center" align="center">
            <Button type="submit" colorScheme="blue">
              Submit
            </Button>
          </Flex>
        </form>
      </Stack>
      {response && <Results output={response.result} />}
    </ChakraProvider>
  );
};

export default AppTest;
