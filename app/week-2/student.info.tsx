import React from "react";
import Link from "next/link";

const StudentInfo: React.FC = () => {
  const name = "Sven Milicevic";
  const githubRepo = "https://github.com/Sven-Milicevic/cprg306-assignments";

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Student Information</h1>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>GitHub Repository:</strong>{" "}
        <Link href={githubRepo} target="_blank" rel="noopener noreferrer">
          View Repository
        </Link>
      </p>
    </div>
  );
};

export default StudentInfo;
