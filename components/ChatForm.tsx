import { DOMAttributes, FC, useState } from "react";
import { PaymentModal, PaymentMoney } from "./paymentModal";

type Props = {};

export const ChatForm: FC<Props> = ({}) => {
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMoney, setPaymentMoney] = useState<PaymentMoney>(100);

  const sendMessage = () => {
    console.log("submit");
    console.log(message);
  };

  const sent100yen = () => {
    setIsModalOpen(true);
    setPaymentMoney(100);
  };
  const sent500yen = () => {
    setIsModalOpen(true);
    setPaymentMoney(500);
  };
  const sent1000yen = () => {
    setIsModalOpen(true);
    setPaymentMoney(1000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full py-4 px-4 bg-gray-200 flex flex-col gap-y-3">
        <div className="flex gap-x-2">
          <input
            className="w-full rounded-full px-4 h-12"
            placeholder="コメントをどうぞ！"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className=" w-14 px-2" onClick={sendMessage}>
            送信
          </button>
        </div>
        <div className="grid grid-cols-3 gap-x-2">
          <button onClick={sent100yen} className="bg-blue-300 rounded-full p-2">
            100円
          </button>
          <button
            onClick={sent500yen}
            className=" bg-green-300 rounded-full p-2"
          >
            500円
          </button>
          <button onClick={sent1000yen} className="bg-red-300 rounded-full p-2">
            1000円
          </button>
        </div>
      </div>
      {isModalOpen && (
        <PaymentModal closeModal={closeModal} paymentMoney={paymentMoney} />
      )}
    </>
  );
};
