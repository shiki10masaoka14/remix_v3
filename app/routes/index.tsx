import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState, VFC } from "react";
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

// ここまで
//
//
//
// ここから

export const loader: LoaderFunction = async () => {
  const { data: allTodosData } = await faunaResolver(
    AllTodosDocument.loc?.source.body,
  );
  const { allTodos } = allTodosData;

  return { allTodos };
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
  const { allTodos } = useLoaderData<AllTodosQuery>();
  const transition = useTransition();
  const taskEl = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (transition.type === "actionSubmission") {
      taskEl.current.value = "";
    }
  }, [transition.type]);

  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!isLoaded) {
    return <></>;
  }

  // ここまで
  //
  //
  //
  // ここから

  return (
    <Container mt={"60px"}>
      <VStack spacing={10} align={"start"}>
        <HStack
          as={Form}
          method="post"
          alignSelf={"center"}
        >
          <Input name="task" ref={taskEl} />
          <Button type="submit">追加</Button>
        </HStack>
        <Box>
          <Heading>未完了のTodo</Heading>
          <VStack>
            {allTodos.data.map(
              (todo) =>
                todo?.completed === false && (
                  <HStack key={todo._id}>
                    <Text w={300}>{todo.task}</Text>
                    <Form
                      method="post"
                      action="api/complete"
                    >
                      <Button
                        type="submit"
                        name="complete"
                        value={todo._id}
                      >
                        完了
                      </Button>
                    </Form>
                    <Form method="post" action="api/delete">
                      <Button
                        type="submit"
                        name="deleteBtn"
                        value={todo._id}
                      >
                        削除
                      </Button>
                    </Form>
                  </HStack>
                ),
            )}
          </VStack>
        </Box>
        <Box>
          <Heading>完了したTodo</Heading>
          <VStack>
            {allTodos.data.map(
              (todo) =>
                todo?.completed === true && (
                  <HStack key={todo._id}>
                    <Text w={300}>{todo.task}</Text>
                    <Form
                      method="post"
                      action="api/incomplete"
                    >
                      <Button
                        type="submit"
                        name="complete"
                        value={todo._id}
                      >
                        戻す
                      </Button>
                    </Form>
                  </HStack>
                ),
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
export default Index;
