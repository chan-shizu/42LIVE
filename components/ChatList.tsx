import { FC } from "react";

type Props = {};

const chats = [
  { text: "はじめてのコメントです", time: "2024/04/04 10:24:15", name: "田中" },
  { text: "はじめてのコメントです", time: "2024/04/04 10:24:15", name: "田中" },
  { text: "はじめてのコメントです", time: "2024/04/04 10:24:15", name: "田中" },
];

export const ChatList: FC<Props> = ({}) => {
  return (
    <div className="flex flex-col gap-y-4">
      {chats.map((chat) => (
        <div className="flex flex-col gap-y-1 px-2">
          <div className="flex gap-x-2 text-gray-500 text-xs">
            <p>{chat.name}</p>
            <p>{chat.time}</p>
          </div>
          <p>{chat.text}</p>
        </div>
      ))}
    </div>
  );
};
