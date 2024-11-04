import { useState } from "react";
import Map from "../components/Map";
import Markers from "../components/Markers";
import storeData from "@/data/store_data.json";
import StoreBox from "@/components/StoreBox";

export default function Home() {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);

  const storeDataList = storeData["DATA"];

  return (
    <>
      <Map setMap={setMap} />;
      <Markers
        storeDataList={storeDataList}
        map={map}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}
