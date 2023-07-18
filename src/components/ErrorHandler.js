import { Box, HStack, Heading } from "@chakra-ui/react";

const ErrorHandler = (props) => {
  return (
    <Box
      align="center"
      w="98%"
      m={2}
      p={3}
      border="2px solid black"
      borderRadius={15}
    >
      <Heading>Error</Heading>
      <HStack>
        <b>Error Type:</b>
        <span>{props.message}</span>
      </HStack>
      {props.tip && (
        <HStack>
          <b>Tip:</b>
          <span>{props.tip}</span>
        </HStack>
      )}
    </Box>
  );
};

export default ErrorHandler;
