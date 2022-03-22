import { Navbar } from "./Navbar";
import { Box } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { useLoaderData } from "remix";
import { AssetsQuery } from "~/graphql/graphCMS/generated";

// ここまで「import」
//
//
//
// ここから

export const Home: VFC = memo(() => {
  const { homeAssets } = useLoaderData();
  const assetsData = homeAssets as AssetsQuery;

  return (
    <Box
      bgImage={`url("${assetsData.assets[1].url}")`}
      bgSize={"cover"}
      minH={"100vh"}
    >
      <Navbar />
    </Box>
  );
});
Home.displayName = "Home";
