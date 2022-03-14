import Header from "./Header";
import {
  Button,
  ButtonProps,
  Center,
  Container,
  ContainerProps,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { motion, Transition } from "framer-motion";
import { VFC } from "react";
import { ActionFunction, Form, redirect } from "remix";
import { CreatePizzaDocument } from "~/graphql/fauna/generated";
import { faunaResolver } from "~/graphql/fauna/resolver";
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

const FramerMotion: VFC = () => {
  return (
    <Header>
      <Center minH={"100vh"}>
        <MotionContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          <VStack spacing={6}>
            <Heading>Welcome to Pizza Joint</Heading>
            <Form method="post">
              <MotionButton
                type="submit"
                whileHover={{
                  scale: 1.1,
                  textShadow: "0px 0px 8px gray",
                  boxShadow: "0px 0px 8px gray",
                }}
                variant={"outline"}
              >
                Create Your Pizza
              </MotionButton>
            </Form>
          </VStack>
        </MotionContainer>
      </Center>
    </Header>
  );
};
export default FramerMotion;
