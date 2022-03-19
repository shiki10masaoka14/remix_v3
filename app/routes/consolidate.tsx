import { Box, BoxProps, HStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, VFC } from "react";
import {
  Link,
  useLocation,
  useOutlet,
  useTransition,
} from "remix";
import { Modal } from "~/components/Modal";
import { ModalContext } from "~/providers/ModalProvider";

const MotionBox = motion<BoxProps>(Box);

const variants = {
  hidden: {
    x: -100,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: 100,
  },
};
const variants2 = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const Consolidate: VFC = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const { showModal, setShowModal } =
    useContext(ModalContext);
  const transition = useTransition();
  console.log(transition.location?.pathname);

  return (
    <>
      <HStack>
        <Link to={"/consolidate"}>ホーム</Link>
        <Link to={"/consolidate/display2"}>
          ディスプレイ2
        </Link>
      </HStack>
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => setShowModal(false)}
      >
        <MotionBox
          key={location.key}
          variants={
            transition.location?.pathname ===
            "/consolidate/display2"
              ? variants
              : variants2
          }
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
      />
    </>
  );
};
export default Consolidate;
