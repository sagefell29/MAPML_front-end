import React from "react";
import { Checkbox, Button, Grid, Stack } from "@chakra-ui/react";

const ModelSelectionC = ({ selectedModels, setSelectedModels }) => {
  const handleModelToggle = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedModels((prevModels) => [...prevModels, value]);
    } else {
      setSelectedModels((prevModels) =>
        prevModels.filter((model) => model !== value)
      );
    }
  };

  const handleSelectAll = () => {
    const allModels = [
      "Decision_Tree",
      "Random_Forest",
      "Support_Vector",
      "K_Neighbors",
      "Naive_Bayes",
    ];
    setSelectedModels(allModels);
  };

  const handleDeselectAll = () => {
    setSelectedModels([]);
  };

  return (
    <>
      <Grid spacing={2} width="full" templateColumns="repeat(1, 1fr)">
        <Checkbox
          value="Decision_Tree"
          onChange={handleModelToggle}
          isChecked={selectedModels.includes("Decision_Tree")}
        >
          Decision Tree Classifier
        </Checkbox>
        <Checkbox
          value="Random_Forest"
          onChange={handleModelToggle}
          isChecked={selectedModels.includes("Random_Forest")}
        >
          Random Forest Classifier
        </Checkbox>
        <Checkbox
          value="Support_Vector"
          onChange={handleModelToggle}
          isChecked={selectedModels.includes("Support_Vector")}
        >
          Support Vector Classifier
        </Checkbox>
        <Checkbox
          value="K_Neighbors"
          onChange={handleModelToggle}
          isChecked={selectedModels.includes("K_Neighbors")}
        >
          K-Neighbors Classifier
        </Checkbox>
        <Checkbox
          value="Naive_Bayes"
          onChange={handleModelToggle}
          isChecked={selectedModels.includes("Naive_Bayes")}
        >
          Naive Bayes Classifier
        </Checkbox>
      </Grid>
      <Stack spacing={5}>
        <Button
          onClick={handleSelectAll}
          colorScheme="blue"
          width="120px"
          mr={5}
        >
          Select All
        </Button>
        <Button onClick={handleDeselectAll} colorScheme="red" width="120px">
          Deselect All
        </Button>
      </Stack>
    </>
  );
};

export default ModelSelectionC;
