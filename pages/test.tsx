import { useState, useEffect } from "react";
import { Group, Menu } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import ImgLogo from "@/public/assets/img_logo.webp";
import IcoBurger from "@/public/assets/ic_burger.svg";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드에서만 localStorage 접근
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []); // 처음 한 번만 실행하도록 빈 배열을 전달

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setLoggedIn(false);
    // TODO: 로그아웃 알림 처리
  };

  return (
    <div className="h-20">
      <header className="fixed z-10 h-20 w-full bg-white px-10 drop-shadow-md md:px-20">
        <Group justify="space-between" h="100%">
          <Group justify="space-between" gap={40} h="100%">
            <Link href="/">
              <Image src={ImgLogo} width={107} height={30} alt="로고" />
            </Link>
            <Group h="100%" gap={40} visibleFrom="sm">
              {loggedIn ? (
                <>
                  <Link href="/wikilist" className="text-14 text-gray-800">
                    위키목록
                  </Link>
                  <Link href="/boards" className="text-14 text-gray-800">
                    자유게시판
                  </Link>
                  <Menu width={110} position="bottom" radius="md" shadow="md" withinPortal>
                    <Menu.Target>
                      <div className="flex cursor-pointer items-center">
                        <span className="text-sm text-gray-400">프로필</span>
                      </div>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Link href="/wikilist" className="flex justify-center p-2 text-14 text-gray-800">
                        위키 목록
                      </Link>
                      <Link href="/boards" className="flex justify-center p-2 text-14 text-gray-800">
                        자유게시판
                      </Link>
                      <Link href="/notifications" className="flex justify-center p-2 text-14 text-gray-800">
                        알림
                      </Link>
                      <Link href="/mypage" className="flex justify-center p-2 text-14 text-gray-800">
                        마이페이지
                      </Link>
                      <Link href="/account-settings" className="flex justify-center p-2 text-14 text-gray-800">
                        계정 설정
                      </Link>
                      <div onClick={handleLogout} className="flex cursor-pointer justify-center p-2 text-14 text-gray-800">
                        로그아웃
                      </div>
                    </Menu.Dropdown>
                  </Menu>
                </>
              ) : (
                <Link href="/login" className="text-sm text-gray-400">
                  로그인
                </Link>
              )}
            </Group>
          </Group>
          <Group>
            <Group visibleFrom="sm">
              {loggedIn ? (
                <Menu width={110} position="bottom" radius="md" shadow="md" withinPortal>
                  <Menu.Target>
                    <Image src={IcoBurger} width={24} height={24} alt="메뉴" className="cursor-pointer" />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Link href="/wikilist" className="flex justify-center p-2 text-14 text-gray-800">
                      위키 목록
                    </Link>
                    <Link href="/boards" className="flex justify-center p-2 text-14 text-gray-800">
                      자유게시판
                    </Link>
                    <Link href="/notifications" className="flex justify-center p-2 text-14 text-gray-800">
                      알림
                    </Link>
                    <Link href="/mypage" className="flex justify-center p-2 text-14 text-gray-800">
                      마이페이지
                    </Link>
                    <Link href="/account-settings" className="flex justify-center p-2 text-14 text-gray-800">
                      계정 설정
                    </Link>
                    <div onClick={handleLogout} className="flex cursor-pointer justify-center p-2 text-14 text-gray-800">
                      로그아웃
                    </div>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Menu width={110} position="bottom" radius="md" shadow="md" withinPortal>
                  <Menu.Target>
                    <Image src={IcoBurger} width={24} height={24} alt="메뉴" className="cursor-pointer" />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Link href="/wikilist" className="flex justify-center p-2 text-14 text-gray-800">
                      위키 목록
                    </Link>
                    <Link href="/boards" className="flex justify-center p-2 text-14 text-gray-800">
                      자유게시판
                    </Link>
                    <Link href="/login" className="flex justify-center p-2 text-14 text-gray-800">
                      로그인
                    </Link>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Group>
          </Group>
        </Group>
      </header>
    </div>
  );
}
