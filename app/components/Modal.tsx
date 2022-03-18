import { buttonVariants } from "../routes/framerMotion";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Center,
  Container,
  ContainerProps,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, memo, SetStateAction, VFC } from "react";
import { Form } from "remix";

// ここまで「import」
//
//
//
// ここから

type PROPS = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

// ここまで
//
//
//
// ここから

const MotionBox = motion<BoxProps>(Box);
const MotionContainer = motion<ContainerProps>(Container);
const MotionButton = motion<ButtonProps>(Button);

const backdrop = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren" },
  },
  exit: { opacity: 0 },
};
const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

// ここまで
//
//
//
// ここから

export const Modal: VFC<PROPS> = memo(
  ({ showModal, setShowModal }) => {
    const onClickModal = () => {
      setShowModal(false);
    };

    return (
      <>
        <AnimatePresence exitBeforeEnter>
          {showModal && (
            <MotionBox
              variants={backdrop}
              initial={"hidden"}
              animate={"visible"}
              exit={"exit"}
              position={"fixed"}
              top={0}
              left={0}
              w={"100%"}
              h={"100%"}
              bg={"blackAlpha.700"}
              zIndex={1}
            >
              <Center minH={"100vh"}>
                <MotionContainer
                  variants={modal}
                  bg={"white"}
                  borderRadius={10}
                  centerContent
                  py={6}
                >
                  <Text mb={6}>
                    Want to make another pizza?
                  </Text>
                  <Form
                    method="post"
                    action="/framerMotion/order"
                  >
                    <MotionButton
                      type="submit"
                      onClick={onClickModal}
                      variants={buttonVariants}
                      whileHover={"hover"}
                      variant={"ghost"}
                      fontSize={24}
                    >
                      back
                    </MotionButton>
                  </Form>
                </MotionContainer>
              </Center>
            </MotionBox>
          )}
        </AnimatePresence>
      </>
    );
  },
);
Modal.displayName = "Modal";
