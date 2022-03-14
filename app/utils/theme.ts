import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      ".chakra-divider": {
        borderColor: "rgba(0, 0, 0, 0.3) !important",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        _focus: { boxShadow: "none" },
      },
      variants: {
        ghost: {
          _active: { bg: "transparent" },
          _hover: { backgroundColor: "transparent" },
        },
        outline: {
          _hover: { backgroundColor: "transparent" },
          _active: { bg: "transparent" },
          border: "2px solid",
          borderColor: "black",
        },
      },
    },
    Divider: {
      colorScheme: {
        borderColor: "black",
      },
    },
  },
});

export default theme;
