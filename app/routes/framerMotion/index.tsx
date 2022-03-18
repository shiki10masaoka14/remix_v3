import { buttonVariants } from "../framerMotion";
import {
  Button,
  ButtonProps,
  Center,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
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
      { data: {} },
    );

    cookie.pizzaId = data.createPizza._id;
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

// ここまで
//
//
//
// ここから

const Index: VFC = () => {
  return (
    <Center minH={"100vh"}>
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
    </Center>
  );
};
export default Index;
