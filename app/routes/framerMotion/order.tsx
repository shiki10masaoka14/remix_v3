import {
  Box,
  BoxProps,
  Center,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  useContext,
  useEffect,
  useState,
  VFC,
} from "react";
import { LoaderFunction, useLoaderData } from "remix";
import {
  FindPizzaByIdDocument,
  FindPizzaByIdQuery,
} from "~/graphql/fauna/generated";
import { faunaResolver } from "~/graphql/fauna/resolver";
import { ModalContext } from "~/providers/ModalProvider";
import { userPrefs } from "~/utils/cookies";

// ここまで
//
//
//
// ここから

export const loader: LoaderFunction = async ({
  request,
}) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};

  if (!cookie) {
    return null;
  }

  const { data } = await faunaResolver(
    FindPizzaByIdDocument.loc?.source.body,
    { id: cookie.pizzaId },
  );
  const { findPizzaByID } = data;

  return { findPizzaByID };
};

// ここまで
//
//
//
// ここから

const MotionBox = motion<BoxProps>(Box);

const childVariants = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: 0,
    transition: {
      delay: 1,
    },
  },
};
const childVariants2 = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 2,
    },
  },
};

// ここまで
//
//
//
// ここから

const Order: VFC = () => {
  const orderPizzaData = useLoaderData();

  // Faunaのデータを削除後もFade outアニメーションを付けるためにDOMにはデータを残したい
  const [orderPizza, setOrderPizza] =
    useState<FindPizzaByIdQuery>();
  useEffect(() => {
    orderPizzaData && setOrderPizza(orderPizzaData);
  }, [orderPizzaData]);

  // 5秒後にモーダル表示
  const { setShowModal } = useContext(ModalContext);
  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 5000);
  }, [setShowModal]);

  return (
    <Center minH={"100vh"}>
      <VStack>
        <Heading size={"md"} mb={6} textAlign={"center"}>
          Thank you for your order
        </Heading>
        <MotionBox variants={childVariants}>
          <Text mb={4} textAlign={"center"}>
            You ordered a {orderPizza?.findPizzaByID?.base}{" "}
            pizza whit:
          </Text>
        </MotionBox>
        <MotionBox variants={childVariants2}>
          <VStack spacing={-1} mb={8}>
            {orderPizza?.findPizzaByID?.toppings?.map(
              (topping) => (
                <Text
                  key={topping}
                  color={"blackAlpha.600"}
                >
                  {topping}
                </Text>
              ),
            )}
          </VStack>
        </MotionBox>
      </VStack>
    </Center>
  );
};
export default Order;
