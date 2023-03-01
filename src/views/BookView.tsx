import React from "react";
import { Button, ButtonType } from "../components";

function Header() {
  const pages = {
    workspace: {
      emoji: "🌱",
      name: "cindy's workspace",
    },
    reads: {
      emoji: "📚",
      name: "reads",
      link: "",
    },
  };
  return (
    <div className="flex align-bottom cursor-default m-4">
      <div>
        {pages.workspace.emoji}
        <span className="text-sm ml-0.5">{pages.workspace.name}</span>
      </div>
      <span className="text-sm mx-1">/</span>
      <div>
        {pages.reads.emoji}
        <a
          href={pages.reads.link}
          target="_blank"
          rel="noreferrer"
          className="text-sm ml-0.5 hover:underline underline-offset-4 cursor-pointer"
        >
          {pages.reads.name}
        </a>
      </div>
    </div>
  );
}
export default function BookView() {
  const data = {
    bookCoverUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1443231179i/12497.jpg",
    title: "No Country for Old Men",
    author: "Cormac McCarthy",
    pages: 309,
    goodreadsLink: "",
    genres: ["fiction", "thriller", "mystery"],
  };

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className=" w-11/12 relative top-10 rounded-lg border px-5 pb-4 shadow-md ">
          <img
            src={data.bookCoverUrl}
            alt="book-cover"
            className="absolute z-10 left-5 -top-5 rounded-lg h-36 w-26"
          />
          <div className="flex flex-wrap ml-28 mb-8">
            <div>
              <h2 className="text-lg font-bold mt-3">{data.title}</h2>
              <h3 className="font-base text-md text-neutral-600 mb-1">
                {data.author}
              </h3>
              <p className="text-xs">
                <span className="font-semibold">{data.pages.toString()}</span>{" "}
                pages
              </p>
            </div>
            {data.genres.map((genre, idx) => (
              <div
                key={idx}
                className="cursor-default rounded-md bg-neutral-100 p-1 mr-1 mt-1"
              >
                <p className="text-neutral-800 text-xs">{genre}</p>
              </div>
            ))}
          </div>
          <Button link="">Add to reads list</Button>
          <div className="mb-2" />
          <Button type={ButtonType.SECONDARY} link={data.goodreadsLink}>
            View on Goodreads
          </Button>
        </div>
      </div>
    </>
  );
}
