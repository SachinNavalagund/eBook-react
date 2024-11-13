import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";
import { parserError } from "../utils/helper";

interface Props {}

interface BookDetail {
  id: string;
  title: string;
  genre: string;
  language: string;
  slug: string;
  description: string;
  publicationName: string;
  publishedAt: string;
  cover?: string;
  rating?: string;
  author: {
    id: string;
    name: string;
    slug: string;
  };
  fileInfo: {
    id: string;
    size: string;
  };
  price: {
    mrp: number;
    sale: number;
  };
}

const SingleBook: FC<Props> = () => {
  const [bookDetails, setBookDetails] = useState<BookDetail>();
  const [busy, setBusy] = useState(true);
  const { slug } = useParams();

  console.log(slug);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const { data } = await client.get(`/book/details/${slug}`);
        console.log(data);

        setBookDetails(data.book);
      } catch (error) {
        parserError(error);
      } finally {
        setBusy(false);
      }
    };

    fetchBookDetail();
  }, [slug]);

  console.log(bookDetails);

  return <div>{JSON.stringify(bookDetails)}</div>;
};

export default SingleBook;
