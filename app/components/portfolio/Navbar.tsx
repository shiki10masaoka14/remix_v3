import {
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { memo, useState, VFC } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Link as RemixLink,
  useLoaderData,
  useLocation,
} from "remix";
import { AssetsQuery } from "~/graphql/graphCMS/generated";

// ここまで「import」
//
//
//
// ここから

export const Navbar: VFC = memo(() => {
  const { logoAssets } = useLoaderData();
  const assetsData = logoAssets as AssetsQuery;
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  console.log(location);

  const links = [
    "home",
    "services",
    "portfolio",
    "blog",
    "skills",
    "contact",
  ];

  return (
    <Flex
      maxW={"1080px"}
      px={"40px"}
      pt={"40px"}
      mx={"auto"}
    >
      <Link as={RemixLink} to={"#"}>
        <Image src={assetsData.assets[0].url} />
      </Link>
      <Spacer />
      {isNavOpen && <Icon as={GiHamburgerMenu} />}
      <HStack spacing={8}>
        {links.map((link) => (
          <Link
            key={link}
            as={RemixLink}
            to={`#${link}`}
            color={"white"}
            fontSize={"18px"}
            fontWeight={"bold"}
            _hover={{ textDecoration: "none" }}
            _focus={{ textDecoration: "none" }}
            borderBottom={
              location.hash === ""
                ? link === "home"
                  ? "4px solid #ed6991"
                  : "4px solid transparent"
                : location.hash === `#${link}`
                ? "4px solid #ed6991"
                : "4px solid transparent"
            }
            lineHeight={"1"}
          >
            {link}
          </Link>
        ))}
      </HStack>
    </Flex>
  );
});
Navbar.displayName = "Navbar";
