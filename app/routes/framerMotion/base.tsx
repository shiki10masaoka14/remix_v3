import Header from "./Header";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Center,
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { motion, Transition } from "framer-motion";
import { useState, VFC } from "react";
import { RiPlayLine } from "react-icons/ri";
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
  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};

  const formData = await request.formData();
  const value = Object.fromEntries(formData);
  const { base } = value;

  await faunaResolver(
    PartialUpdatePizzaDocument.loc?.source.body,
    {
      id: cookie.pizzaId,
      data: {
        base,
      },
    },
  );
  return redirect("/framerMotion/toppings");
};

// ここまで
//
//
//
// ここから

const MotionBox = motion<BoxProps | Transition>(Box);
const MotionButton = motion<ButtonProps>(Button);

export const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      delay: 0.5,
    },
  },
};
export const nextVariants = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 120 },
  },
};

// ここまで
//
//
//
// ここから

const Base: VFC = () => {
  const bases = ["Classic", "Thin & Crispy", "Thick Crust"];
  const [baseVal, setBaseVal] = useState<String>();

  return (
    <Header>
      <Center minH={"100vh"}>
        <MotionBox
          variants={containerVariants}
          initial={"hidden"}
          animate={"visible"}
        >
          <Container maxW={"container.sm"}>
            <Heading size={"md"} mb={2}>
              Step 1: Choose Your Base
            </Heading>
            <Divider mb={6} colorScheme={"messenger"} />
            <VStack
              mb={!baseVal ? "70px" : "30px"}
              align={"start"}
              pl={4}
            >
              {bases.map((base) => (
                <HStack key={base}>
                  {baseVal === base && (
                    <Icon as={RiPlayLine} />
                  )}
                  <MotionBox
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                    whileHover={{
                      scale: 1.3,
                      originX: 0,
                    }}
                  >
                    <Button
                      color={
                        baseVal === base
                          ? "black"
                          : "blackAlpha.500"
                      }
                      px={0}
                      _hover={{ color: "red.300" }}
                      fontWeight={"normal"}
                      variant={"ghost"}
                      onClick={() => setBaseVal(base)}
                    >
                      {base}
                    </Button>
                  </MotionBox>
                </HStack>
              ))}
            </VStack>
            {baseVal && (
              <Form method="post">
                <MotionBox variants={nextVariants}>
                  <MotionButton
                    variant={"outline"}
                    whileHover={{
                      scale: 1.1,
                      textShadow: "0px 0px 8px gray",
                      boxShadow: "0px 0px 8px gray",
                    }}
                    type={"submit"}
                    name="base"
                    value={String(baseVal)}
                  >
                    Next
                  </MotionButton>
                </MotionBox>
              </Form>
            )}
          </Container>
        </MotionBox>
      </Center>
    </Header>
  );
};
export default Base;
