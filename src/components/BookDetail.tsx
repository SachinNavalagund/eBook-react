import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { calculateDiscount, formatPrice, parserError } from "../utils/helper";
import { Button, Chip, Divider } from "@nextui-org/react";
import {
  FaEarthAfrica,
  FaMasksTheater,
  FaRegCalendarDays,
  FaRegFileLines,
  FaStar,
} from "react-icons/fa6";
import RichEditor from "./rich-editor";
import { TbShoppingCartPlus } from "react-icons/tb";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import client from "../api/client";

interface Props {
  book?: Book;
}

export interface Book {
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
    mrp: string;
    sale: string;
  };
}

const BookDetail: FC<Props> = ({ book }) => {
  const [busy, setBusy] = useState(false);

  const { updateCart, pending } = useCart();
  const { profile } = useAuth();
  const navigate = useNavigate();
  if (!book) return null;

  const alreadyPurchased = profile?.books.includes(book.id) || false;

  const handleCartUpdate = () => {
    updateCart({ product: book, quantity: 1 });
  };

  const handleBuyNow = async () => {
    try {
      if (!profile) return navigate("/sign-up");
      setBusy(true);
      const { data } = await client.post("/checkout/instant", {
        productId: id,
      });
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      parserError(error);
    } finally {
      setBusy(false);
    }
  };

  const {
    cover,
    title,
    author,
    publicationName,
    price,
    rating,
    id,
    description,
    language,
    fileInfo,
    genre,
    publishedAt,
    slug,
  } = book;
  return (
    <div className="md:flex">
      <div>
        <img
          src={cover}
          alt={title}
          className="w-48 h-80 rounded-md object-cover"
        />
      </div>

      <div className=" pl-0 md:pl-10 flex-1">
        <h1 className="sm:text-3xl text-2xl font-semibold">{title}</h1>
        <div>
          <Link
            className="font-semibold hover:underline"
            to={`/author/${author.id}`}>
            {author.name}
          </Link>

          <p>{publicationName}</p>
        </div>

        <div className="mt-3 flex space-x-2">
          <p className=" font-semibold">{formatPrice(Number(price.sale))}</p>
          <p className=" line-through italic">
            {formatPrice(Number(price.mrp))}
          </p>
          <Chip color="danger">{`${calculateDiscount(price)}% off`}</Chip>
        </div>

        <div className="mt-3 flex items-center space-x-2 font-semibold">
          {rating ? (
            <Chip color="danger">
              <div className="flex space-x-1 items-center">
                <span>{rating}</span>
                <FaStar />
              </div>
            </Chip>
          ) : (
            <Chip>
              <span className=" text-xs">No Ratings</span>
            </Chip>
          )}

          <Link
            to={`/rate/${id}`}
            className=" font-semibold text-sm hover:underline">
            Add a Review
          </Link>
        </div>

        <div className="mt-6">
          <RichEditor value={description} className="regular" />
        </div>

        <div className="flex items-center space-x-6 mt-6 h-10">
          <div className=" flex flex-col items-center justify-center space-y-1">
            <FaEarthAfrica className=" sm:text-2xl text-xl" />
            <span className=" sm:text-xs text-[10px] truncate">{language}</span>
          </div>

          <Divider orientation="vertical" className=" h-1/2" />

          <div className=" flex flex-col items-center justify-center space-y-1">
            <FaMasksTheater className=" sm:text-2xl text-xl" />
            <span className=" sm:text-xs text-[10px] truncate">{genre}</span>
          </div>

          <Divider orientation="vertical" className=" h-1/2" />

          <div className=" flex flex-col items-center justify-center space-y-1">
            <FaRegFileLines className=" sm:text-2xl text-xl" />
            <span className=" sm:text-xs text-[10px] truncate">
              {fileInfo.size}
            </span>
          </div>

          <Divider orientation="vertical" className=" h-1/2" />

          <div className=" flex flex-col items-center justify-center space-y-1">
            <FaRegCalendarDays className=" sm:text-2xl text-xl" />
            <span className=" sm:text-xs text-[10px] truncate">
              {publishedAt}
            </span>
          </div>

          <Divider orientation="vertical" className=" h-1/2" />
        </div>

        <div className="flex items-center mt-6 space-x-3">
          {alreadyPurchased ? (
            <Button radius="sm" as={Link} to={`/read/${slug}`}>
              Read now
            </Button>
          ) : (
            <>
              <Button
                onClick={handleCartUpdate}
                variant="light"
                isLoading={pending || busy}
                startContent={<TbShoppingCartPlus />}>
                Add to cart
              </Button>
              <Button
                onClick={handleBuyNow}
                isLoading={pending || busy}
                variant="flat">
                Buy Now
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
