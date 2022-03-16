import { useResolvedPath, useTransition } from "remix";

export const usePageTransition = (to: string) => {
  const transition = useTransition();
  const path = useResolvedPath(to);
  const isPending =
    transition.state === "idle" ||
    (transition.state === "submitting" &&
      transition.location.pathname === path.pathname);

  return { isPending };
};
