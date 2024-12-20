import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from 'zod';
import { ConnectToDatabase } from "@/database/db";
import sharp from 'sharp';
import Case from "@/database/models/case";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 2 } })
        .input(z.object({
            configId: z.string().optional(),
            color: z.string().optional(),
            model: z.string().optional(),
            material: z.string().optional(),
            finish: z.string().optional(),
            casePrice: z.number().optional()
        }))
        .middleware(async ({ input }) => {

            return { input };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const { configId, color, model, material, finish, casePrice } = metadata.input;
            // console.log({ 'uploadthing-url': file.url })
            // const [image1, image2] = file;
            const res = await fetch(file.url);
            console.log({ file })

            const buffer = await res.arrayBuffer();
            const ImgMetaData = await sharp(buffer).metadata();

            const { width, height } = ImgMetaData;
            if (!configId) {
                await ConnectToDatabase();

                const createImage = await Case.create({
                    imageUrl: file.url,
                    width: width || 500,
                    height: height || 500
                })

                return { configId: createImage._id };
            } else {
                console.log({ configId, color, model, material, finish, casePrice })
                await ConnectToDatabase();

                const isPreview = file.name === 'preview.png'
                console.log({ name: file.name, isPreview })
                if (isPreview) {
                    const updatedImage = await Case.findByIdAndUpdate(configId, {
                        preview_image: file.url,

                    });

                    console.log({ case: updatedImage })
                    return { configId: updatedImage._id };
                } else {
                    const updatedImage = await Case.findByIdAndUpdate(configId, {
                        configured_image: file.url,
                        configured_image_width: width,
                        configured_image_height: height,
                        color,
                        model,
                        material,
                        finish,
                        casePrice
                    });
                    console.log({ case: updatedImage })
                    return { configId: updatedImage._id };
                }



            }
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
