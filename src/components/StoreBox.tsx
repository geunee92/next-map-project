import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import {
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineCheck,
  AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import { StoreType } from "@/interface";
import { useRouter } from "next/router";

interface StoreBoxProps {
  storeDataList: StoreType | null;
  setStore: Dispatch<SetStateAction<any>>;
}

function StoreBox({ storeDataList, setStore }: StoreBoxProps) {
  const router = useRouter();

  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
      {storeDataList && (
        <>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src={
                    storeDataList?.category
                      ? `/images/markers/${storeDataList?.category}.png`
                      : "/images/markers/default.png"
                  }
                  width={40}
                  height={40}
                  alt="아이콘 이미지"
                />
                <div>
                  <div className="font-semibold">{storeDataList?.name}</div>
                  <div className="text-sm">{storeDataList?.storeType}</div>
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <AiOutlineClose />
              </button>
            </div>
            <div className="mt-4 flex gap-2 items-center">
              <HiOutlineMapPin />
              {storeDataList?.address}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlinePhone />
              {storeDataList?.phone}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineInfoCircle />
              {storeDataList?.storeType}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineCheck />
              {storeDataList?.category}
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push(`/stores/${storeDataList.id}`)}
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const storeDataList = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((res) => res.json());

  return {
    props: { storeDataList },
  };
}

export default StoreBox;
