import React from "react";
import { Card, Group, Title, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import indexImage from "@/public/assets/img_card_section.png";
import heart from "@/public/assets/ic_heart.svg";
import { Post } from "@/src/types/boardTypes";
import formatDateToCustom from "@/src/utils/formatDate";
import "@mantine/carousel/styles.css";

interface Props {
  bestPosts: Post[];
}

function BestPosts({ bestPosts }: Props) {
  return (
    <div className="mb-8">
      {/* Desktop view */}
      <div className="hidden grid-cols-2 gap-4 sm:grid lg:grid-cols-4">
        {bestPosts.map((post) => (
          <div key={post.id} className="col-span-1 sm:col-span-1 lg:col-span-1" style={{ boxShadow: " 0px 4px 20px 0px #00000014" }}>
            <Card shadow="sm" radius="md" withBorder className="h-[220px] rounded-md" component="a" href="/boards" target="_self">
              <Card.Section>
                <div className="relative h-[131px] overflow-hidden">
                  <Image
                    src={post.image ? post.image.src : indexImage}
                    alt={post.image ? post.image.alt : "기본 이미지"}
                    layout="responsive"
                    width={250}
                    height={131}
                    objectFit="cover"
                    className="rounded-t-md"
                  />
                </div>
              </Card.Section>
              <Group className="p-[19px] pb-[14px]">
                <Title order={2} className="mb-[14px] text-18 font-semibold leading-6 text-gray-800">
                  {post.title}
                </Title>
                <Group className="flex justify-between">
                  <Group className="flex gap-2">
                    <Text className="text-14 text-gray-400">{post.writer.name}</Text>
                    <Text className="text-14 text-gray-400">{formatDateToCustom(post.createdAt)}</Text>
                  </Group>
                  <Text className="flex gap-1 text-14 text-gray-400">
                    <Image src={heart} alt="좋아요" width={18} height={18} /> {post.likeCount}개
                  </Text>
                </Group>
              </Group>
            </Card>
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="sm:hidden lg:hidden">
        <Carousel
          slideSize="70%"
          height={220}
          slideGap="md"
          align="start"
          classNames={{
            root: "overflow-visible",
            container: "overflow-visible",
          }}
        >
          {bestPosts.map((post) => (
            <Carousel.Slide key={post.id}>
              <div className="mx-2 sm:mx-2 lg:mx-2" style={{ boxShadow: " 0px 4px 20px 0px #00000014" }}>
                <Card shadow="sm" radius="md" withBorder className="h-[220px] rounded-md" component="a" href="/boards" target="_self">
                  <Card.Section>
                    <div className="relative h-[131px] overflow-hidden">
                      <Image
                        src={post.image ? post.image.src : indexImage}
                        alt={post.image ? post.image.alt : "기본 이미지"}
                        layout="responsive"
                        width={250}
                        height={131}
                        objectFit="cover"
                        className="rounded-t-md"
                      />
                    </div>
                  </Card.Section>
                  <Group className="p-[19px] pb-[14px]">
                    <Title order={2} className="mb-[14px] text-18 font-semibold leading-6 text-gray-800">
                      {post.title}
                    </Title>
                    <Group className="flex justify-between">
                      <Group className="flex gap-2">
                        <Text className="text-14 text-gray-400">{post.writer.name}</Text>
                        <Text className="text-14 text-gray-400">{formatDateToCustom(post.createdAt)}</Text>
                      </Group>
                      <Text className="flex gap-1 text-14 text-gray-400">
                        <Image src={heart} alt="좋아요" width={18} height={18} /> {post.likeCount}개
                      </Text>
                    </Group>
                  </Group>
                </Card>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default BestPosts;
