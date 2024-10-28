import { fetcher, baseFetcher } from ".";
import {
  UserCreateValidator,
  UserIDValidator,
  UserLoginValidator,
  UserUpdateValidator,
  type Token,
  type UserCreate,
  type UserInfo,
  type UserLogin,
  type UserUpdate,
} from "../models/user";

export async function login(data: UserLogin): Promise<Token> {
  UserLoginValidator.parse(data);
  return (await baseFetcher.post("/user/login", data)).data;
}

export async function refresh(): Promise<Token> {
  return (await baseFetcher.post("/user/refresh")).data;
}

export async function getUserList(): Promise<UserInfo[]> {
  return (await fetcher.get("/user")).data;
}

export async function getMe(): Promise<UserInfo> {
  return (await fetcher.get("/user/me")).data;
}

export async function getUser(id: string): Promise<UserInfo> {
  UserIDValidator.parse(id);
  return (await fetcher.get(`/user/${id}`)).data;
}

export async function createUser(user: UserCreate): Promise<UserInfo> {
  UserCreateValidator.parse(user);
  return (await fetcher.post("/user", user)).data;
}

export async function batchCreateUser(
  users: UserCreate[],
): Promise<UserInfo[]> {
  UserCreateValidator.array().parse(users);
  return (await fetcher.post("/user/batch", users)).data;
}

export async function batchUpdateUser(
  users: UserUpdate[],
): Promise<UserInfo[]> {
  UserUpdateValidator.array().parse(users);
  return (await fetcher.put("/user/batch", users)).data;
}

export async function updateMe(user: UserUpdate): Promise<UserInfo> {
  UserUpdateValidator.parse(user);
  return (await fetcher.put("/user/me", user)).data;
}

export async function updateUser(
  id: string,
  user: UserUpdate,
): Promise<UserInfo> {
  UserIDValidator.parse(id);
  UserUpdateValidator.parse(user);
  return (await fetcher.put(`/user/${id}`, user)).data;
}

export async function batchDeleteUser(ids: string[]): Promise<void> {
  UserIDValidator.array().parse(ids);
  await fetcher.delete("/user/batch", { data: ids });
}

export async function deleteUser(id: string): Promise<void> {
  UserIDValidator.parse(id);
  await fetcher.delete(`/user/${id}`);
}
