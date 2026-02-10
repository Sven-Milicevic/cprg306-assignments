import React from "react";
import Link from "next/link";

const StudentInfo: React.FC = () => {
  const name = "Sven Milicevic";
  const githubRepo = "https://github.com/Sven-Milicevic/cprg306-assignments";
  
  return (
    <div className="text-center" style={{ 
      width: "350px",
      padding: "20px",
      color: "#333"
    }}>
      <h1 className="text-2xl font-bold mb-4">Student Information</h1>
      <p className="mb-2">
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>GitHub Repository:</strong>{" "}
        <Link 
          href={githubRepo} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          View Repository
        </Link>
      </p>
    </div>
  );
};

export default StudentInfo;