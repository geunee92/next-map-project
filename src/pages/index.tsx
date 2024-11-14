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
  return (
    <>
      <Map />

      <Markers storeDataList={storeDataList} />

      <StoreBox />
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
