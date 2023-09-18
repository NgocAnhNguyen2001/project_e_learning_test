const tokenPrefix = "mindworks-nextjs_";

const token = {
  getToken: (): string | undefined => {
    if (typeof window !== "undefined") {
      return JSON.parse(
        window.localStorage.getItem(`${tokenPrefix}token`) as string,
      );
    }
  },
  setToken: (token: string): string | void => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(`${tokenPrefix}token`, JSON.stringify(token));
    }
  },
  clearToken: (): string | void => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(`${tokenPrefix}token`);
    }
  },
};

export default token;
