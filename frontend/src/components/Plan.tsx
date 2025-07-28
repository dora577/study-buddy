import React, { useState } from "react";

const Plan: React.FC = () => {
  const [courseId, setCourseId] = useState("");
  const [plan, setPlan] = useState<string>("");

  const generate = async () => {
    const res = await fetch("/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ course_id: courseId }),
    });
    const data = await res.json();
    setPlan(data.plan);
  };

  return (
    <div>
      <input
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        placeholder="Course ID"
      />
      <button onClick={generate}>Generate</button>
      <pre>{plan}</pre>
    </div>
  );
};

export default Plan;
