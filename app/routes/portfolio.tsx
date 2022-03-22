import { Box, BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { VFC } from "react";
import { LoaderFunction } from "remix";
import { Home } from "~/components/portfolio/Home";
import { Services } from "~/components/portfolio/Services";
import { AssetsDocument } from "~/graphql/graphCMS/generated";
import { graphCMSResolver } from "~/graphql/graphCMS/resolver";

// ここまで
//
//
//
// ここから

export const loader: LoaderFunction = async () => {
  const { data: homeAssets } = await graphCMSResolver(
    AssetsDocument.loc?.source.body,
    {
      OR: [
        {
          fileName: "play.png",
        },
        {
          fileName: "home.png",
        },
      ],
    },
  );

  const { data: logoAssets } = await graphCMSResolver(
    AssetsDocument.loc?.source.body,
    {
      OR: [
        {
          fileName: "logo.png",
        },
      ],
    },
  );

  return { homeAssets, logoAssets };
};

// ここまで
//
//
//
// ここから

const MotionBox = motion<BoxProps>(Box);

const Portfolio: VFC = () => {
  return (
    <MotionBox>
      {/* <ScrollToTop /> */}
      <Home />
      <Services />
      {/* <Portfolio />
      <Milestones />
      <Blog />
      <Video />
      <Pricing />
      <Testimonials />
      <Skills />
      <Contact />
      <Footer /> */}
    </MotionBox>
  );
};
export default Portfolio;
