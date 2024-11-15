import { Book } from "epubjs";
import { FC, useEffect } from "react";

interface Props {
  url: string;
}
const container = "epub_container";
const EpubReader: FC<Props> = ({ url }) => {
  useEffect(() => {
    if (url) return;

    const book = new Book(url);

    const rendition = book.renderTo(container, {
      width: 500,
      height: 500,
    });

    rendition.display();
  }, [url]);

  return (
    <div>
      <div id={container} />
    </div>
  );
};

export default EpubReader;
