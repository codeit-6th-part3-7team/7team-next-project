import { Modal } from "@mantine/core";

type EditWikiAuthModal = {
  opened: boolean;
  onClose: () => void;
};

export default function EditWikiAuthModal({ opened, onClose }: EditWikiAuthModal) {
  return (
    <>
      <Modal opened={opened} onClose={onClose}>
        Auth Modaldaldaldaldal
      </Modal>
    </>
  );
}
