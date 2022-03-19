import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Input,
  useBoolean,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState, VFC } from "react";
import { Form, LoaderFunction, useLoaderData } from "remix";
import {
  SlideDocument,
  SlideQuery,
} from "~/graphql/graphCMS/generated";
import { graphCMSResolver } from "~/graphql/graphCMS/resolver";

export const loader: LoaderFunction = async () => {
  const { data } = await graphCMSResolver(
    SlideDocument.loc?.source.body,
  );
  const { slide } = data;

  return { slide };
};

const Newsletter: VFC = () => {
  const { slide } = useLoaderData<SlideQuery>();
  const element = useRef<HTMLDivElement>(null);
  const [length, setLength] = useState<{
    height: number | undefined;
    width: number | undefined;
  }>();
  const [flag, setFlag] = useBoolean(true);

  useEffect(() => {
    setLength({
      height:
        element.current?.getBoundingClientRect().height,
      width: element.current?.getBoundingClientRect().width,
    });
  }, []);

  return (
    <Center
      minH={"100vh"}
      bg={`url(${slide?.slide[0].url})`}
      bgSize={"cover"}
    >
      <Box>
        <Box
          bg={"whiteAlpha.700"}
          p={6}
          borderRadius={10}
          ref={element}
          h={length?.height}
          w={length?.width}
        >
          {flag ? (
            <VStack>
              <Form method="post">
                <Heading size={"md"}>
                  ニュースレター
                </Heading>
                <HStack>
                  <Input type={"email"} name={"email"} />
                  <Button type="submit">更新</Button>
                </HStack>
              </Form>
            </VStack>
          ) : (
            <Center w={"100%"} h={"100%"}>
              <Heading>成功しました</Heading>
            </Center>
          )}
        </Box>
        <Button onClick={setFlag.toggle}>切り替え</Button>
      </Box>
    </Center>
  );
};
export default Newsletter;
