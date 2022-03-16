import { buttonVariants } from ".";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Center,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { VFC } from "react";
import {
  ActionFunction,
  createCookie,
  Form,
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
import { usePageTransition } from "~/hooks/usePageTransition";
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

  const sleep = (ms: number) =>
    new Promise((res) => setTimeout(res, ms));

  await sleep(100);

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
const MotionButton = motion<ButtonProps>(Button);

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.5,
      type: "spring",
      when: "beforeChildren",
      staggerChildren: 0.4,
    },
  },
  exit: {
    opacity: 0,
  },
};
const childVariants = {
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

// ここまで
//
//
//
// ここから

const Order: VFC = () => {
  const { findPizzaByID: orderPizza } =
    useLoaderData() as FindPizzaByIdQuery;
  const { isPending } = usePageTransition("/framerMotion");

  return (
    <Center minH={"100vh"}>
      <AnimatePresence>
        {isPending && (
          <MotionBox
            variants={containerVariants}
            initial={"hidden"}
            animate={"visible"}
            exit={"exit"}
          >
            <Heading
              size={"md"}
              mb={6}
              textAlign={"center"}
            >
              Thank you for your order
            </Heading>
            <MotionBox variants={childVariants}>
              <Text mb={4} textAlign={"center"}>
                You ordered a {orderPizza?.base} pizza whit:
              </Text>
            </MotionBox>
            <MotionBox variants={childVariants}>
              <VStack spacing={-1} mb={8}>
                {orderPizza?.toppings?.map((topping) => (
                  <Text
                    key={topping}
                    color={"blackAlpha.600"}
                  >
                    {topping}
                  </Text>
                ))}
              </VStack>
            </MotionBox>
            <Form method="post">
              <Center>
                <MotionButton
                  type="submit"
                  variant={"ghost"}
                  variants={buttonVariants}
                  whileHover={"hover"}
                >
                  back
                </MotionButton>
              </Center>
            </Form>
          </MotionBox>
        )}
      </AnimatePresence>
    </Center>
  );
};
export default Order;
