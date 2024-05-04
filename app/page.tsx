"use client";

import { ChatForm } from "@/components/ChatForm";
import { ChatList } from "@/components/ChatList";
import {
  LivestreamLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  User,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const token = process.env.NEXT_PUBLIC_STREAM_TOKEN as string;
const userId = process.env.NEXT_PUBLIC_STREAM_USER_ID as string;
const callId = process.env.NEXT_PUBLIC_STREAM_CALL_ID as string;

// set up the user object
const user: User = {
  id: userId,
  name: "Oliver-Viewer",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver-Viewer",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("livestream", callId);

// make sure the viewer doesn't accidentally publish audio or video
call.camera.disable();
call.microphone.disable();

call.join();

export default function Home() {
  return (
    <main className="w-fill">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <StreamTheme as="main" className="[&_video]:w-full">
            <LivestreamLayout
              showParticipantCount={true}
              showDuration={true}
              showLiveBadge={true}
            />
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
      <div className="mt-4">
        <ChatList />
      </div>
      <div className="fixed bottom-0 w-full">
        <ChatForm />
      </div>
    </main>
  );
}
