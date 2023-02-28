// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Bot } from "grammy";
import { ChatInviteLink } from 'grammy/out/types';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ChatInviteLink>
) {
    const { id } = req.query
    // telegram accepts only string or number as input
    // else return 400 error as the input is incorrect
    if (typeof id === "string" || typeof id === "number") {
        try {
            // try to create a chat invite link
            // if it fails i.e. the group doesn't exist
            // return 404
            const bot = new Bot(String(process.env.TOKEN))
            const invite = await bot.api.createChatInviteLink(id, { member_limit: 1 })
            res.status(200).json(invite)
        } catch (e) {
            res.status(404).end()
        }
    }
    res.status(400).end()
}
