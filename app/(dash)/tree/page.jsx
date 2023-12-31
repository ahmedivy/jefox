"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useCenteredTree } from "@/lib/hooks/useCenteredTree";
import { useSession } from "next-auth/react";

const Tree = dynamic(() => import("react-d3-tree"), {
  ssr: false,
});

function Page() {
  const [data, setData] = useState(null);
  const [translate, containerRef] = useCenteredTree();
  const { toast } = useToast();
  const { data: session } = useSession();

  const username = session?.user?.username;

  async function fetchData(username) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/${username}/tree`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data;
  }

  useEffect(() => {
    fetchData(username).then((data) => setData(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Tip",
        description:
          "You can click on the nodes to expand/collapse them, drag them or zoom in/out.",
      });
    }, 5000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomNodeShape = ({ nodeDatum, toggleNode }) => {
    const imageWidth = 100; // Adjust as needed
    const imageHeight = 100; // Adjust as needed
    const nodeSize = 100; // Adjust node size as needed

    return (
      <g onClick={toggleNode}>
        <circle r={nodeSize / 2} fill="black" />
        <image
          x={-imageWidth / 2}
          y={-imageHeight / 2}
          width={imageWidth}
          height={imageHeight}
          xlinkHref={nodeDatum.image}
          clipPath={`circle(${nodeSize / 2}px at center)`}
        />
        <foreignObject
          width={nodeSize}
          height={nodeSize}
          x={-nodeSize / 2}
          y={-nodeSize / 2}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "white",
              fontSize: 15,
              textShadow: "0 1px 0 rgba(0, 0, 0, 0.4)",
            }}
          >
            <p>{`${nodeDatum.name}`}</p>
            <p>{nodeDatum.position ? `[${nodeDatum.position}]` : ""}</p>
          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <>
      {data ? (
        <div
          className="w-screen md:w-full bg-white h-screen md:h-full"
          ref={containerRef}
        >
          <Tree
            data={data}
            translate={translate}
            nodeSize={{ x: 200, y: 200 }}
            orientation="vertical"
            pathFunc={"diagonal"}
            nodeSvgShape={{ shape: "none" }}
            renderCustomNodeElement={(rd3tProps) =>
              getCustomNodeShape(rd3tProps)
            }
            collapsible
            shouldCollapseNeighborNodes
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full ">
          <p className="text-2xl font-bold">
            Loading tree...
          </p>
        </div>
      )
    }
    </>
  );
}

export default Page;
