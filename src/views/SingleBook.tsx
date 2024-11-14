import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";
import { parserError } from "../utils/helper";
import BookDetail, { Book } from "../components/BookDetail";
import BookDetails from "../components/skeletons/BookDetails";

interface Props {}

const SingleBook: FC<Props> = () => {
  const [bookDetails, setBookDetails] = useState<Book>();
  const [busy, setBusy] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const { data } = await client.get(`/book/details/${slug}`);

        setBookDetails(data.book);
      } catch (error) {
        parserError(error);
      } finally {
        setBusy(false);
      }
    };

    fetchBookDetail();
  }, [slug]);

  if (busy)
    return (
      <div className="p-5 lg:pt-2">
        <BookDetails />
      </div>
    );

  return (
    <div className="p-5 lg:pt-2">
      <BookDetail book={bookDetails} />
    </div>
  );
};

export default SingleBook;
