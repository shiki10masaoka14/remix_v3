import { Box } from "@chakra-ui/react";
import { memo, VFC } from "react";

// ここまで「import」
//
//
//
// ここから

export const Services: VFC = memo(() => {
  return <Box id="services">サービス</Box>;
});
Services.displayName = "Services";
