import { buttonVariants } from ".";
import { containerVariants } from "./base";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Center,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { motion, Transition } from "framer-motion";
import { VFC } from "react";
import { ActionFunction, Form, redirect } from "remix";
import { PartialUpdatePizzaDocument } from "~/graphql/fauna/generated";
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
  const formData = await request.formData();
  const value = Object.fromEntries(formData);
  const arrayVal = Object.keys(value).map(
    (key) => value[key],
  );

  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};

  await faunaResolver(
    PartialUpdatePizzaDocument.loc?.source.body,
    {
      id: cookie.pizzaId,
      data: {
        toppings: arrayVal,
      },
    },
  );

  return redirect("/framerMotion/order");
};

// ここまで
//
//
//
// ここから

const MotionBox = motion<BoxProps | Transition>(Box);
const MotionButton = motion<ButtonProps>(Button);

const Toppings: VFC = () => {
  const toppings = [
    "mushrooms",
    "peppers",
    "onions",
    "olives",
    "extra cheese",
    "tomatoes",
  ];
  const { isPending } = usePageTransition(
    "/framerMotion/order",
  );

  // ここまで
  //
  //
  //
  // ここから

  return (
    <Center minH={"100vh"}>
      {isPending && (
        <MotionBox
          variants={containerVariants}
          initial={"hidden"}
          animate={"visible"}
          exit={"exit"}
        >
          <Form method="post">
            <VStack align={"start"} mb={6}>
              {toppings.map((topping) => (
                <MotionBox
                  key={topping}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                  whileHover={{
                    scale: 1.3,
                    originX: 0,
                  }}
                >
                  <Checkbox
                    name={topping}
                    value={topping}
                    _hover={{ color: "red.300" }}
                  >
                    {topping}
                  </Checkbox>
                </MotionBox>
              ))}
            </VStack>
            <MotionButton
              variant={"outline"}
              variants={buttonVariants}
              type="submit"
              whileHover={"hover"}
            >
              send
            </MotionButton>
          </Form>
        </MotionBox>
      )}
    </Center>
  );
};
export default Toppings;
