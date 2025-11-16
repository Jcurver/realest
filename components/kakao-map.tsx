"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  center?: { lat: number; lng: number };
  level?: number;
  className?: string;
}

export function KakaoMap({
  center = { lat: 37.5665, lng: 126.978 }, // 서울시청
  level = 3,
  className = "w-full h-[600px]",
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
    console.log("KAKAO MAP KEY:", apiKey);

    if (!apiKey) {
      console.error("NEXT_PUBLIC_KAKAO_MAP_API_KEY 환경 변수가 설정되지 않았습니다.");
      return;
    }

    const initMap = () => {
      if (!window.kakao || !window.kakao.maps || !mapRef.current) return;

      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const centerLatLng = new window.kakao.maps.LatLng(center.lat, center.lng);

        // 맵이 처음이면 생성
        if (!mapInstanceRef.current) {
          const options = {
            center: centerLatLng,
            level,
          };
          const map = new window.kakao.maps.Map(mapRef.current, options);
          mapInstanceRef.current = map;

          const marker = new window.kakao.maps.Marker({
            position: centerLatLng,
          });
          marker.setMap(map);
        } else {
          // 이미 맵 있으면 위치/레벨만 업데이트
          mapInstanceRef.current.setCenter(centerLatLng);
          mapInstanceRef.current.setLevel(level);
        }
      });
    };

    // 이미 kakao SDK 로드된 경우
    if (window.kakao && window.kakao.maps) {
      initMap();
      return;
    }

    // 아직 스크립트 없으면 추가
    let script = document.getElementById("kakao-map-sdk") as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = "kakao-map-sdk";
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
      script.async = true;
      script.onload = initMap;
      script.onerror = () => {
        console.error("카카오맵 API 스크립트 로드 실패");
      };
      document.head.appendChild(script);
    } else {
      // 이미 script 태그는 있는데 아직 로딩 중일 수 있는 경우
      script.addEventListener("load", initMap);
    }

    // cleanup에서는 listener만 제거
    return () => {
      if (script) {
        script.removeEventListener("load", initMap);
      }
    };
  }, [center.lat, center.lng, level]);

  return <div ref={mapRef} className={className} />;
}
