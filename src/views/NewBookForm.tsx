import { FC } from "react";
import BookForm from "../components/common/BookForm";

interface Props {}

const NewBookForm: FC<Props> = () => {
  return (
    <BookForm
      title="Publish New Book"
      submitBtnTitle="Publish New Book"></BookForm>
  );
};

export default NewBookForm;
