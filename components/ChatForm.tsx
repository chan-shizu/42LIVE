"use client";

import { FC, useState } from "react";
import { PaymentModal, PaymentMoney } from "./paymentModal";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { TARGET_COLLECTION_NAME, firebaseApp } from "@/lib/firebase";

type Props = {};

export const ChatForm: FC<Props> = ({}) => {
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMoney, setPaymentMoney] = useState<PaymentMoney>(100);

  const sendMessage = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const col = collection(db, TARGET_COLLECTION_NAME);
      await addDoc(col, {
        liveId: process.env.NEXT_PUBLIC_STREAM_CALL_ID,
        name: "currentUser",
        text: message,
        createdAt: new Date(),
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
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
