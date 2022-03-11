import {
  Button,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { memo, VFC } from "react";
import { useFetcher } from "remix";

// ここまで「import」
//
//
//
// ここから

type PROPS = {
  person: {
    _id: string;
    firstName: string;
    lastName: string;
  } | null;
};

export const PersonItem: VFC<PROPS> = memo(({ person }) => {
  const fetcher = useFetcher();

  const isDeleting =
    fetcher.submission?.formData.get("id") === person?._id;

  const isFailedDeletion = fetcher.data?.error;

  return (
    <>
      <HStack
        key={person?._id}
        hidden={isDeleting}
        color={isFailedDeletion ? "red.400" : ""}
      >
        <HStack w={200}>
          <Text>{person?.firstName}</Text>
          <Text>{person?.lastName}</Text>
        </HStack>
        <fetcher.Form method="post">
          <Input
            type={"hidden"}
            name="id"
            value={person?._id}
          />
          <Button
            type="submit"
            aria-label={
              isFailedDeletion ? "Retry" : "Delete"
            }
            name="_action"
            value={"delete"}
          >
            {isFailedDeletion ? "再押下" : "削除"}
          </Button>
        </fetcher.Form>
      </HStack>
    </>
  );
});
PersonItem.displayName = "PersonItem";
