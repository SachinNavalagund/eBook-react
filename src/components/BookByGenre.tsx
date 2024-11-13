import { FC, useEffect, useState } from "react";
import client from "../api/client";
import { calculateDiscount, formatPrice, parserError } from "../utils/helper";
import DividerWithTitle from "./common/DividerWithTitle";
import { Link } from "react-router-dom";
import { Chip } from "@nextui-org/react";
import { FaStar } from "react-icons/fa6";
import BookList from "./skeletons/BookList";

interface Props {
  genre: string;
}

interface Books {
  id: string;
  title: string;
  genre: string;
  slug: string;
  cover?: string;
  rating?: string;
  price: {
    mrp: string;
    sale: string;
  };
}

const BookByGenre: FC<Props> = ({ genre }) => {
  const [books, setBooks] = useState<Books[]>([]);
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

  if (busy) return <BookList />;

  return (
    <div>
      <DividerWithTitle title={genre} />

      <div className="mt-6 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5">
        {books.map((book) => {
          return (
            <Link key={book.id} to={`/book/${book.slug}`}>
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-32 h-[185px] object-cover rounded"
                />

                <div className="w-full space-y-2">
                  <p className="font-bold line-clamp-1">{book.title}</p>

                  <Chip color="danger" radius="sm" size="sm">
                    {calculateDiscount(book.price)}% off
                  </Chip>
                </div>

                <div className="w-full ">
                  <div className="flex space-x-2">
                    <p className="font-bold">
                      {formatPrice(Number(book.price.sale))}
                    </p>
                    <p className="line-through">
                      {formatPrice(Number(book.price.mrp))}
                    </p>
                  </div>
                </div>

                <div className="w-full ">
                  {book.rating ? (
                    <Chip radius="sm" color="warning" variant="solid">
                      <div className="flex items-center font-semibold text-sm space-x-1">
                        <span>{book.rating}</span> <FaStar />
                      </div>
                    </Chip>
                  ) : (
                    <span>No Ratings</span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BookByGenre;
