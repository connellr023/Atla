import React, { useEffect } from "react";

const TestFetch: React.FC = () => {
  useEffect(() => {
    const test = async () => {
      const res = await fetch("/api/events");

      try {
        console.log(await res.json());
      }
      catch (error) {
        console.log(error);
      }
    }

    test();
  });

  return (
    <div>
      <h1>All events should be in the console!</h1>
    </div>
  );
}

export default TestFetch;