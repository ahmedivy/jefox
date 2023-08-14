"use client";

import Tree from "react-d3-tree";
import { useState } from "react";
import dynamic from "next/dynamic";

// const Tree = dynamic(() => import("react-d3-tree"), {
//   ssr: false,
// });

function MyTree() {
  const [data, setData] = useState({
    name: "Root",
    children: [],
  });

  return (
    <div className="w-full h-full bg-red-500">
      <Tree data={data} />
    </div>
  );
}

export default MyTree;
