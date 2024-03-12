import { FormValues } from "components/Form/Form";

export const isLoginUnique = (login: string, users: FormValues[]) => {
  return !users.some(user => user.login === login);
};
