import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  constructor(private firestore: AngularFirestore) {}

  getChat(uid: string) {
    return this.firestore.collection("chats").doc(uid).snapshotChanges();
  }
  getAllChat() {
    return this.firestore.collection("chats").snapshotChanges();
  }
}
