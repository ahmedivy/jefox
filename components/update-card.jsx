"use client";

import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { AiFillCamera } from "react-icons/ai";
import { useUploadThing } from "@/lib/uploadthing";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { Avatar, AvatarImage } from "./ui/avatar";

export function UpdateCard({ user }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [f, setF] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    country: user.country,
    email: user.email,
    phone: user.phone,
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(Array.from(files)); // Update selectedFiles state with the selected files
  };

  const submitUpdate = async (image = null) => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: f.firstname,
          lastname: f.lastname,
          country: f.country,
          image: image,
        }),
      }
    );
    const data = await res.json();
    setIsLoading(false);
    if (data.success) {
      router.refresh();
      toast({
        description: "Account updated successfully",
      });
    } else {
      alert("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFiles.length > 0) {
      setIsLoading(true);
      startUpload(selectedFiles.slice(0, 1));
      return;
    }

    submitUpdate();
  };

  const handleChange = (e) => {
    setF((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (files) => {
      setIsLoading(true);
      const url = files[0].url;
      submitUpdate(url);
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
    <Card className="mx-1 md:mx-0 min-w-full md:min-w-[500px]">
      <CardHeader className="space-y-2 md:space-y-4 flex flex-col items-center my-3">
        <CardTitle className="text-2xl text-center">
          Update your account Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="w-full flex gap-3 items-center pb-4 justify-center mx-auto">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={
                    selectedFiles.length > 0
                      ? URL.createObjectURL(selectedFiles[0])
                      : user.image
                  }
                  alt={user.username}
                />
              </Avatar>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="firstname">First Name *</Label>
              <Input
                id="firstname"
                type="text"
                required
                onChange={handleChange}
                value={f.firstname}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastname">Last Name *</Label>
              <Input
                id="lastname"
                type="text"
                required
                onChange={handleChange}
                value={f.lastname}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                type="text"
                required
                onChange={handleChange}
                value={f.username}
                disabled
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                type="text"
                onChange={handleChange}
                value={f.country}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                onChange={handleChange}
                value={f.email}
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="text"
                required
                onChange={handleChange}
                value={f.phone}
                disabled
              />
            </div>

            <div className="grid gap-2">
              <Label> Change Profile </Label>
              <Input
                type="file"
                accept="image/jpeg, image/png, image/gif"
                onChange={handleFileChange}
              />
            </div>

            <Button
              className="w-full col-span-1 md:col-span-2"
              disabled={isLoading}
              type="submit"
            >
              {isLoading && (
                <ReloadIcon className="animate-spin h-4 w-4 mr-2" />
              )}
              {isLoading ? "Updating Account..." : "Update Account"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default UpdateCard;
