import { useRouter } from "next/router"
import useSWR, { Fetcher } from 'swr'

interface Chat {
    title: string
    description: string | undefined
    photo_path: string | undefined
}

const getChatById : Fetcher<Chat, string> = (id) => fetch(`/api/chats/${id}`).then((res) => res.json())

export default function Chat() {

    const { query: { id } } = useRouter()
    const { data, error , isLoading } = useSWR(id, getChatById)

    if (isLoading) {
        return <p>Pending</p>
    }

    if (error) {
        return <p>{JSON.stringify(error)}</p>
    }

    return (
        <div>
            { data?.photo_path ? <object data={`/api/files/${data?.photo_path}`} width={250} height={250} /> : <p>no image</p> }
            <h2>{data?.title}</h2>
            <p>{data?.description}</p>
        </div>
    )
}