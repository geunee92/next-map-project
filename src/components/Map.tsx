/*global kakao*/
import Script from "next/script";
import { Dispatch, SetStateAction } from "react";

// 카카오 맵에서 타입을 따로 설정하지 않기 때문에 any를 사용
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}
interface MapProps {
  setMap: Dispatch<SetStateAction<any>>;
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

const DEFAULT_ZOOM = 3;

function Map({ setMap, lat, lng, zoom }: MapProps) {
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        // 경도와 위도가 있다면 위치를 설정 없다면 기본 값을 설정
        center: new window.kakao.maps.LatLng(
          lat ?? DEFAULT_LAT,
          lng ?? DEFAULT_LNG
        ),
        level: zoom ?? DEFAULT_ZOOM,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        onReady={loadKakaoMap}
        // 스크립트의 로딩이 끝나기 전에 v3의 객체에 접근하려고 하면 에러가 발생하기 때문에 로딩이 끝나는 시점에 콜백을 통해 객체에 접근할 수 있도록 해 준다 autoload=false를 사용.
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
      />

      <div id="map" className="w-full h-screen"></div>
    </>
  );
}

export default Map;
