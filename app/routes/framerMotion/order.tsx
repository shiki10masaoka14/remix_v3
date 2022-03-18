import {
  Box,
  BoxProps,
  Center,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useContext, useEffect, VFC } from "react";
import {
  ActionFunction,
  createCookie,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import {
  DeletePizzaDocument,
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

export const action: ActionFunction = async ({
  request,
}) => {
  const userPrefs = createCookie("user-prefs", {
    maxAge: 0,
  });

  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};

  await faunaResolver(
    DeletePizzaDocument.loc?.source.body,
    {
      id: cookie.pizzaId,
    },
  );

  return redirect("/framerMotion", {
    headers: {
      "Set-Cookie": await userPrefs.serialize(cookie),
    },
  });
};
// ここまで
//
//
//
// ここから

const MotionBox = motion<BoxProps>(Box);

const childVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
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
  const orderPizza = useLoaderData() as FindPizzaByIdQuery;
  const { setShowModal } = useContext(ModalContext);
  console.log(orderPizza?.findPizzaByID?._id);

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
