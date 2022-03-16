import { buttonVariants } from "../framerMotion";
import {
  Button,
  ButtonProps,
  Center,
  Container,
  ContainerProps,
  Heading,
  VStack,
} from "@chakra-ui/react";
import {
  AnimatePresence,
  motion,
  Transition,
} from "framer-motion";
import { VFC } from "react";
import { ActionFunction, Form, redirect } from "remix";
import { CreatePizzaDocument } from "~/graphql/fauna/generated";
import { faunaResolver } from "~/graphql/fauna/resolver";
import { usePageTransition } from "~/hooks/usePageTransition";
import { userPrefs } from "~/utils/cookies";

// ここまで
//
//
//
// ここから

export const action: ActionFunction = async ({
  request,
}) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};

  if (!cookie.pizzaId) {
    const { data } = await faunaResolver(
      CreatePizzaDocument.loc?.source.body,
      { data: { base: null } },
    );

    cookie.pizzaId = data.createPizza._id;

    console.log(cookie.pizzaId);
  }

  return redirect("/framerMotion/base", {
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

const MotionButton = motion<ButtonProps>(Button);
const MotionContainer = motion<ContainerProps | Transition>(
  Container,
);
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 1.5, duration: 1.5 },
  },
  exit: {
    x: "-100vw",
    transition: { duration: 1 },
  },
};

// ここまで
//
//
//
// ここから

const Index: VFC = () => {
  const { isPending } = usePageTransition(
    "/framerMotion/base",
  );

  return (
    <Center minH={"100vh"}>
      <AnimatePresence>
        {isPending && (
          <MotionContainer
            variants={containerVariants}
            initial={"hidden"}
            animate={"visible"}
            exit={"exit"}
          >
            <VStack spacing={6}>
              <Heading>Welcome to Pizza Joint</Heading>
              <Form method="post">
                <MotionButton
                  type="submit"
                  variants={buttonVariants}
                  whileHover={"hover"}
                  variant={"outline"}
                >
                  Create Your Pizza
                </MotionButton>
              </Form>
            </VStack>
          </MotionContainer>
        )}
      </AnimatePresence>
    </Center>
  );
};
export default Index;
