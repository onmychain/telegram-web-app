// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Bot } from "grammy";
import { Chat, ChatPhoto } from 'grammy/out/types';

interface Data {
    title: string
    description: string | undefined
    photo: ChatPhoto | undefined
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
            res.status(200).json({
                title,
                description,
                photo
            })
        } catch (e) {
            res.status(404).end()
        }
    }
    res.status(400).end()
}
