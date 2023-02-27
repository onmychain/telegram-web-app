// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Bot } from "grammy";
import { Chat } from 'grammy/out/types';

interface Data {
    title: string
    description: string | undefined
    photo_path: string | undefined
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id } = req.query
    // telegram accepts only string or number as input
    // else return 400 error as the input is incorrect
    if (typeof id === "string" || typeof id === "number") {
        try {
            // try to get the info about the chat id
            // if it fails i.e. the group doesn't exist
            // return 404
            const bot = new Bot(String(process.env.TOKEN))
            const { title, description, photo }= await bot.api.getChat(id) as Chat.SupergroupGetChat

            // prepare our response
            let data: Data = { title, description, photo_path: undefined }

            if (photo){
                // if there is a photo, get the file path
                const file = await bot.api.getFile(photo.big_file_id)
                data = { ...data, photo_path: file.file_path }
            }
            // return the title, description, and photo data
            res.status(200).json(data)
        } catch (e) {
            res.status(404).end()
        }
    }
    res.status(400).end()
}
