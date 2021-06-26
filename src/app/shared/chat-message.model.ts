export interface ChatMessage {
  id?: any;
  type: "user" | "admin";
  message: string;
}
