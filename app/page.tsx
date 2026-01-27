import Link from "next/link";

export default function Page() {
  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>CPRG 306: Web Development 2 - Assignments</h1>
      <p style={{ marginTop: "20px" }}>
        <Link href="/week-2">
          Go to Week 2 Page
        </Link>
      </p>
    </main>
  );
};