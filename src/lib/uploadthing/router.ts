import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  toolImages: f({
    image: {
      maxFileCount: 5,
      maxFileSize: '4MB',
    },
  }).onUploadComplete(({ file }) => {
    console.log('Upload complete:', file);
    return { url: file.url };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
