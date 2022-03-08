import {
  Box,
  BoxProps,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  AnimatePresence,
  motion,
  Transition,
} from "framer-motion";
import { useEffect, useState, VFC } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
  useTransition,
} from "remix";
import {
  AllTodosDocument,
  AllTodosQuery,
  CreateTodoDocument,
} from "~/graphql/fauna/generated";
import { faunaResolver } from "~/graphql/fauna/resolver";
import { useFauna } from "~/hooks/useFauna";

// ここまで
//
//
//
// ここから

export const MotionBox = motion<BoxProps | Transition>(Box);

export const loader: LoaderFunction = async () => {
  return { FAUNA_ENDPOINT, FAUNA_SECRET_KEY };
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
  const value = Object.fromEntries(formData);
  const { task } = value;

  await faunaResolver(CreateTodoDocument.loc?.source.body, {
    data: {
      task,
      completed: false,
    },
  });
  return redirect(`/`);
};

// ここまで
//
//
//
// ここから

const Index: VFC = () => {
  const { FAUNA_ENDPOINT, FAUNA_SECRET_KEY } =
    useLoaderData();
  const { faunaData } = useFauna(
    FAUNA_ENDPOINT,
    FAUNA_SECRET_KEY,
    AllTodosDocument.loc?.source.body,
  );
  const allTodosData = faunaData as AllTodosQuery;

  const transition = useTransition();

  const text =
    transition.state === "submitting"
      ? "Saving..."
      : transition.state === "loading"
      ? "Saved!"
      : "Go";

  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!isLoaded) {
    return <></>;
  }

  return (
    <>
      <Container mt={"60px"}>
        <VStack spacing={10} align={"start"}>
          <Heading alignSelf={"center"}>{text}</Heading>
          <HStack
            as={Form}
            method="post"
            alignSelf={"center"}
          >
            <Input name="task" />
            <Button type="submit">
              {transition.state === "idle" ? (
                "追加"
              ) : (
                <Box>
                  <Spinner />
                </Box>
              )}
            </Button>
          </HStack>
          <Box>
            <Heading>未完了のTodo</Heading>
            <VStack>
              {allTodosData?.allTodos.data.map(
                (todo) =>
                  todo?.completed === false && (
                    <HStack key={todo._id}>
                      <Text w={300}>{todo.task}</Text>
                      <Button>完了</Button>
                      <Button>削除</Button>
                    </HStack>
                  ),
              )}
            </VStack>
          </Box>
          <Box>
            <Heading>完了したTodo</Heading>
            {allTodosData?.allTodos.data.map(
              (todo) =>
                todo?.completed === true && (
                  <HStack key={todo._id}>
                    <Text w={300}>{todo.task}</Text>
                    <Button>戻</Button>
                  </HStack>
                ),
            )}
          </Box>
        </VStack>
      </Container>
      {/* <AnimatePresence>
        {transition.state === "idle" || (
          <MotionBox
            top={0}
            left={0}
            w={"100%"}
            h={"100%"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            bg={"blackAlpha.800"}
            position={"fixed"}
          >
            <Center h={"100%"}>
              <Spinner color={"white"} size={"xl"} />
            </Center>
          </MotionBox>
        )}
      </AnimatePresence> */}
    </>
  );
};
export default Index;
