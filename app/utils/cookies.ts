import { createCookie } from "remix";

export const userPrefs = createCookie("user-prefs", {
  maxAge: 1_209_600, // 2 weeks in seconds
  sameSite: "strict",
});
