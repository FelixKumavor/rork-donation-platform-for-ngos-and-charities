import { useState } from "react";

export type MessageType = "text" | "photo" | "video";

export interface ThankYouMessage {
  id: string;
  donorId: string;
  messageType: MessageType;
  contentUrl?: string;
  textContent?: string;
  senderName: string;
  senderRole: string;
  createdAt: string;
  isRead: boolean;
}

export interface DonorReply {
  id: string;
  messageId: string;
  donorId: string;
  content: string;
  createdAt: string;
}

export function useThankYouMessages(donorId: string) {
  const [messages] = useState<ThankYouMessage[]>([
    {
      id: "msg-1",
      donorId: "user-1",
      messageType: "text",
      textContent: "Thank you so much for your generous donation! Your support helps us provide nutritious meals and quality education to 25 children at our orphanage. The smiles on their faces are priceless!",
      senderName: "Mary Amoah",
      senderRole: "Director",
      createdAt: "2024-12-16",
      isRead: true,
    },
    {
      id: "msg-2",
      donorId: "user-1",
      messageType: "photo",
      contentUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
      textContent: "Here are the children enjoying the healthy meals your donation helped provide!",
      senderName: "Grace Mensah",
      senderRole: "Care Coordinator",
      createdAt: "2024-12-14",
      isRead: true,
    },
    {
      id: "msg-3",
      donorId: "user-1",
      messageType: "video",
      contentUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      textContent: "A special thank you message from our children!",
      senderName: "Emmanuel Osei",
      senderRole: "Program Manager",
      createdAt: "2024-12-10",
      isRead: false,
    },
    {
      id: "msg-4",
      donorId: "user-1",
      messageType: "text",
      textContent: "Your December donation has been received! With your help, we've been able to purchase new school books and supplies for the upcoming semester. The children are so excited to learn!",
      senderName: "Sarah Boateng",
      senderRole: "Education Coordinator",
      createdAt: "2024-12-05",
      isRead: true,
    },
    {
      id: "msg-5",
      donorId: "user-1",
      messageType: "photo",
      contentUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop",
      textContent: "The children in their new school uniforms, thanks to your support!",
      senderName: "Mary Amoah",
      senderRole: "Director",
      createdAt: "2024-11-28",
      isRead: true,
    },
  ]);

  const [replies] = useState<DonorReply[]>([
    {
      id: "reply-1",
      messageId: "msg-1",
      donorId: "user-1",
      content: "I'm so happy to help! Keep up the great work!",
      createdAt: "2024-12-16",
    },
  ]);

  const unreadCount = messages.filter(msg => !msg.isRead && msg.donorId === donorId).length;

  const addReply = (messageId: string, content: string) => {
    console.log("Adding reply to message:", messageId, content);
  };

  const markAsRead = (messageId: string) => {
    console.log("Marking message as read:", messageId);
  };

  return {
    messages: messages.filter(msg => msg.donorId === donorId),
    replies,
    unreadCount,
    addReply,
    markAsRead,
  };
}
