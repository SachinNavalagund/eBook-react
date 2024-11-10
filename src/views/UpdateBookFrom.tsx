import { FC } from "react";
import BookForm from "../components/common/BookForm";

interface Props {}

const UpdateBookFrom: FC<Props> = () => {
  return <BookForm title="Update Book" submitBtnTitle="Update Book"></BookForm>;
};

export default UpdateBookFrom;
