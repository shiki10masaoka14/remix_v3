import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { motion, Transition } from "framer-motion";
import { ReactNode, VFC } from "react";
import { Link } from "remix";

type PROPS = {
  children: ReactNode;
};

const MotionBox = motion<BoxProps | Transition>(Box);

const Header: VFC<PROPS> = ({ children }) => {
  return (
    <Box
      minH={"100vh"}
      bg={"rgb(139,218,236)"}
      bgGradient={
        "radial-gradient(circle, rgba(139,218,236,1) 0%, rgba(38,125,144,1) 100%)"
      }
    >
      <Flex
        h={"150px"}
        align={"center"}
        px={6}
        color={"white"}
        position={"absolute"}
      >
        <Icon
          className="pizza-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -10 100 100"
          boxSize={"100px"}
          overflow={"visible"}
          stroke={"white"}
          strokeWidth={4}
          strokeLinejoin={"round"}
          strokeLinecap={"round"}
        >
          <path
            fill="none"
            d="M40 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 40 C0 40 0 0 40 0Z"
          />
          <path
            fill="none"
            d="M50 30 L50 -10 C50 -10 90 -10 90 30 Z"
          />
        </Icon>
        <MotionBox
          initial={{ y: -250 }}
          animate={{ y: -10 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 120,
          }}
        >
          <Link to={"/framerMotion"}>
            <Heading>Pizza Joint</Heading>
          </Link>
        </MotionBox>
      </Flex>
      <>{children}</>
    </Box>
  );
};
export default Header;
