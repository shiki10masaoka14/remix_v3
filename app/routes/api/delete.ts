import { ActionFunction, redirect } from "remix";
import { DeleteTodoDocument } from "~/graphql/fauna/generated";
import { faunaResolver } from "~/graphql/fauna/resolver";

export const action: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  const value = Object.fromEntries(formData);
  const { deleteBtn } = value;

  await faunaResolver(DeleteTodoDocument.loc?.source.body, {
    id: deleteBtn,
  });
  return redirect(`/`);
};
