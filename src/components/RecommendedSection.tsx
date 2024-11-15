import { FC, useEffect, useState } from "react";
import client from "../api/client";
import { parserError } from "../utils/helper";
import { Book } from "./BookDetail";
import BookListSkeleton from "./skeletons/BookListSkeleton";
import BookList from "./BookList";

interface Props {
  id?: string;
}

const RecommendedSection: FC<Props> = ({ id }) => {
  const [fetching, setFetching] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchBooks = async () => {
      try {
        const { data } = await client.get("/book/recommended/" + id);
        setBooks(data);
      } catch (error) {
        parserError(error);
      } finally {
        setFetching(false);
      }
    };

    fetchBooks();
  }, [id]);

  if (!id) return null;

  if (fetching) return <BookListSkeleton />;

  return (
    <div>
      <BookList data={books} title="Books related to this book" />
    </div>
  );
};

export default RecommendedSection;
