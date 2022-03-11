import {
  Button,
  Container,
  Heading,
  HStack,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, VFC } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  useLoaderData,
  useTransition,
} from "remix";
import { PersonItem } from "~/components/PersonItem";
import {
  AllPeopleDocument,
  AllPeopleQuery,
  CreatePeopleDocument,
  DeletePeopleDocument,
} from "~/graphql/fauna/generated";
import { faunaResolver } from "~/graphql/fauna/resolver";

// ここまで
//
//
//
// ここから

export const loader: LoaderFunction = async () => {
  const { data: allPeopleData } = await faunaResolver(
    AllPeopleDocument.loc?.source.body,
  );
  const { allPeople } = allPeopleData;

  return { allPeople };
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
  const { _action, ...value } =
    Object.fromEntries(formData);
  const { firstName, lastName, id } = value;

  switch (_action) {
    case "create":
      return await faunaResolver(
        CreatePeopleDocument.loc?.source.body,
        {
          data: {
            firstName,
            lastName,
          },
        },
      );
    case "delete":
      try {
        return await faunaResolver(
          DeletePeopleDocument.loc?.source.body,
          { id },
        );
      } catch (e) {
        return { error: true };
      }
  }
};

// ここまで
//
//
//
// ここから

const Practice: VFC = () => {
  const { allPeople } = useLoaderData<AllPeopleQuery>();
  const transition = useTransition();
  const isAdding =
    transition.submission &&
    transition.submission.formData.get("_action") ===
      "create";
  const formRef = useRef<HTMLFormElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdding) {
      formRef.current?.reset();
      firstNameRef.current?.focus();
    }
  }, [isAdding]);

  // ここまで
  //
  //
  //
  // ここから

  return (
    <Container mt={6}>
      <Heading mb={6}>プラクティス</Heading>
      {allPeople.data.length ? (
        <VStack align={"start"} mb={6}>
          {allPeople.data.map((person) => (
            <PersonItem key={person?._id} person={person} />
          ))}
          {isAdding && (
            <HStack>
              <HStack w={200}>
                <Text>
                  {transition.submission?.formData.get(
                    "firstName",
                  )}
                </Text>
                <Text>
                  {transition.submission?.formData.get(
                    "lastName",
                  )}
                </Text>
              </HStack>
              <Button isDisabled>削除</Button>
            </HStack>
          )}
        </VStack>
      ) : (
        <Heading mb={6}>何もない!</Heading>
      )}
      <Form method="post" replace ref={formRef}>
        <HStack>
          <Input
            name="firstName"
            placeholder="first name"
            ref={firstNameRef}
          />
          <Input name="lastName" placeholder="last name" />
          <Button
            type="submit"
            name="_action"
            value={"create"}
            isLoading={
              isAdding && allPeople.data.length === 0
            }
            spinnerPlacement="start"
          >
            追加
          </Button>
        </HStack>
      </Form>
    </Container>
  );
};
export default Practice;
