import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

/*
  useSWR의 fetcher는 _app.tsx에 명시해서 모든 페이지에서 fetch할수 있게 했음
*/
export default function useUser() {
  // _app.tsx의 fetcher를 이용함.
  const {data, error, mutate}= useSWR("/api/users/me")
  const router = useRouter();
  useEffect(()=>{
    // data가 있고 data.ok가 false라면 리다이랙트
    if(data && !data.ok)
     router.replace("/enter");
  },[data, router])

  return {user: data?.profile, isLoading: !data && !error};
}