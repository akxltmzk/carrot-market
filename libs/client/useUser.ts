import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          // router.push 는 히스토리를 남기고
          // router.replace 는 히스토리를 남기지 않음
          return router.replace("/enter");
        }
        setUser(data.profile);
      });
  }, [router]);
  return user;
}