import { GetServerSideProps } from "next";

export default function WikiPage() {
  // note
  return;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: "/wikilist",
      permanent: false, // 301 Moved Permanently(false)
    },
  };
};
