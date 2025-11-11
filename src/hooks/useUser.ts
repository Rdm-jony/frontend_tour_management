"use client";

import { getCookie } from "@/utils/tokenHandlers";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const token = await getCookie("accessToken");
  return fetch(url, { headers: { "authorization": `${token}`, } }).then((res) => res.json());
}

export const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "https://beckend-tour-management.vercel.app/api/v1/user/me",
    fetcher
  );

  return {
    user: data?.data || null,
    isLoading,
    isError: error,
    mutateUser: mutate,
  };
};
