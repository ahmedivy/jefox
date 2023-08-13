"use client";
import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";

const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};

export default function OrgChartTree() {
  const treeContainer = useRef(null);

  useEffect(() => {
    const dimensions = treeContainer.current.getBoundingClientRect();
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    const newTranslate = {
      x: centerX,
      y: centerY,
    };

    treeContainer.current.scrollIntoView({ behavior: "smooth" });

    setTreeProps({
      dimensions: {
        height: dimensions.height,
        width: dimensions.width,
      },
      translate: newTranslate,
    });
  }, []);

  const [treeProps, setTreeProps] = useState({
    data: orgChart,
    translate: { x: 0, y: 0 },
    orientation: "vertical",
  });

  return (
    <div ref={treeContainer} className="w-full min-h-screen">
      <Tree {...treeProps} />
    </div>
  );
}