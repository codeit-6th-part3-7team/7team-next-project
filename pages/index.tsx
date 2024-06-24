import Header from "@/src/components/Header";
import { Box, Button, Flex, useMatches } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import LandingImg_01 from "@/public/assets/img_landing_01.webp";

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
              <h1 className="md:text-6xl text-4xl md:leading-tight leading-tight font-light">남들이 만드는</h1>
              <h1 className="md:text-8xl text-6xl md:leading-tight leading-tight font-bold">나만의 위키</h1>
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
        <Flex bg="#474D66" h={914} direction="column" align="center" />
      </div>
    </>
  );
}
