import { Box, BoxProps, Button } from "@chakra-ui/react";
import { motion, useCycle } from "framer-motion";
import { memo, VFC } from "react";

// ここまで「import」
//
//
//
// ここから

const MotionBox = motion<BoxProps>(Box);

const loaderVariants = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5,
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: "easeOut",
      },
    },
  },
  animationTwo: {
    y: [0, -40],
    x: 0,
    transition: {
      repeat: Infinity,
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

// ここまで
//
//
//
// ここから

export const Loader: VFC = memo(() => {
  const [animation, cycleAnimation] = useCycle(
    "animationOne",
    "animationTwo",
  );

  return (
    <>
      <MotionBox
        variants={loaderVariants}
        animate={animation}
        w={"10px"}
        h={"10px"}
        my={"40px"}
        mx={"auto"}
        borderRadius={"50%"}
        bg={"white"}
      />
      <Button onClick={() => cycleAnimation()}>
        Cycle Loader
      </Button>
    </>
  );
});
Loader.displayName = "Loader";
