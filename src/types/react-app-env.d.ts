export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_TOKEN_KEY_IN_LOCAL_STORAGE?: string;
      REACT_APP_API_SERVER?: string;
    }
  }
}
