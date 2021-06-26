import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ChatMessage } from "src/app/shared/chat-message.model";
import { ChatService } from "src/app/shared/chat.service";
@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit {
  @Input("mode") mode: "user" | "admin" = "user";
  @Input("userId") userId: string;
  @Input("email") email: string;
  @ViewChild("scrollMe") private myScrollContainer: ElementRef;

  messages: ChatMessage[] = [];
  constructor(
    private toastr: ToastrService,
    private firestore: AngularFirestore,
    private cs: ChatService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe((res) => {
      if (!this.userId) {
        this.userId = res.uid;
      }
      if (!this.email) {
        this.email = res.email;
      }

      this.cs.getChat(this.userId).subscribe((actionArray) => {
        this.messages = actionArray.payload.data()["messages"];
      });
    });
  }

  ngOnChanges() {
    this.cs.getChat(this.userId).subscribe((actionArray) => {
      this.messages = actionArray.payload.data()["messages"];
    });
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  async sendMessage(f: NgForm) {
    try {
      this.messages.push({ message: f.value.message, type: this.mode });
      f.resetForm();
      await this.firestore
        .doc("chats/" + this.userId)
        .update({ messages: this.messages, email: this.email });
      this.scrollToBottom();
    } catch (e) {
      await this.firestore
        .collection("chats")
        .doc(this.userId)
        .set({ messages: this.messages, email: this.email });
      console.log(e);
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
