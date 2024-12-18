import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";
import { parserError } from "../utils/helper";
import BookDetail, { Book } from "../components/BookDetail";
import BookDetails from "../components/skeletons/BookDetails";
import ReviewSection, { Review } from "../components/ReviewSection";
import RecommendedSection from "../components/RecommendedSection";

interface Props {}

const fetchBookReviews = async (id: string) => {
  const { data } = await client.get("/review/list/" + id);
  return data.reviews;
};

const SingleBook: FC<Props> = () => {
  const [bookDetails, setBookDetails] = useState<Book>();
  const [busy, setBusy] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { slug } = useParams();

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const { data } = await client.get(`/book/details/${slug}`);

        setBookDetails(data.book);
        const reviews = await fetchBookReviews(data.book.id);
        setReviews(reviews);
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

      <RecommendedSection id={bookDetails?.id} />
      <div className="mt-4">
        <ReviewSection
          id={bookDetails?.id}
          reviews={reviews}
          title={`${bookDetails?.title} Reviews`}
        />
      </div>
    </div>
  );
};

export default SingleBook;
