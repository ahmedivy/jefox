"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Image from "next/image";
import Receipt from "./receipt";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";

function ConfirmDeposit({ method, username }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const amount = useSearchParams().get("amount");

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(Array.from(files)); // Update selectedFiles state with the selected files
  };

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (files) => {
      setIsLoading(true);
      const url = files[0].url;

      const body = {
        amount,
        method,
        url,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/${username}/transactions/deposits/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (res.error) {
        toast({
          variant: "destructive",
          desctiption: res.error,
        });
      } else {
        toast({
          desctiption: "Deposit request sent",
        });
        router.push("/deposit/");
      }
      setIsLoading(false);
    },
    onUploadError: (error) => {
      console.log("upload error", error);
      toast({
        variant: "destructive",
        desctiption: "Something bad happened. Please try again later.",
      });
      setIsLoading(false);
    },
  });

  return (
    <div className="w-full md:w-[400px]">
      <Receipt amount={amount} />
      <form className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-full">
          <Label> Upload Screenshot</Label>
          <Input
            type="file"
            accept="image/jpeg, image/png, image/gif"
            onChange={handleFileChange}
          />
        </div>
        {selectedFiles.length > 0 && (
          <div className="flex flex-col gap-2 w-full">
            <Label>Preview</Label>
            <Image
              src={window.URL.createObjectURL(selectedFiles[0])}
              height={400}
              width={400}
              alt="Preview of the image you are about to upload"
            />
          </div>
        )}
        <Button
          className="w-full font-semibold my-4"
          disabled={selectedFiles.length === 0 || isUploading || isLoading}
          onClick={() => {
            startUpload(selectedFiles.slice(0, 1));
          }}
        >
          {isUploading || isLoading ? "Uploading..." : "Confirm Deposit"}
        </Button>
      </form>
    </div>
  );
}

export default ConfirmDeposit;
