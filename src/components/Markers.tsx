import { StoreType } from "@/interface";
import React, { useCallback, useEffect } from "react";

interface MakerProps {
  map: any;
  storeDataList: any;
  setCurrentStore: (value: any) => void;
}
function Markers({ map, storeDataList, setCurrentStore }: MakerProps) {
  const loadKakaoMakers = useCallback(() => {
    if (map) {
      // 식당 데이터 마커
      storeDataList?.map((store) => {
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

        // 마커 커서가 오버되었을 때 마커 위에 표시할 인포윈도우 생성
        const content = `<div class="infowindow">${store?.upso_nm}</div>`;

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          customOverlay.setMap(map);
        });

        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          customOverlay.setMap(null);
        });

        // 선택한 가게 저장
        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentStore(store);
        });
      });
    }
  }, [map, setCurrentStore, storeDataList]);

  useEffect(() => {
    loadKakaoMakers();
  }, [loadKakaoMakers, map, setCurrentStore, storeDataList]);

  return <></>;
}

export default Markers;
