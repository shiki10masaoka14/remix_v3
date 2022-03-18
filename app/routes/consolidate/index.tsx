import { Box, Button, Heading } from "@chakra-ui/react";
import { useContext, VFC } from "react";
import { ModalContext } from "~/providers/ModalProvider";

const Home: VFC = () => {
  const { setShowModal } = useContext(ModalContext);

  return (
    <>
      <Box>
        <Heading> ホーム</Heading>
        <Button onClick={() => setShowModal(true)}>
          モーダル
        </Button>
      </Box>
    </>
  );
};
export default Home;
