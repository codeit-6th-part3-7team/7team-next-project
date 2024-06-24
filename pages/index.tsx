import Header from "@/src/components/Header";
import { Box, Button, Flex, Group, useMatches } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import LandingImg_01 from "@/public/assets/img_landing_01.webp";
import LandingImg_02 from "@/public/assets/img_landing_02.webp";
import LandingImg_03 from "@/public/assets/img_landing_03.webp";

export default function Home() {
  const btnSize = useMatches({
    base: "lg",
    sm: "xl",
  });
  return (
    <>
      <Header />
      <div className="relative">
        <div className="rounded-1/2 absolute bottom-0 -left-10 -right-10 h-56 bg-gray-800 translate-y-1/2" />
        <Flex bg="#F1F4FD" direction="column" align="center">
          <Flex pt={{ base: 100, sm: 120 }}>
            <hgroup className="font-nexon text-gray-800 mb-10 text-center">
              <h2 className="md:text-6xl text-4xl md:leading-tight leading-tight font-light">남들이 만드는</h2>
              <h2 className="md:text-8xl text-6xl md:leading-tight leading-tight font-bold">나만의 위키</h2>
            </hgroup>
          </Flex>
          <Link href="/wiki">
            <Button variant="filled" color="#474D66" size={btnSize} radius="md">
              위키 만들기
            </Button>
          </Link>
          <div className="isolate">
            <Box w={{ base: 336, sm: 498 }} h={{ base: 398, sm: 590 }} mt={44}>
              <Image src={LandingImg_01} alt="위키 이미지" width={0} height={0} className="w-full" />
            </Box>
          </div>
        </Flex>
      </div>
      <div>
        <Flex bg="#474D66" direction="column" align="center" pt={131} pb={200}>
          <Flex gap="40" align="flex-end">
            <Flex direction="column" gap="60">
              <Flex direction="column" gap="20" className="font-nexon">
                <strong className="text-green-200 text-3xl">WRITE</strong>
                <hgroup className="text-white text-5xl leading-11">
                  <h3>친구의 위키,</h3>
                  <h3>직접 작성해 봐요</h3>
                </hgroup>
              </Flex>
              <Box className="bg-green-200 rounded-20" w={364}>
                <Image src={LandingImg_02} alt="키보드 이미지" width={310} height={450} />
              </Box>
            </Flex>
            <Image src={LandingImg_03} alt="위키 예시 이미지" width={520} height={681} />
          </Flex>
        </Flex>
      </div>
    </>
  );
}
