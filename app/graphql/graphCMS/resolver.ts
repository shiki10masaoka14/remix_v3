export const graphCMSResolver = async (
  schema: any,
  argument?: any,
) => {
  const { data } = await fetch(GRAPHCMS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GRAPHCMS_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: schema,
      variables: argument,
    }),
  }).then((res) => res.json());

  return { data };
};
