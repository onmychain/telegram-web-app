import useAxios from "axios-hooks"

interface InviteLinkProps {
    id: string | string[] | undefined
}

export default function InviteLink({ id }: InviteLinkProps) {

    const [{ data }] = useAxios(`/api/chats/${id}/invite`)

    return (
        <a href={data?.invite_link}>Join the group</a>
    )

}

// import { ChatInviteLink } from "grammy/out/types.node"
// import useSWR, { Fetcher } from 'swr'

// interface InviteLinkProps {
//     id: string | string[] | undefined
// }

// const getInvite : Fetcher<ChatInviteLink, string> = (id) => fetch(`/api/chats/${id}/invite`).then((res) => res.json())

// export default function InviteLink({ id }: InviteLinkProps) {

//     const { data } = useSWR(id, getInvite)

//     return (
//         <a href={data?.invite_link}>Join the group</a>
//     )

// }