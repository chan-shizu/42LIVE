import {
  useCall,
  useCallStateHooks,
  ParticipantView,
} from "@stream-io/video-react-sdk";

// add styles for the video UI
import "@stream-io/video-react-sdk/dist/css/styles.css";

export const MyLivestreamUI = () => {
  const call = useCall();
  const {
    useIsCallLive,
    useLocalParticipant,
    useParticipantCount,
    // ... more hooks
  } = useCallStateHooks();
  const totalParticipants = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const isCallLive = useIsCallLive();

  return (
    <div className="flex flex-col gap-1">
      <div className=" bg-blue-700 text-white rounded-lg px-1 py-2 w-40">
        Live: {totalParticipants}
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