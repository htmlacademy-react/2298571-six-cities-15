const TOKEN_KEY_NAME = 'auth-token';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(TOKEN_KEY_NAME, token);
};

export const deleteToken = (): void => {
  localStorage.removeItem(TOKEN_KEY_NAME);
};
