import StudentInfo from "./student.info";

export default function Page() {
  return (
    <main 
      className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center"
      style={{ 
        backgroundImage: "url('/week-2/card.jpg')"
      }}
    >
      <div style={{ 
        marginRight: "80px",
        marginTop: "20px"
      }}>
        <StudentInfo />
      </div>
    </main>
  );
}