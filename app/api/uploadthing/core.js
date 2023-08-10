import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // // This code runs on your server before upload
      // const session = await getServerSession(authOptions);
      // // If you throw, the user will not be able to upload
      // if (!session) throw new Error("Unauthorized");
      // // Whatever is returned here is accessible in onUploadComplete as `metadata`
      // return { user: session.user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete for user:", metadata.user.username);
      // console.log("file url", file.url);
      //
    }),
};
