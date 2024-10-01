import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from 'zod';
import Image from "@/database/models/image";
import { ConnectToDatabase } from "@/database/db";
import sharp from 'sharp';

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .input(z.object({ configId: z.string().optional() }))
        .middleware(async ({ input }) => {

            return { input };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const { configId } = metadata.input;
            console.log({ 'uploadthing-url': file.url })

            const res = await fetch(file.url);

            const buffer = await res.arrayBuffer();
            const ImgMetaData = await sharp(buffer).metadata();

            const { width, height } = ImgMetaData;
            if (!configId) {
                await ConnectToDatabase();

                const createImage = await Image.create({
                    imageUrl: file.url,
                    width: width || 500,
                    height: height || 500
                })

                return { configId: createImage._id };
            }
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
