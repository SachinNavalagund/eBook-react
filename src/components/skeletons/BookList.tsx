import { Skeleton } from "@nextui-org/react";
import { FC } from "react";

interface Props {
  itemsCount?: number;
}

const BookList: FC<Props> = ({ itemsCount = 5 }) => {
  const fakeData = new Array(5).fill("");

  return (
    <div className="mt-6 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5 animate-pulse">
      {fakeData.map((_, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center space-y-2 bg-gradient-to-r from-transparent">
            <div>
              <Skeleton className="w-28 h-36  rounded bg-default-100" />
            </div>
            <div className=" w-full flex flex-col gap-2">
              <Skeleton className=" h-3 w-3/5 rounded bg-default-200" />
              <Skeleton className=" h-3 w-10 rounded bg-default-200" />
              <Skeleton className=" h-3 w-10 rounded bg-default-200" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
