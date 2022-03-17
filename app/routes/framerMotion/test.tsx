import {
  Box,
  BoxProps,
  Center,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { VFC } from "react";

// const MotionBox = motion<BoxProps>(Box);

const Test: VFC = () => {
  return (
    <Center minH={"100vh"}>
      <Text fontSize={40}>test</Text>
    </Center>
  );
};
export default Test;
