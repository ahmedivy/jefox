"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";

function ShareButtons({ username }) {
  const { toast } = useToast();

  return (
    <div className="grid gap-3 grid-cols-1">
      <div className="flex gap-2 lg:w-1/2">
        <Input
          value={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/register?ref=${username}&position=left`}
        />
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/register?ref=${username}&position=left`
            );
            toast({
              description: "Copied link to clipboard",
            });
          }}
          className="flex-shrink-0 w-[100px]"
        >
          Join Left
        </Button>
      </div>
      <div className="flex gap-2 lg:w-1/2">
        <Input
          value={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/register?ref=${username}&position=right`}
        />
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/register?ref=${username}&position=right`
            );
            toast({
              description: "Copied link to clipboard",
            });
          }}
          className="flex-shrink-0 w-[100px]"
        >
          Join Right
        </Button>
      </div>
    </div>
  );
}

export default ShareButtons;
