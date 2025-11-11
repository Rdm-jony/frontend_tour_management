"use client";

import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

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
