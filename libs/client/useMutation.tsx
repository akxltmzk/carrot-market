import { useState } from "react";

// https://hyunseob.github.io/2017/01/14/typescript-generic/
// https://trustyoo86.github.io/typescript/2019/04/23/typescript-generic.html
// https://react.vlpt.us/basic/07-useState.html

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(url: string): UseMutationResult<T> {
  
  const [state, setSate] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  })

  function mutation(data: any) {
    setSate((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => { }))
      .then((data) => setSate((prev) => ({ ...prev, data })))
      .catch((error) => setSate((prev) => ({ ...prev, error })))
      .finally(() => setSate((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}