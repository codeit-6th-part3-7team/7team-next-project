import axios from "@/apis/axios";
import { ProfileResponse } from "@/types/ProfileResponse";
import { useEffect, useState } from "react";

const TEST_CODE: string = "77348674-31f5-4d09-8c1c-c92a1af25f63";
// 테스트 완료 후, code 변수 추가 할 때 삭제 예정

export default function Wiki() {
  const [wikiData, setWikiData] = useState<ProfileResponse>();

  useEffect(() => {
    const getWikiDataByCode = async () => {
      const { data } = await axios.get(`profiles/${TEST_CODE}`);
      // 프로필 데이터 호출 url path의 code 부분 변수로 수정 예정, 테스트용
      if (data) {
        setWikiData(data);
      }
    };

    getWikiDataByCode();
  }, []);

  return <div>{wikiData?.content}</div>;
}
