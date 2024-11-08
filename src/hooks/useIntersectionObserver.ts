import { RefObject, useState, useEffect } from "react";

function useIntersectionObserver(
 // 관찰 할 엘리먼트
  elementRef: RefObject<Element>,
 // 옵저버 옵션
  { threshold = 0.1, root = null, rootMargin = "0%" }
) {
  // 옵저버의 결과값
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  // 변경이 있는 경우 콜백
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    // 관찰할 값
    const node = elementRef?.current;
    // 브라우저가 옵저버를 지원하는지?
    const hasIOSupport = !!window.IntersectionObserver;

    if (!node || !hasIOSupport) return;

    const observerParams = { threshold, root, rootMargin };
    // 옵저버 생성
    const observer = new IntersectionObserver(updateEntry, observerParams);

    // 실행
    observer.observe(node);

    // 언마운트 시 해제
    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef?.current, root, rootMargin, JSON.stringify(threshold)]);

  return entry;
}

export default useIntersectionObserver;