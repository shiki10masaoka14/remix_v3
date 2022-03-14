import Header from "./Header";
import {
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Text,
} from "@chakra-ui/react";
import {
  useState,
  VFC,
  MouseEvent,
  ChangeEvent,
} from "react";
import { ActionFunction, Form } from "remix";
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
  const { mushrooms, peppers } = value;

  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};

  await faunaResolver(
    PartialUpdatePizzaDocument.loc?.source.body,
    {
      id: cookie.pizzaId,
      data: {
        toppings: [mushrooms, peppers],
      },
    },
  );

  return null;
};

// ここまで
//
//
//
// ここから

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
    <>
      <Header>
        <Center minH={"100vh"}>
          <Form method="post">
            <CheckboxGroup>
              <Checkbox
                value={"mushrooms"}
                name="mushrooms"
              >
                mushrooms
              </Checkbox>
              <Checkbox value={"peppers"} name="peppers">
                peppers
              </Checkbox>
            </CheckboxGroup>
            <Button type="submit">send</Button>
          </Form>
        </Center>
      </Header>
    </>
  );
};
export default Toppings;
