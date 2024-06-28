import Link from "next/link";

function Home(): JSX.Element {
  return (
    <div>
      <h1>
        <Link href="/boards">post page로 가기</Link>
      </h1>
    </div>
  );
}

export default Home;
