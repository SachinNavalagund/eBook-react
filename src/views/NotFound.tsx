import { FC } from "react";

interface Props {}

const NotFound: FC<Props> = () => {
  return (
    <div className="flex-1 text-center pt-20 ">
      <h1 className=" text-6xl font-bold opacity-50">Not Found</h1>
      <p>Sorry you have landed in wrong planet</p>
    </div>
  );
};

export default NotFound;
