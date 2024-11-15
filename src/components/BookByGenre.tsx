import { FC, useEffect, useState } from "react";
import client from "../api/client";
import { parserError } from "../utils/helper";

import BookListSkeleton from "./skeletons/BookListSkeleton";
import BookList, { Book } from "./BookList";

interface Props {
  genre: string;
}

const BookByGenre: FC<Props> = ({ genre }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    const fetchBooks = async (genre: string) => {
      try {
        const { data } = await client.get(`/book/by-genre/${genre}`);
        setBooks(data.books);
      } catch (error) {
        parserError(error);
      } finally {
        setBusy(false);
      }
    };

    fetchBooks(genre);
  }, [genre]);

  if (busy) return <BookListSkeleton />;

  return <BookList title={genre} data={books} />;
};

export default BookByGenre;
