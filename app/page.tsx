import Link from "next/link";

export default function Page() {
  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>CPRG 306: Web Development 2 - Assignments</h1>

      <p style={{ marginTop: "20px" }}>
        <Link href="/week-2">
          Go to Week 2: Page
        </Link>
      </p>

      <p style={{ marginTop: "10px" }}>
        <Link href="/week-3">
          Go to Week 3: Shopping List
        </Link>
      </p>

      <p style={{ marginTop: "10px" }}>
        <Link href="/week-4">
          Go to Week 4: Add New item
        </Link>
      </p>

      <p style={{ marginTop: "10px" }}>
        <Link href="/week-5">
          Go to Week 5: Handling Lists
        </Link>
      </p>

      <p style={{ marginTop: "10px" }}>
        <Link href="/week-6">
        Go to Week 6: Managing State
        </Link>
      </p>

      <p style={{ marginTop: "10px" }}>
        <Link href="/week-7">
        Go to Week 7: Fetching Data
        </Link>
      </p>

      <p style={{ marginTop: "10px" }}>
        <Link href="/week-8">
        Go to Week 8: Auth
        </Link>
      </p>

       <p style={{ marginTop: "10px" }}>
        <Link href="/week-10">
        Go to Week 10: Cloud Firestore
        </Link>
      </p>


    </main>
  );
}
