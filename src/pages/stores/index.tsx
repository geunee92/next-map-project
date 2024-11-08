import Loading from "@/components/Loading";
import { StoreType } from "@/interface";
import axios from "axios";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Loader from "@/components/Loader";

function StoreListPage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  // page가 끝에 왔는지
  const isPageEnd = !!pageRef?.isIntersecting;

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios("/api/stores?page=" + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
      },
    });

    return data;
  };

  const {
    data: storeDataList,
    isFetching,
    // 다음 페이지로 이동
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery("stores", fetchStores, {
    // 다음에 생성할 매개변수
    getNextPageParam: (lastPage: any) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    // 페이지가 끝이고 다음 페이지가 있다면
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        // 새로운 페이지를 호출
        fetchNext();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage]);

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt=[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          storeDataList?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((store: StoreType, i) => (
                <li className="flex justify-between gap-x-6 py-5" key={i}>
                  <div className="flex gap-x-4">
                    <Image
                      src={
                        store?.category
                          ? `/images/markers/${store?.category}.png`
                          : "/images/markers/default.png"
                      }
                      width={48}
                      height={48}
                      alt="아이콘 이미지"
                    />
                    <div>
                      <div className="text-sm font-semibold leading-6 text-gray-900">
                        {store?.name}
                      </div>
                      <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                        {store?.storeType}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <div className="text-sm font-semibold leading-6 text-gray-900">
                      {store?.address}
                    </div>
                    <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                      {store?.phone || "번호없음"} | {store?.foodCertifyName} |{" "}
                      {store?.category}
                    </div>
                  </div>
                </li>
              ))}
            </React.Fragment>
          ))
        )}
      </ul>

      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}

      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
}

export default StoreListPage;
