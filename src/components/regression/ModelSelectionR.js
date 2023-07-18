import React from "react";
import { Checkbox, Button, Grid, Stack } from "@chakra-ui/react";

const ModelSelectionR = ({ selectedModels, setSelectedModels }) => {
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
      "Linear_Regression",
      "SVR",
      "Random_Forest_Regressor",
      "Adaptive_Boosting_Regressor",
      "Extra_Trees_Regressor",
      "Huber_Regressor",
      "Gradient_Boosting_Regressor",
      // "Bagging_Regressor",
      // "XGB_Regressor"
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
        value="Linear_Regression"
        onChange={handleModelToggle}
        isChecked={selectedModels.includes("Linear_Regression")}
      >
        Linear Regression
      </Checkbox>
      <Checkbox
        value="SVR"
        onChange={handleModelToggle}
        isChecked={selectedModels.includes("SVR")}
      >
        SVM (Support Vector Machine)
      </Checkbox>
      <Checkbox
        value="Random_Forest_Regressor"
        onChange={handleModelToggle}
        isChecked={selectedModels.includes("Random_Forest_Regressor")}
      >
        Random Forest
      </Checkbox>
      <Checkbox
        value="Adaptive_Boosting_Regressor"
        onChange={handleModelToggle}
        isChecked={selectedModels.includes("Adaptive_Boosting_Regressor")}
      >
        Adaptive Boosting
      </Checkbox>
      <Checkbox
        value="Extra_Trees_Regressor"
        onChange={handleModelToggle}
        isChecked={selectedModels.includes("Extra_Trees_Regressor")}
      >
        Extra Trees Regressor
      </Checkbox>
      <Checkbox
        value="Huber_Regressor"
        onChange={handleModelToggle}
        isChecked={selectedModels.includes("Huber_Regressor")}
      >
        Huber Regressor
      </Checkbox>
      <Checkbox
        value="Gradient_Boosting_Regressor"
        onChange={handleModelToggle}
        isChecked={selectedModels.includes("Gradient_Boosting_Regressor")}
      >
        Gradient Boosting Regressor
      </Checkbox>
      {/* <Checkbox
        value="Bagging_Regressor"
        onChange={handleModelToggle}
        isChecked={selectedModels.includes("Bagging_Regressor")}
      >
        Bagging Regressor
      </Checkbox>
      <Checkbox
        value="XGB_Regressor"
        onChange={handleModelToggle}
        isChecked={selectedModels.includes("XGB_Regressor")}
      >
        XGB Regressor
      </Checkbox> */}
    </Grid>
    <Stack spacing={5}>
      <Button onClick={handleSelectAll} colorScheme="blue" width="120px" mr={5}>
        Select All
      </Button>
      <Button onClick={handleDeselectAll} colorScheme="red" width="120px">
        Deselect All
      </Button>
      </Stack>
    </>
  );
};

export default ModelSelectionR;
