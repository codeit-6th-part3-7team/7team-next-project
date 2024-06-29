import { Group, Menu } from "@mantine/core";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ImgLogo from "@/public/assets/img_logo.webp";
import IcoBurger from "@/public/assets/ic_burger.svg";
import IcoProfile from "@/public/assets/ic_profile.svg";
import { notifications } from "@mantine/notifications";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathName = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLoggedIn(false);
    notifications.show({
      color: "green.2",
      title: "로그아웃",
      message: "",
      autoClose: 2000,
      withCloseButton: true,
    });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [pathName]);

  return (
    <div className="h-20">
      <header className="fixed z-10 h-20 w-full bg-white px-10 drop-shadow-md md:px-20">
        <Group justify="space-between" h="100%">
          <Group justify="space-between" gap={40} h="100%">
            <Link href="/">
              <Image src={ImgLogo} width={107} height={30} alt="로고" />
            </Link>
            <Group h="100%" gap={40} visibleFrom="sm">
              <Link href="/wikilist" className="text-14 text-gray-800">
                위키목록
              </Link>
              <Link href="/boards" className="text-14 text-gray-800">
                자유게시판
              </Link>
            </Group>
          </Group>

          {loggedIn ? (
            <Menu width={120} position="bottom" radius="md" shadow="md" withinPortal>
              <Group>
                <Menu.Target>
                  <Group>
                    <Group hiddenFrom="sm">
                      <Image src={IcoBurger} width={24} height={24} alt="메뉴" className="cursor-pointer" />
                    </Group>
                    <Group visibleFrom="sm">
                      <Image src={IcoProfile} width={32} height={32} alt="프로필" className="cursor-pointer" />
                    </Group>
                  </Group>
                </Menu.Target>
              </Group>

              <Menu.Dropdown>
                <Menu.Item hiddenFrom="sm">
                  <Link href="/wikilist" className="flex justify-center p-2 text-14 text-gray-800">
                    위키 목록
                  </Link>
                </Menu.Item>
                <Menu.Item hiddenFrom="sm">
                  <Link href="/boards" className="flex justify-center p-2 text-14 text-gray-800">
                    자유게시판
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/notifications" className="flex justify-center p-2 text-14 text-gray-800">
                    알림
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/mypage" className="flex justify-center p-2 text-14 text-gray-800">
                    마이페이지
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/account-settings" className="flex justify-center p-2 text-14 text-gray-800">
                    계정 설정
                  </Link>
                </Menu.Item>
                <Menu.Item onClick={handleLogout}>
                  <div className="flex justify-center p-2 text-14 text-gray-800">로그아웃</div>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <>
              <Group visibleFrom="sm">
                <Link href="/login" className="text-sm text-gray-400">
                  로그인
                </Link>
              </Group>
              <Group hiddenFrom="sm">
                <Menu width={120} position="bottom" radius="md" shadow="md" withinPortal>
                  <Menu.Target>
                    <Image src={IcoBurger} width={24} height={24} alt="메뉴" className="cursor-pointer" />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item>
                      <Link href="/wikilist" className="flex justify-center p-2 text-14 text-gray-800">
                        위키 목록
                      </Link>
                    </Menu.Item>

                    <Menu.Item>
                      <Link href="/boards" className="flex justify-center p-2 text-14 text-gray-800">
                        자유게시판
                      </Link>
                    </Menu.Item>

                    <Menu.Item>
                      <Link href="/login" className="flex justify-center p-2 text-14 text-gray-800">
                        로그인
                      </Link>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </>
          )}
        </Group>
      </header>
    </div>
  );
}