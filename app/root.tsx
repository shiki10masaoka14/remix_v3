import theme from "./utils/theme";
import {
  ChakraProvider,
  Heading,
  Center,
} from "@chakra-ui/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";

function Document({
  children,
  title = "App title",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <Meta />
        <title>{title}</title>
        <Links />
        <link rel="shortcut icon" href="/music.ico" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && (
          <LiveReload />
        )}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document
      title={`${caught.status} ${caught.statusText}`}
    >
      <ChakraProvider>
        <Center minH={"100vh"}>
          <Heading as="h1">
            [CatchBoundary]: {caught.status}{" "}
            {caught.statusText}
          </Heading>
        </Center>
      </ChakraProvider>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <ChakraProvider>
        <Center minH={"100vh"}>
          <Heading as="h1">
            [ErrorBoundary]: There was an error:{" "}
            {error.message}
          </Heading>
        </Center>
      </ChakraProvider>
    </Document>
  );
}
