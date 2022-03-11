import { VFC } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { AllPeopleDocument } from "~/graphql/fauna/generated";
import { faunaResolver } from "~/graphql/fauna/resolver";

export const loader: LoaderFunction = async () => {
  return await faunaResolver(
    AllPeopleDocument.loc?.source.body,
  );
};

const Test: VFC = () => {
  const testData = useLoaderData();
  console.log(testData);

  return <>test</>;
};
export default Test;
