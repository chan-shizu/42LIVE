"use client";

import { FC, useEffect } from "react";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
  useCall,
} from "@stream-io/video-react-sdk";
import { MyLivestreamUI } from "@/components/MyLivestreamUI";
import { ChatList } from "@/components/ChatList";
import { ChatForm } from "@/components/ChatForm";

type Props = {};

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const token = process.env.NEXT_PUBLIC_STREAM_TOKEN as string;
const userId = process.env.NEXT_PUBLIC_STREAM_USER_ID as string;
const callId = process.env.NEXT_PUBLIC_STREAM_CALL_ID as string;

// set up the user object
const user: User = {
  id: userId,
  name: "KoichiroShizuya",
  image: "/public/wait.png",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("livestream", callId);
call.join({ create: true });

const Page: FC<Props> = ({}) => {
  return (
    <div className="">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyLivestreamUI />
        </StreamCall>
      </StreamVideo>
      <div className="mt-4 mb-[132px]">
        <ChatList />
      </div>
      <div className="fixed bottom-0 w-full">
        <ChatForm name={"運営"} isAdmin={true} />
      </div>
    </div>
  );
};

export default Page;
