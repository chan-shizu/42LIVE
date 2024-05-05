"use client";

import {
  useCall,
  useCallStateHooks,
  ParticipantView,
} from "@stream-io/video-react-sdk";

// add styles for the video UI
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useEffect } from "react";

export const MyLivestreamUI = () => {
  const call = useCall();
  const {
    useIsCallLive,
    useLocalParticipant,
    useParticipantCount,
    useMicrophoneState,
  } = useCallStateHooks();
  const totalParticipants = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const isCallLive = useIsCallLive();
  let microphoneUsed = undefined;
  if (useMicrophoneState) {
    const { microphone } = useMicrophoneState();
    microphoneUsed = microphone;
  }

  useEffect(() => {
    if (microphoneUsed) {
      microphoneUsed.enable();
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex gap-x-2">
        <p className=" bg-blue-700 text-white rounded-lg px-1 py-2 w-40 text-center">
          Live: {totalParticipants}
        </p>
      </div>
      <div className="flex-1">
        {localParticipant && (
          <ParticipantView
            participant={localParticipant}
            // disables the extra UI elements as such:
            // name, audio, video indicator, etc...
            ParticipantViewUI={null}
          />
        )}
      </div>
      <div className=" self-center">
        {isCallLive ? (
          <button onClick={() => call?.stopLive()}>Stop Livestream</button>
        ) : (
          <button onClick={() => call?.goLive()}>Start Livestream</button>
        )}
      </div>
    </div>
  );
};
