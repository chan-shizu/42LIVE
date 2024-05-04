"use client";

import { FC, useState } from "react";

type Props = {
  updateName: (name: string) => void;
};

export const NameModal: FC<Props> = ({ updateName }) => {
  const [tempName, setTempName] = useState("");
  const [error, setError] = useState("");

  const decideName = () => {
    if (tempName === "") {
      setError("名前を入力してください！出来たら僕が誰だか分かる名前で！");
      return;
    }

    updateName(tempName);
  };

  return (
    <div className="bg-gray-500/50 fixed top-0 left-0 w-full h-screen flex justify-center items-center p-6">
      <div className="bg-white w-ful py-6 px-4 rounded">
        <div>
          <p>コメントに表示される名前を設定してください</p>
          <p>
            一度設定した名前は変更できないので注意してください(変更したいときは画面をリロードしてください)
          </p>
        </div>
        {error !== "" && <p className="text-red-500 mt-4">{error}</p>}
        <input
          className="w-full bg-gray-100 h-12 rounded-md mt-6 px-4"
          placeholder="名前を入力してください"
          onChange={(e) => setTempName(e.target.value)}
        />
        <button
          onClick={decideName}
          className="w-full h-14 rounded-full bg-red-300 mt-6"
        >
          決定
        </button>
      </div>
    </div>
  );
};
