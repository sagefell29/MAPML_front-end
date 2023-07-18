import React, { useEffect, useState } from "react";
import { Select, Stack } from "@chakra-ui/react";
import { useCSVReader } from "react-papaparse";
import Papa from "papaparse";

const AttributeSelection = ({ file, outputAttribute, setOutputAttribute }) => {
  const [attributes, setAttributes] = useState([]);
  const { CSVReader } = useCSVReader();

  useEffect(() => {
    // Parse CSV file and extract attributes
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        const parsedData = Papa.parse(csvData, { header: true });
        if (parsedData.data.length > 0) {
          const fileAttributes = Object.keys(parsedData.data[0]);
          setAttributes(fileAttributes);
          if (!outputAttribute && fileAttributes.length > 0) {
            setOutputAttribute(fileAttributes[0]); // Set first attribute as default output attribute
          }
        }
      };
      reader.readAsText(file);
    }
  }, [file,outputAttribute, setOutputAttribute]);

  const handleAttributeChange = (attribute) => {
    setOutputAttribute(attribute);
  };

  return (
    <Stack direction="column">
      <CSVReader onDrop={() => {}} noDrag noClick onFileLoad={() => {}}>
        {({ file }) => (
          <div>
            <p>
              CSV file is successfully loaded.
              {/* {file && file.name} */}
            </p>
          </div>
        )}
      </CSVReader>
      <Stack direction="column">
        {/* <p>Select output attribute:</p> */}
        <Select
          value={outputAttribute}
          onChange={(e) => handleAttributeChange(e.target.value)}
        >
          {attributes.map((attribute) => (
            <option key={attribute} value={attribute}>
              {attribute}
            </option>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
};

export default AttributeSelection;
