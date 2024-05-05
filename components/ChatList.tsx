"use client";

import { TARGET_COLLECTION_NAME, db } from "@/lib/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FC, useEffect, useRef, useState } from "react";

type Props = {};

type Chat = {
  liveId: string;
  text: string;
  name: string;
  isAdmin: boolean;
  paymentMoney?: number;
  createdAt: { nanoseconds: number; seconds: number };
};

const yyyymmdd = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export const ChatList: FC<Props> = ({}) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let data;
    let collectionMessages: Chat[] = [];
    onSnapshot(
      query(
        collection(db, TARGET_COLLECTION_NAME),
        where("liveId", "==", process.env.NEXT_PUBLIC_STREAM_CALL_ID)
      ),
      (snapshot) => {
        collectionMessages = [];
        snapshot.forEach((doc) => {
          data = doc.data() as Chat;
          collectionMessages.push(data);
        });
        const sortedMessages = collectionMessages.sort(function (a, b) {
          return a.createdAt.seconds - b.createdAt.seconds;
        });
        setChats(sortedMessages);
      }
    );
  }, []);

  if (scrollBottomRef && scrollBottomRef.current) {
    scrollBottomRef.current.scrollIntoView();
  }

  return (
    <div className="flex flex-col gap-y-4 overflow-auto">
      {chats.map((chat) => {
        const date = yyyymmdd.format(new Date(chat.createdAt.seconds * 1000));
        return (
          <div
            key={chat.createdAt.seconds}
            className={`flex flex-col gap-y-1 px-2 ${
              chat.isAdmin && "bg-gray-200"
            } ${chat.paymentMoney === 100 && "bg-blue-200"}  ${
              chat.paymentMoney === 500 && "bg-green-200"
            }  ${chat.paymentMoney === 1000 && "bg-red-200"}`}
          >
            <div className="flex gap-x-2 text-gray-500 text-xs">
              <p>{chat.name}</p>
              <p>{date}</p>
            </div>
            <p>{chat.text}</p>
          </div>
        );
      })}
      <div ref={scrollBottomRef}></div>
    </div>
  );
};
