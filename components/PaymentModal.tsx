"use client";

import { FC } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { TARGET_COLLECTION_NAME, firebaseApp } from "@/lib/firebase";

const paymentUrl = {
  100: "https://qr.paypay.ne.jp/p2p01_9VVLh43atuldimMO",
  500: "https://qr.paypay.ne.jp/p2p01_mQmvxsybkAIOr9zG",
  1000: "https://qr.paypay.ne.jp/p2p01_X7Fw8Unz8i31aTKF",
};

export type PaymentMoney = 100 | 500 | 1000;

type Props = {
  closeModal: () => void;
  paymentMoney: PaymentMoney;
  name: string;
};

export const PaymentModal: FC<Props> = ({
  closeModal,
  paymentMoney,
  name = "noName",
}) => {
  const transitPaypay = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const col = collection(db, TARGET_COLLECTION_NAME);
      await addDoc(col, {
        liveId: process.env.NEXT_PUBLIC_STREAM_CALL_ID,
        isAdmin: false,
        name: "運営",
        text: `${name}様から${paymentMoney}円いただきました！ありがとうございます！`,
        paymentMoney: paymentMoney,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
    const paypayUrl = paymentUrl[paymentMoney];
    window.open(paypayUrl, "_blank");
    closeModal();
  };

  return (
    <div className="bg-gray-500/50 fixed top-0 left-0 w-full h-full flex justify-center items-center px-4">
      <div className="bg-white w-full py-6 px-4 rounded">
        <p className="text-red-400 text-lg">
          本番環境で検証できてないので動かないかも！あと、これって副業になるのかとか確定申告とか必要なのかっていう一抹の不安があります、、
        </p>
        <p className="mt-2">
          paypayの画面に遷移します!
          <br />
          paypayの指示に従って操作を行うと{paymentMoney}
          円が支払われます!
        </p>
        <details className="mt-2">
          <summary>法律について</summary>
          <p>
            贈与なので年110万円以下なら税金も発生しないし副業にもあたらないと思ってます、、🤔
          </p>
        </details>
        <div className="grid grid-cols-2 gap-x-2 mt-4">
          <button onClick={closeModal} className="bg-gray-400 p-3 rounded-full">
            キャンセル
          </button>
          <button
            onClick={transitPaypay}
            className=" bg-red-300 p-3 rounded-full"
          >
            決定
          </button>
        </div>
      </div>
    </div>
  );
};
