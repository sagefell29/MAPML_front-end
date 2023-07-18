import React from "react";
import { Box, Table, Tbody, Tr, Td, Th } from "@chakra-ui/react";

const ConfusionMatrix = ({ y_true, y_pred }) => {
    // Calculate the values for the confusion matrix
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
  
    return (
      <Box>
        <Table variant="striped" colorScheme="gray">
          <Tbody>
            {/* Render the confusion matrix */}
            {Object.entries(confusionMatrix).map(([trueValue, predictions]) => (
              <Tr key={trueValue}>
                <Th>{trueValue}</Th>
                {Object.entries(predictions).map(([predValue, count]) => (
                  <Td key={predValue}>{count}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  };

  export default ConfusionMatrix;
  