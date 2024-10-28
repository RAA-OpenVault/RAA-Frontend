import { getMe, getUser, getUserList, login } from "../fetcher/user";
import type { UserLogin } from "../models/user";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation } from "@tanstack/vue-query";
import { useLocalStorage } from "@vueuse/core";

export const userQueryKeys = createQueryKeys("user", {
  list: {
    queryKey: ["list"],
    queryFn: () => getUserList(),
  },
  me: {
    queryKey: ["me"],
    queryFn: () => getMe(),
  },
  detail: (id: string) => ({
    queryKey: ["detail", id],
    queryFn: () => getUser(id),
  }),
});

export function useLoginToken() {
  return useLocalStorage("token", "");
}

export function useLoginStatus() {
  const token = useLoginToken();
  const isLoggedIn = computed(() => token.value !== "");
  return isLoggedIn;
}

export function useLogin() {
  const token = useLoginToken();
  return useMutation({
    mutationFn: (data: UserLogin) => login(data),
    onSuccess: (data) => {
      token.value = data.access_token;
    },
  });
}
