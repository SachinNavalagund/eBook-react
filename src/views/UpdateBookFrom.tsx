import { FC, useEffect, useState } from "react";
import BookForm, { InitialBookToUpdate } from "../components/common/BookForm";
import { useParams } from "react-router-dom";
import client from "../api/client";
import { parserError } from "../utils/helper";
import LoadingSpinner from "../components/common/LoadingSpinner";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {}

const UpdateBookFrom: FC<Props> = () => {
  const [bookInfo, setBookInfo] = useState<InitialBookToUpdate>();
  const [busy, setBusy] = useState(true);
  const { slug } = useParams();

  const handleSubmit = async (data: FormData, file?: File | null) => {
    const res = await client.patch("/book", data);
    if (res.data && file) {
      axios.put(res.data, file, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
    }
    toast.success("Book updated successfully", { duration: 5000 });
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const { data } = await client.get(`/book/details/${slug}`);
        setBookInfo(data.book);

        console.log(bookInfo);
      } catch (error) {
        parserError(error);
      } finally {
        setBusy(false);
      }
    };

    fetchBookDetails();
  }, [slug]);

  if (busy) return <LoadingSpinner />;

  return (
    <BookForm
      onSubmit={handleSubmit}
      initialState={bookInfo}
      title="Update Book"
      submitBtnTitle="Update Book"></BookForm>
  );
};

export default UpdateBookFrom;
