import { KakaoMap } from "@/components/kakao-map";

export default function MapPage() {
  const hasApiKey = !!process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY && 
                    process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY !== "your-kakao-map-api-key";

  return (
    <div className="flex min-h-screen flex-col items-center p-6 md:p-10">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-6">카카오맵</h1>
        
        {!hasApiKey && (
          <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ 카카오맵 API 키가 설정되지 않았습니다. 
              <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded mx-1">NEXT_PUBLIC_KAKAO_MAP_API_KEY</code>
              환경 변수를 설정해주세요.
            </p>
            <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2">
              카카오 개발자 콘솔에서 JavaScript 키를 발급받아 .env.local 파일에 추가하세요.
            </p>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <KakaoMap
            center={{ lat: 37.5665, lng: 126.978 }}
            level={3}
            className="w-full h-[600px] rounded-lg"
          />
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>기본 위치: 서울시청 (37.5665, 126.978)</p>
          {hasApiKey && (
            <p className="mt-2">
              카카오맵이 정상적으로 표시됩니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

