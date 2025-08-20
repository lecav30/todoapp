"use-client";

const token =
  import.meta.env.VITE_PUBLIC_ENV === "production"
    ? "token"
    : "token_dev";

const ISSERVER = typeof window === "undefined";

/* localStorage */
export const saveLocalToken = (newToken: string) => {
  if (!ISSERVER) localStorage.setItem(token, newToken);
};

/* return any string */
export const getLocalToken = () => {
  if (!ISSERVER) return localStorage.getItem(token);
};

export const removeLocalToken = () => {
  if (!ISSERVER) localStorage.removeItem(token);
};
/* localStorage - end */
