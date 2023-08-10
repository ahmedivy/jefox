"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState([]); // Initialize state for selected files

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(Array.from(files)); // Update selectedFiles state with the selected files
  };

  const { startUpload, isUploading } = useUploadThing(
    // `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/uploadthing`,
    "imageUploader",
    {
      onClientUploadComplete: (files) => {
        console.log("client upload complete", files);
      },
      onUploadError: (error) => {
        console.log("upload error", error);
      },
    }
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Input type="file" onChange={handleFileChange} />
      <p>
        {selectedFiles.length > 0
          ? `Selected files: ${selectedFiles[0].name}`
          : "No files selected"}
      </p>
      <p></p>
      <Button onClick={() => startUpload(selectedFiles)} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </Button>
    </main>
  );
}
