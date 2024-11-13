import { Divider } from "@nextui-org/react";
import { FC } from "react";

interface Props {
  title?: string;
}

const DividerWithTitle: FC<Props> = ({ title }) => {
  if (!title) return null;
  return (
    <div className="">
      <p className=" dark:bg-white inline-block dark:text-black bg-black  text-white p-1 font-semibold rounded-t">
        {title}
      </p>

      <Divider className=" dark:bg-white bg-black" />
    </div>
  );
};

export default DividerWithTitle;
