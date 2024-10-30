/*global kakao*/
import Script from "next/script";
import stores from "@/data/store_data.json";

// 카카오 맵에서 타입을 따로 설정하지 않기 때문에 any를 사용
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

function Map() {
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // 식당 데이터 마커
      stores?.["DATA"]?.map((store) => {
        const imageSrc = store?.bizcnd_code_nm
          ? `/images/markers/${store?.bizcnd_code_nm}.png`
          : "/images/markers/default.png";

        const imageSize = new window.kakao.maps.Size(40, 40);

        const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        const markerPosition = new window.kakao.maps.LatLng(
          store?.y_dnts,
          store?.x_cnts
        );

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);
      });
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
