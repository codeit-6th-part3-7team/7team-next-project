import { ProfileResponse } from "@/src/types/ProfileResponse";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import instance from "@/src/apis/axios";

export default function Wiki() {
  const [wikiData, setWikiData] = useState<ProfileResponse>();
  const router = useRouter();

  const fetchWikiData = async (code: string) => {
    try {
      const response = await instance.get(`/profiles/${code}`);
      setWikiData(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to fetch wiki data:", error);
    }
  };

  useEffect(() => {
    const { code, ...query } = router.query;

    if (code && typeof code === "string") {
      localStorage.setItem("code", code);
      router.replace(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true },
      );
    } else {
      const storedState = localStorage.getItem("code");
      if (storedState) {
        fetchWikiData(storedState);
      }
    }
  }, [router, router.query]);

  return (
    <div>
      {wikiData ? (
        <div>
          <div>{wikiData.name}</div>
          <div>{wikiData.birthday}</div>
          <div>{wikiData.bloodType}</div>
          <div>{wikiData.city}</div>
          <div>{wikiData.nationality}</div>
          <div>{wikiData.family}</div>
          <div>{wikiData.job}</div>
          <div>{wikiData.mbti}</div>
          <div>{wikiData.content}</div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
