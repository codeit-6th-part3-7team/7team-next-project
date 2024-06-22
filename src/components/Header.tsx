import { Group, Box, Menu } from "@mantine/core";

import Image from "next/image";
import Link from "next/link";
import ImgLogo from "@/public/assets/img_logo.webp";
import IcoBurger from "@/public/assets/ic_burger.svg";

export default function Header() {
  return (
    <Box pb={120}>
      <header className="md:px-20 px-10 bg-white drop-shadow-md font-pretendard">
        <Group justify="space-between" h={80}>
          <Group justify="space-between" gap={40} h="100%">
            <Link href="/">
              <Image src={ImgLogo} width={107} height={30} alt="로고" />
            </Link>
            <Group h="100%" gap={40} visibleFrom="sm">
              <Link href="/wikilist" className="text-gray-800 text-sm">
                위키목록
              </Link>
              <Link href="/boards" className="text-gray-800 text-sm">
                자유게시판
              </Link>
            </Group>
          </Group>
          <Group>
            <Group visibleFrom="sm">
              <Link href="/login" className="text-gray-400 text-sm">
                로그인
              </Link>
            </Group>
            <Group hiddenFrom="sm">
              <Menu width={110} position="bottom" radius="md" shadow="md" withinPortal>
                <Menu.Target>
                  <Image src={IcoBurger} width={24} height={24} alt="메뉴" className="cursor-pointer" />
                </Menu.Target>

                <Menu.Dropdown>
                  <Link href="/wikilist" className="flex p-2 justify-center text-gray-800 text-sm">
                    위키 목록
                  </Link>
                  <Link href="/boards" className="flex p-2 justify-center text-gray-800 text-sm">
                    자유게시판
                  </Link>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Group>
      </header>
    </Box>
  );
}
