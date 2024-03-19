import { useEffect, useState } from "react"

import { useChatContext } from "./useChatContext"
import { baseUrl, getRequest } from "../services/api"
import type { Chat } from "../types"

export const useFetchLatestMessage = (chat:Chat) => {
  const {newMessage, notifications} = useChatContext()
  const [lastMessage, setLatestMessage] = useState<Chat | null >(null)


  useEffect(() => {
    const getMessages = async()=>{
      const resp = await getRequest<Chat[]>(`${baseUrl}/messages/${chat._id}`)

      if(resp.errors){
        return console.log(resp.errors);
        
      }

      const latestMessage = resp?.data?.[resp.data.length - 1]
      setLatestMessage(latestMessage)

    }
    getMessages()
    
  }, [newMessage, notifications])
  
  return {
    lastMessage
  }
}
