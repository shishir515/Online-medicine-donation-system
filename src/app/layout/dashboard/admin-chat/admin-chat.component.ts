import { Component, OnInit } from "@angular/core";
import { ChatMessage } from "src/app/shared/chat-message.model";
import { ChatService } from "src/app/shared/chat.service";

interface Chat {
  id: string;
  email: string;
  chat: ChatMessage[];
}

@Component({
  selector: "app-admin-chat",
  templateUrl: "./admin-chat.component.html",
  styleUrls: ["./admin-chat.component.css"],
})
export class AdminChatComponent implements OnInit {
  chats: Chat[];
  selectedChat: Chat;

  constructor(private cs: ChatService) {}

  ngOnInit(): void {
    this.cs.getAllChat().subscribe((actionArray) => {
      this.chats = actionArray.map((item) => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as Object),
        } as Chat;
      });
      if (this.chats.length > 0 && !this.selectedChat) {
        this.selectedChat = this.chats[0];
      }
      console.log(this.chats);
    });
  }

  setSelectedChat(item: Chat) {
    this.selectedChat = item;
  }
}
