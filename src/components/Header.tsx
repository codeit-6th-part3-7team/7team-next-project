import { Group, Box, Menu } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import ImgLogo from "../../public/assets/img_logo.webp";
import IcoBurger from "../../public/assets/ic_burger.svg";

export default function Header() {
  return (
    <Box pb={120}>
      <header className="bg-white px-10 font-pretendard drop-shadow-md md:px-20">
        <Group justify="space-between" h={80}>
          <Group justify="space-between" gap={40} h="100%">
            <Link href="/">
              <Image src={ImgLogo} width={107} height={30} alt="로고" />
            </Link>
            <Group h="100%" gap={40} visibleFrom="sm">
              <Link href="/wikilist" className="text-sm text-gray-800">
                위키목록
              </Link>
              <Link href="/boards" className="text-sm text-gray-800">
                자유게시판
              </Link>
            </Group>
          </Group>
          <Group>
            <Group visibleFrom="sm">
              <Link href="/login" className="text-sm text-gray-400">
                로그인
              </Link>
            </Group>
            <Group hiddenFrom="sm">
              <Menu width={110} position="bottom" radius="md" shadow="md" withinPortal>
                <Menu.Target>
                  <Image src={IcoBurger} width={24} height={24} alt="메뉴" className="cursor-pointer" />
                </Menu.Target>

                <Menu.Dropdown>
                  <Link href="/wikilist" className="flex justify-center p-2 text-sm text-gray-800">
                    위키 목록
                  </Link>
                  <Link href="/boards" className="flex justify-center p-2 text-sm text-gray-800">
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
