import { buttonVariants } from ".";
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

  // ここまで
  //
  //
  //
  // ここから

  return (
    <Center>
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
    </Center>
  );
};
export default Toppings;
