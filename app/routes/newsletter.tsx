import {
  Box,
  BoxProps,
  Button,
  Center,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, VFC } from "react";
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import {
  SlideDocument,
  SlideQuery,
} from "~/graphql/graphCMS/generated";
import { graphCMSResolver } from "~/graphql/graphCMS/resolver";

// ここまで
//
//
//
// ここから

export const loader: LoaderFunction = async () => {
  const { data } = await graphCMSResolver(
    SlideDocument.loc?.source.body,
  );
  const { slide } = data;

  return { slide };
};

// ここまで
//
//
//
// ここから

export const action: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  const email = formData.get("email");

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

const MotionBox = motion<BoxProps>(Box);

const switchVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.5 },
  },
};

// ここまで
//
//
//
// ここから

const Newsletter: VFC = () => {
  const { slide } = useLoaderData<SlideQuery>();
  const element = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const actionData = useActionData();
  const transition = useTransition();
  const state: "idle" | "success" | "error" | "submitting" =
    transition.submission
      ? "submitting"
      : actionData?.subscription
      ? "success"
      : actionData?.error
      ? "error"
      : "idle";

  useEffect(() => {
    element.current?.focus();
  }, []);

  const onClickBack = () => {
    formRef.current?.reset();
    element.current?.focus();
  };

  // ここまで
  //
  //
  //
  // ここから

  return (
    <Center
      minH={"100vh"}
      bg={`url(${slide?.slide[0].url})`}
      bgSize={"cover"}
    >
      <Box>
        <Box
          bg={"whiteAlpha.700"}
          borderRadius={10}
          p={6}
          position={"relative"}
        >
          <MotionBox
            variants={switchVariants}
            animate={
              state === "idle" || state === "submitting"
                ? "visible"
                : "hidden"
            }
            zIndex={
              state === "idle" || state === "submitting"
                ? "base"
                : "hide"
            }
          >
            <Form method="post" ref={formRef}>
              <VStack align={"center"}>
                <Heading size={"md"}>
                  ニュースレター
                </Heading>
                <HStack>
                  <Input
                    type={"email"}
                    name={"email"}
                    ref={element}
                  />
                  <Button
                    type="submit"
                    isLoading={state === "submitting"}
                    loadingText="更新中"
                    w={"120px"}
                  >
                    更新
                  </Button>
                </HStack>
              </VStack>
            </Form>
          </MotionBox>
          <MotionBox
            variants={switchVariants}
            animate={
              state === "success" ? "visible" : "hidden"
            }
            initial={false}
            position={"absolute"}
            top={0}
            bottom={0}
            left={0}
            right={0}
            zIndex={state === "success" ? "base" : "hide"}
          >
            <Center h={"100%"}>
              <VStack>
                <Heading>成功しました</Heading>
                <Link to={"/"}>ホームに戻る</Link>
              </VStack>
            </Center>
          </MotionBox>
          <MotionBox
            variants={switchVariants}
            animate={
              state === "error" ? "visible" : "hidden"
            }
            initial={false}
            position={"absolute"}
            top={0}
            bottom={0}
            left={0}
            right={0}
            zIndex={state === "success" ? "hide" : ""}
          >
            <Center h={"100%"}>
              <VStack>
                <Box>
                  <Heading size={"md"}>
                    エラーが発生しました
                  </Heading>
                  <Text>{actionData?.message}</Text>
                </Box>
                <Link
                  to={"/newsletter"}
                  onClick={onClickBack}
                >
                  やり直す
                </Link>
              </VStack>
            </Center>
          </MotionBox>
        </Box>
      </Box>
    </Center>
  );
};
export default Newsletter;
