import Categories from "@/shared/Categories";
import EventSchema from "@/shared/EventSchema";
import React, { useEffect } from "react";

const event: EventSchema = {
  name: "Test Event",
  category: Categories.Agriculture,
  description: "This is a description.",
  location: {
    name: "A cool place",
    street: "69th street",
    latitude: 51.049999,
    longitude: -114.066666
  }
};

const TestCreate: React.FC = () => {
  useEffect(() => {
    const test = async () => {
      await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify(event)
      });
    }

    test();
  });

  return (
    <div>
      <h1>Access this page to insert into the DB!</h1>
    </div>
  );
}

export default TestCreate;