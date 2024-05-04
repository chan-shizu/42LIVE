import { FC } from "react";

const paymentUrl = {
  100: "https://qr.paypay.ne.jp/p2p01_9VVLh43atuldimMO",
  500: "https://qr.paypay.ne.jp/p2p01_mQmvxsybkAIOr9zG",
  1000: "https://qr.paypay.ne.jp/p2p01_X7Fw8Unz8i31aTKF",
};

export type PaymentMoney = 100 | 500 | 1000;

type Props = {
  closeModal: () => void;
  paymentMoney: PaymentMoney;
};

export const PaymentModal: FC<Props> = ({ closeModal, paymentMoney }) => {
  const transitPaypay = () => {
    const paypayUrl = paymentUrl[paymentMoney];
    window.location.href = paypayUrl;
  };

  return (
    <div className="bg-gray-500/50 fixed top-0 eft-0 w-full h-full flex justify-center items-center px-4">
      <div className="bg-white w-full py-6 px-4 rounded">
        <p>
          paypayの画面に遷移します!
          <br />
          paypayの指示に従って操作を行うと{paymentMoney}
          円が支払われます!
        </p>
        <details className="mt-2">
          <summary>法律について</summary>
          <p>
            贈与なので年110万円以下なら税金も発生しないし副業にもあたらないと認識しているのですが、こちらの認識に間違いありましたらご指摘いただけるとありがたいです
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
