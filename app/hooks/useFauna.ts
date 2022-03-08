import { useEffect, useState } from "react";

export const useFauna: any = (
  endpoint: string,
  secretKey: string,
  schema: any,
  argument?: any,
) => {
  const [faunaData, setFaunaData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetch(endpoint, {
        method: "POST",
        headers: {
          "X-Schema-Preview": "partial-update-mutation",
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: schema,
          variables: argument,
        }),
      }).then((res) => res.json());

      setFaunaData(data);
    };
    fetchData();
  }, [argument, endpoint, schema, secretKey, faunaData]);

  return { faunaData };
};
