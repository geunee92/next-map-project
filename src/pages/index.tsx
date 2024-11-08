import { useState } from "react";
import Map from "../components/Map";
import Markers from "../components/Markers";
import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";
import axios from "axios";

export default function Home({
  storeDataList,
}: {
  storeDataList: StoreType[];
}) {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);

  return (
    <>
      <Map setMap={setMap} />;
      <Markers
        storeDataList={storeDataList}
        map={map}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox storeDataList={currentStore} setStore={setCurrentStore} />
    </>
  );
}

export async function getStaticProps() {
  const storeDataList = await axios(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  );

  return {
    props: { storeDataList: storeDataList.data },
    revalidate: 60 * 60,
  };
}
