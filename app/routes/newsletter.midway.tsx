import {
  Box,
  BoxProps,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import {
  AnimatePresence,
  motion,
  Transition,
} from "framer-motion";
import { useEffect, useRef, useState, VFC } from "react";
import { ActionFunction, Form, useActionData } from "remix";

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
  const { email } = value;

  const res = await fetch(
    `${CONVERTKIT_ENDPOINT}/forms/${CONVERTKIT_FORM_ID}/subscribe`,
    {
      method: "post",
      body: JSON.stringify({
        email,
        api_key: CONVERTKIT_API,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    },
  );

  return res.json();
};

// ここまで
//
//
//
// ここから

const MotionBox = motion<BoxProps | Transition>(Box);

const Newsletter: VFC = () => {
  const actionData = useActionData();
  const state: "idle" | "success" | "error" =
    actionData?.subscription
      ? "success"
      : actionData?.error
      ? "error"
      : "idle";

  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(Number(ref.current?.clientHeight));
  }, [ref]);

  return (
    <Box bg={"tomato"} minH={"100vh"}>
      <Center minH={"100vh"}>
        <Container
          bg={"white"}
          pt={4}
          pb={6}
          px={6}
          borderRadius={6}
          ref={ref}
          h={height}
          position={"relative"}
          w={"100%"}
        >
          <AnimatePresence initial={false}>
            {state !== "success" && (
              <MotionBox
                key={"form"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                position={"absolute"}
              >
                <Form method="post">
                  <Heading>Subscribe!</Heading>
                  <Text mb={4}>
                    Don't miss any of the action
                  </Text>
                  <FormControl as={"fieldset"} w={"100%"}>
                    <HStack>
                      <Input
                        type={"email"}
                        placeholder={"you@example.com"}
                        name={"email"}
                      />
                      <Button type={"submit"}>
                        Subscribe
                      </Button>
                    </HStack>
                  </FormControl>
                </Form>
              </MotionBox>
            )}
            {state === "success" && (
              <MotionBox
                key={"text"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                position={"absolute"}
              >
                <Heading>You're subscribed</Heading>
                <Text>
                  Please check your email to confirm your
                  subscription.
                </Text>
              </MotionBox>
            )}
          </AnimatePresence>
        </Container>
      </Center>
    </Box>
  );
};
export default Newsletter;
