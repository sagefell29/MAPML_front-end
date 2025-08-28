import React from "react";
import { Box, Table, Tbody, Tr, Td, Th, Text, VStack, HStack } from "@chakra-ui/react";

const ConfusionMatrix = ({ confusion_matrix, classes, y_true, y_pred }) => {
  // If confusion_matrix data is provided from backend, use it
  // Otherwise, calculate it from y_true and y_pred
  let cmData = confusion_matrix;
  let classLabels = classes;
  
  if (!cmData && y_true && y_pred) {
    // Fallback calculation if confusion_matrix is not provided
    const confusionMatrix = {};
    
    for (let i = 0; i < y_true.length; i++) {
      const trueValue = y_true[i];
      const predValue = y_pred[i];

      if (!(trueValue in confusionMatrix)) {
        confusionMatrix[trueValue] = {};
      }

      if (!(predValue in confusionMatrix[trueValue])) {
        confusionMatrix[trueValue][predValue] = 0;
      }

      confusionMatrix[trueValue][predValue]++;
    }
    
    // Convert to 2D array format
    const uniqueClasses = [...new Set([...y_true, ...y_pred])].sort();
    cmData = uniqueClasses.map(trueClass => 
      uniqueClasses.map(predClass => 
        confusionMatrix[trueClass]?.[predClass] || 0
      )
    );
    classLabels = uniqueClasses;
  }

  if (!cmData || !classLabels) {
    return <Text>No confusion matrix data available</Text>;
  }

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" fontWeight="bold" textAlign="center" color="blue.600">
        Confusion Matrix
      </Text>
      <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="md">
        <Table variant="simple" size="sm">
          <Tbody>
            {/* Header row with predicted class labels */}
            <Tr>
              <Th bg="blue.500" color="white" textAlign="center" border="1px solid" borderColor="blue.600">
                Actual \ Predicted
              </Th>
              {classLabels.map((label, index) => (
                <Th key={index} bg="blue.500" color="white" textAlign="center" minW="60px" border="1px solid" borderColor="blue.600">
                  {label}
                </Th>
              ))}
            </Tr>
            
            {/* Data rows */}
            {cmData.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                <Th bg="blue.100" color="blue.800" textAlign="center" border="1px solid" borderColor="blue.200" fontWeight="bold">
                  {classLabels[rowIndex]}
                </Th>
                {row.map((cell, colIndex) => (
                  <Td 
                    key={colIndex} 
                    textAlign="center" 
                    fontWeight="bold"
                    bg={rowIndex === colIndex ? "green.400" : "gray.100"}
                    color={rowIndex === colIndex ? "white" : "gray.800"}
                    border="1px solid"
                    borderColor={rowIndex === colIndex ? "green.500" : "gray.300"}
                  >
                    {cell}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      
      {/* Legend */}
      <Box p={3} bg="blue.50" borderRadius="md" border="1px solid" borderColor="blue.200">
        <Text fontSize="sm" fontWeight="bold" color="blue.700">Legend:</Text>
        <HStack spacing={6} mt={2}>
          <HStack spacing={2}>
            <Box w="5" h="5" bg="green.400" border="2px solid" borderColor="green.500" borderRadius="sm"></Box>
            <Text fontSize="sm" fontWeight="medium" color="blue.700">Correct Predictions</Text>
          </HStack>
          <HStack spacing={2}>
            <Box w="5" h="5" bg="gray.100" border="2px solid" borderColor="gray.300" borderRadius="sm"></Box>
            <Text fontSize="sm" fontWeight="medium" color="blue.700">Incorrect Predictions</Text>
          </HStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default ConfusionMatrix;
  