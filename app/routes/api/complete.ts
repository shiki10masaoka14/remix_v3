import { ActionFunction, json } from "remix";
import { PartialUpdateTodoDocument } from "~/graphql/fauna/generated";
import { faunaResolver } from "~/graphql/fauna/resolver";

export const action: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  const value = Object.fromEntries(formData);
  const { complete } = value;
  try {
    return await faunaResolver(
      PartialUpdateTodoDocument.loc?.source.body,
      {
        id: complete,
        data: {
          completed: true,
        },
      },
    );
  } catch (error: any) {
    return json({ error: error.message });
  }
};
