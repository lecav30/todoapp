"use-client";

const token =
  process.env.NEXT_PUBLIC_ENV === "production"
    ? "token"
    : "token_dev";

const ISSERVER = typeof window === "undefined";

/* localStorage */
export const saveLocalToken = (token: string) => {
  if (!ISSERVER) localStorage.setItem(token, token);
};

/* return any string */
export const getLocalToken = () => {
  if (!ISSERVER) return localStorage.getItem(token);
};

export const removeLocalToken = () => {
  if (!ISSERVER) localStorage.removeItem(token);
};
/* localStorage - end */
