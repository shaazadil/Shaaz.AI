export type Message = {
  id: string | number;
  role: "user" | "assistant";
  content: string;
};

export type Conversation = {
  id: string | number;
  title: string | null;
  messages: Message[];
  createdAt?: string | number;
  updatedAt?: string | number;
};
