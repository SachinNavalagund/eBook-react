import { FC, useEffect, useState } from "react";
import EpubReader from "../components/EpubReader";
import client from "../api/client";
import { useParams } from "react-router-dom";
import { parserError } from "../utils/helper";

interface Props {}

interface BookApiResponse {
  settings: {
    highlights: string[];
    lastLocation: string;
  };
  url: string;
}

const ReadingPage: FC<Props> = () => {
  const [url, setUrl] = useState("");
  const { slug } = useParams();
  console.log(slug);

  useEffect(() => {
    if (!slug) {
      console.error("Slug is missing!");
      return;
    }

    const fetchBookUrl = async () => {
      try {
        const { data } = await client.get<BookApiResponse>(
          `/book/read/${slug}`
        );
        setUrl(data.url);
      } catch (error) {
        parserError(error);
      }
    };

    fetchBookUrl();
  }, [slug]);

  return (
    <div>
      <EpubReader url={url} />
    </div>
  );
};

export default ReadingPage;
