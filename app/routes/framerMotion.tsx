import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Icon,
} from "@chakra-ui/react";
import {
  AnimatePresence,
  motion,
  Transition,
} from "framer-motion";
import { VFC } from "react";
import { Link, Outlet, useTransition } from "remix";

// ここまで
//
//
//
// ここから

const MotionBox = motion<BoxProps | Transition>(Box);

export const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px gray",
    boxShadow: "0px 0px 8px gray",
    transition: {
      duration: 0.5,
      repeat: Infinity,
    },
  },
};
export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 1.5 },
  },
};

// ここまで
//
//
//
// ここから

const FramerMotion: VFC = () => {
  const transition = useTransition();
  const isPending =
    transition.state === "loading" ||
    transition.state === "idle";

  console.log(isPending);

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
            stiffness: 12,
          }}
        >
          <Link to={"/framerMotion"}>
            <Heading>Pizza Joint</Heading>
          </Link>
        </MotionBox>
      </Flex>
      <AnimatePresence>
        {isPending && (
          <MotionBox
            animate={{
              x: 0,
              transition: { ease: "easeInOut" },
            }}
            exit={{
              x: "-100vh",
              transition: { ease: "easeInOut" },
            }}
          >
            <Outlet />
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
};
export default FramerMotion;
