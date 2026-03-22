import { generateReactHelpers } from '@uploadthing/react';
import type { OurFileRouter } from './router';

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
