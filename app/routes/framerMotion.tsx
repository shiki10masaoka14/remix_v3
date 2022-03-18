import { Modal } from "../components/Modal";
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
import { useContext, VFC } from "react";
import { Link, useLocation, useOutlet } from "remix";
import { ModalContext } from "~/providers/ModalProvider";

// ここまで
//
//
//
// ここから

const MotionBox = motion<BoxProps | Transition>(Box);

const headerVariants = {
  hidden: { y: -250 },
  visible: {
    y: -10,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 120,
    },
  },
};
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.5, delay: 1 },
  },
  exit: {
    x: "-100vw",
    transition: { duration: 1 },
  },
};

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

// ここまで
//
//
//
// ここから

const FramerMotion: VFC = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const { showModal, setShowModal } =
    useContext(ModalContext);

  return (
    <Box
      minH={"100vh"}
      bg={"rgb(139,218,236)"}
      bgGradient={
        "radial-gradient(circle, rgba(139,218,236,1) 0%, rgba(38,125,144,1) 100%)"
      }
      overflowY={"hidden"}
    >
      <MotionBox
        variants={headerVariants}
        initial={"hidden"}
        animate={"visible"}
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
          <Link to={"/framerMotion"}>
            <Heading>Pizza Joint</Heading>
          </Link>
        </Flex>
      </MotionBox>
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => setShowModal(false)}
      >
        <MotionBox
          key={location.key}
          variants={containerVariants}
          initial={"hidden"}
          animate={"visible"}
          exit={"exit"}
        >
          {outlet}
        </MotionBox>
      </AnimatePresence>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
      />{" "}
    </Box>
  );
};
export default FramerMotion;
