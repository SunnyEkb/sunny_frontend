export const CHAT_API_URL =
  import.meta.env.VITE_CHAT_API_URL ?? "https://sunnyekb.ru";

export interface ChatMessageDto {
  id: string;
  sender_id: string;
  recipient_id: string;
  text: string;
  date: string;
  status:
    | "sent"
    | "read"
    | "error"
    | "declined"
    | "confirmed"
    | "refined"
    | "initial";
  template?: string;
}

export interface ChatDto {
  id: string;
  ad_id: string;
  sender_id: string;
  recipient_id: string;
  status: "delivered" | "received" | "confirmed" | "declined";
  messages: ChatMessageDto[];
}

async function chatRequest<T>(path: string, token: string): Promise<T> {
  const response = await fetch(`${CHAT_API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Не удалось загрузить чаты: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const getUserChats = (token: string) =>
  chatRequest<ChatDto[]>("/chats", token);

export const getChat = (chatId: string, token: string) =>
  chatRequest<ChatDto>(`/chat/${chatId}`, token);
