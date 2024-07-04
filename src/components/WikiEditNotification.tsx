import { Box, Text, Dialog, Flex, CloseButton } from "@mantine/core";
import { NotiData } from "@/src/types/NotificationResponse";

type EditNotificationProps = {
  opened: boolean;
  notiData: NotiData;
};

export default function EditNotification({ opened, notiData }: EditNotificationProps) {
  return (
    <Dialog opened={opened} position={{ top: "8%", right: "8%" }} style={{ backgroundColor: "#CBC9CF", padding: 20 }}>
      <Flex justify="space-between" align="center">
        <Text>알림 {notiData.totalCount}개</Text>
      </Flex>
      <Flex direction="column" align="center" gap="8">
        {notiData.totalCount > 0 ? (
          notiData.list.slice(0, notiData.totalCount).map((list) => (
            <Box key={list.id} className="relative flex h-[98px] w-full flex-col items-start justify-around rounded-[5px] bg-white px-[12px] py-[16px]">
              <CloseButton size="sm" style={{ position: "absolute", top: 5, right: 5 }} onClick={() => {}} />
              <Text>{list.content}</Text>
              <Text>{list.createdAt}</Text>
            </Box>
          ))
        ) : (
          <Box className="flex h-[200px] w-full flex-col items-center justify-center">
            <Text>알림이 없습니다</Text>
          </Box>
        )}
      </Flex>
    </Dialog>
  );
}
