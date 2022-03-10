import { Box, Button, Spinner } from "@chakra-ui/react";
import { memo, VFC, MouseEvent } from "react";
import { Form, useTransition } from "remix";
import { ActionFunction, redirect } from "remix";
import { PartialUpdateTodoDocument } from "~/graphql/fauna/generated";
import { faunaResolver } from "~/graphql/fauna/resolver";

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
  const { complete } = value;

  await faunaResolver(
    PartialUpdateTodoDocument.loc?.source.body,
    {
      id: complete,
      data: {
        completed: true,
      },
    },
  );
  return redirect(`/`);
};

// ここまで
//
//
//
// ここから

type PROPS = {
  id: string;
};

export const CompleteButton: VFC<PROPS> = memo(({ id }) => {
  const transition = useTransition();

  const onClickComplete = (
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    console.log(e);
  };

  return (
    <>
      <Form method="post" action="api/complete">
        <Button
          type="submit"
          name="complete"
          value={id}
          onClick={onClickComplete}
        >
          {transition.state === "idle" ? (
            "完了"
          ) : (
            <Box>
              <Spinner size={"xs"} />
            </Box>
          )}
        </Button>
      </Form>
    </>
  );
});
CompleteButton.displayName = "CompleteButton";
