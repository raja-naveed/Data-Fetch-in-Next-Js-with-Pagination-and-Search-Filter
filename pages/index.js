import React, { useState } from "react";
import Headers from "@/components/Headers";
import Homee from "@/components/Home";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState(""); 

  return (
    <>
      <Headers
        onSearchTermChange={setSearchTerm}  OnSearch={searchTerm}
      />
      <Homee
        searchTerm={searchTerm}
      />
    </>
  );
}
