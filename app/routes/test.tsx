import { Box, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState, VFC } from "react";

const Test: VFC = () => {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(Number(ref.current?.clientHeight));
  }, [ref]);

  return (
    <>
      <Box minH={300} bg={"coral"} ref={ref} p={10}>
        <Text>{height}px</Text>
      </Box>
    </>
  );
};
export default Test;
