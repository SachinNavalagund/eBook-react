import { FC, useEffect, useState } from "react";
import client from "../api/client";
import Slider from "react-slick";
import { Button } from "@nextui-org/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Props {}

interface Book {
  title: string;
  genre: string;
  publicationName: string;
  cover: {
    url: string;
  };
  slug: string;
}

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
};

const HeroSection: FC<Props> = () => {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await client.get("/book/all-books");
        setBooks(res.data.books);
      } catch (error) {
        console.log("Something went wrong");
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="md:h-96 bg-[#FFF6E3] dark:bg-[#0F0F0F] rounded-xl p-5">
      <Slider {...settings}>
        {books.map((book, index) => {
          return (
            <div key={index} className="">
              <div className="md:flex justify-between">
                <div className="flex flex-1 flex-col justify-center p-5">
                  <h1 className="text-3xl lg:text-5xl font-semibold">
                    {book.title}
                  </h1>
                  <p className="mt-3 md:text-lg italic truncate">
                    {book.genre}
                  </p>
                  <div className="mt-3">
                    <Button
                      radius="sm"
                      color="danger"
                      variant="bordered"
                      endContent={<FaArrowRightLong />}
                      as={Link}
                      to={book.slug}>
                      Learn More
                    </Button>
                  </div>
                </div>

                <div className=" flex-1 p-5 flex items-center justify-center">
                  <img
                    src={book.cover.url}
                    alt={book.title}
                    className="w-32 md:w-48 md:h-80 rounded-md object-cover  shadow-zinc-950 shadow-md rotate-12"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default HeroSection;
