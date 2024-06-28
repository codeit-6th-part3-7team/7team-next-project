import React from "react";
import { Card, Group, Title, Text } from "@mantine/core";
import Image from "next/image";
import indexImage from "@/public/assets/img_card_section.png";
import heart from "@/public/assets/ic_heart.svg";
import { Post } from "@/src/types/boardTypes";
import formatDateToCustom from "@/src/utils/formatDate";

interface Props {
  bestPosts: Post[];
}

function BestPosts({ bestPosts }: Props) {
  return (
    <div className="mb-8 flex flex-row gap-4">
      {bestPosts.map((post) => (
        <Card key={post.id} shadow="sm" radius="md" withBorder className="h-[220px] w-[250px] overflow-hidden rounded-md shadow-sm" component="a" href="/boards" target="_self">
          <Card.Section>
            {post.image ? (
              <Image src={post.image.src} alt={`${post.image.alt}이미지`} width={250} height={131} className="w-full object-cover" />
            ) : (
              <Image src={indexImage} alt="기본 이미지" width={250} height={131} className="w-full object-cover" />
            )}
          </Card.Section>
          <Group className="p-[19px] pb-[14px]">
            <Title order={2} className="mb-[14px] text-18 font-semibold leading-6 text-gray-800">
              {post.title}
            </Title>
            <Group justify="space-between" className="flex justify-between">
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
      ))}
    </div>
  );
}

export default BestPosts;
