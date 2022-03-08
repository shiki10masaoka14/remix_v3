export const faunaResolver = async (
  schema: any,
  argument?: any,
) => {
  const { data } = await fetch(FAUNA_ENDPOINT, {
    method: "POST",
    headers: {
      "X-Schema-Preview": "partial-update-mutation",
      Authorization: `Bearer ${FAUNA_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: schema,
      variables: argument,
    }),
  }).then((res) => res.json());

  return { data };
};
