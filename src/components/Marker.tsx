import { mapState } from "@/atom";
import { StoreType } from "@/interface";
import { useEffect, useCallback } from "react";
import { useAtomValue } from "jotai";

interface MarkerProps {
  store: StoreType;
}

export default function Marker({ store }: MarkerProps) {
  const map = useAtomValue(mapState);

  const loadKakoMarker = useCallback(() => {
    if (map && store) {
      // 현재 선택한 식당 데이터 마커를 띄운다
      const imageSrc = store?.category
          ? `/images/markers/${store?.category}.png`
          : "/images/markers/default.png",
        imageSize = new window.kakao.maps.Size(40, 40),
        imageOption = { offset: new window.kakao.maps.Point(27, 69) };

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      // 마커가 표시될 위치
      const markerPosition = new window.kakao.maps.LatLng(
        store?.lat,
        store?.lng
      );

      // 마커를 생성
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      // 마커가 지도 위에 표시
      marker.setMap(map);

      // 마커 커서가 오버되었을 때 마커 위에 표시할 인포윈도우 생성
      const content = `<div class="infowindow">${store?.name}</div>`;

      // 커스텀 오버레이를 생성
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        xAnchor: 0.6,
        yAnchor: 0.91,
      });

      // 마커에 마우스오버 이벤트를 등록
      window.kakao.maps.event.addListener(marker, "mouseover", function () {
        // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커위에 표시
        customOverlay.setMap(map);
      });

      // 마커에 마우스아웃 이벤트를 등록
      window.kakao.maps.event.addListener(marker, "mouseout", function () {
        // 마커에 마우스아웃 이벤트가 발생하면 커스텀 오버레이를 제거
        customOverlay.setMap(null);
      });
    }
  }, [map, store]);

  useEffect(() => {
    loadKakoMarker();
  }, [loadKakoMarker, map]);
  return <></>;
}
