import {
  Box,
  BoxProps,
  Center,
  Flex,
  FlexProps,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, VFC } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import {
  SlidesDocument,
  SlidesQuery,
} from "~/graphql/graphCMS/generated";
import { graphCMSResolver } from "~/graphql/graphCMS/resolver";

// ここまで
//
//
//
// ここから

export const loader: LoaderFunction = async () => {
  const { data } = await graphCMSResolver(
    SlidesDocument.loc?.source.body,
  );
  const { slides } = data;

  return { slides };
};

// ここまで
//
//
//
// ここから

const MotionBox = motion<BoxProps>(Box);
const MotionFlex = motion<FlexProps>(Flex);

// ここまで
//
//
//
// ここから

const Slider: VFC = () => {
  const { slides } = useLoaderData() as SlidesQuery;
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(
        carousel.current?.scrollWidth -
          carousel.current?.offsetWidth,
      );
    }
  }, []);

  return (
    <Center minH={"100vh"} mx={"20%"}>
      <MotionBox
        cursor={"grab"}
        overflow={"hidden"}
        ref={carousel}
        whileTap={{ cursor: "grabbing" }}
      >
        <MotionFlex
          drag={"x"}
          dragConstraints={{ right: 0, left: -width }}
        >
          {slides[0].slide.map((image) => (
            <MotionBox
              key={image.id}
              minH={"40rem"}
              minW={"30rem"}
              p={3}
            >
              <Image
                pointerEvents={"none"}
                src={image.url}
                borderRadius={"lg"}
                objectFit={"cover"}
                h={"100%"}
              />
            </MotionBox>
          ))}
        </MotionFlex>
      </MotionBox>
    </Center>
  );
};
export default Slider;
