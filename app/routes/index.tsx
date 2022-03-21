import { VStack } from "@chakra-ui/react";
import { VFC } from "react";
import { Link } from "remix";

const Index: VFC = () => {
  return (
    <VStack mt={6}>
      <Link to={"/practice"}>practice</Link>
      <Link to={"/test2"}>test</Link>
      <Link to={"/newsletter"}>newsletter</Link>
      <Link to={"/framerMotion"}>framer motion</Link>
      <Link to={"/consolidate"}>一元管理</Link>
      <Link to={"/slider"}>スライダー</Link>
    </VStack>
  );
};
export default Index;
