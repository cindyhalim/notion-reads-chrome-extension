import React from "react";
import { Button, ButtonType } from "../components";
import Loading from "../components/Loading";
import request from "../utils/request";

type BookFoundViewProps = {
  isbn: string;
};

type BookDetails = {
  isbn: string;
  title: string;
  author: string;
  goodreadsUrl: string;
  pages: string;
  genre: string[];
  coverUrl: string;
};

type GetBookDetailsResponse = {
  data: BookDetails;
};

export default function BookFoundView({ isbn }: BookFoundViewProps) {
  const [data, setData] = React.useState<BookDetails | null>(null);

  React.useEffect(() => {
    async function getBookDetails() {
      const response = await request.fetch<GetBookDetailsResponse>(
        `${process.env.REACT_APP_SERVICE_URL}/book/?isbn=${isbn}`,
        {
          method: "GET",
        }
      );

      const bookDetails = response.data;
      setData(bookDetails);
    }

    if (isbn) {
      getBookDetails();
    }
  }, [isbn]);

  if (!data) {
    return (
      <div className="flex flex-col">
        <Loading dimensions="80px" />
        <p className="font-semibold text-sm text-neutral-900 mt-4">
          🔍 Looking up book details
        </p>
      </div>
    );
  }

  return (
    <div className="w-11/12 relative top-10 rounded-lg border px-5 pb-4 shadow-md">
      <img
        src={data.coverUrl}
        alt="book-cover"
        className="absolute z-10 left-5 -top-5 rounded-lg h-36 w-26 shadow-md"
      />
      <div className="flex flex-wrap ml-28 mb-8">
        <div>
          <h2 className="text-lg font-bold mt-3">{data.title}</h2>
          <h3 className="font-base text-base text-neutral-800 mb-1">
            {data.author}
          </h3>
          <p className="text-xs">
            <span className="font-semibold">{data.pages.toString()}</span> pages
          </p>
        </div>
        <div className="flex flex-wrap">
          {data.genre.map((genre, idx) => (
            <div
              key={idx}
              className="cursor-default rounded-md bg-neutral-100 p-1 mr-1 mt-1"
            >
              <p className="text-neutral-800 text-xs">{genre}</p>
            </div>
          ))}
        </div>
      </div>
      <Button link="">Add to reads list</Button>
      <div className="mb-2" />
      <Button type={ButtonType.SECONDARY} link={data.goodreadsUrl || ""}>
        View on Goodreads
      </Button>
    </div>
  );
}
