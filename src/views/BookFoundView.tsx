import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

import operations from "../api/operations";

import { BaseView, Button, ButtonType } from "../components";
import Loading from "../components/Loading";
import LoadingView from "../components/LoadingView";

type BookFoundViewProps = {
  ISBN: string;
  databaseId: string | null;
};

type SaveButtonProps = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  handleOnClick: () => void;
};
function SaveButton({
  isLoading,
  isError,
  isSuccess,
  handleOnClick,
}: SaveButtonProps) {
  const buttonType = isError ? ButtonType.ERROR : ButtonType.PRIMARY;
  function getChildren() {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center">
          <Loading dimensions="20px" isDark={false} />
          <span className="ml-2">Adding to reads...</span>
        </div>
      );
    }

    if (isError) {
      return "Error adding to reads";
    }

    if (isSuccess) {
      return "Successfully added to reads";
    }

    return "Add to reads";
  }

  return (
    <Button
      fullWidth
      disabled={isLoading || isSuccess}
      type={buttonType}
      onClick={handleOnClick}
    >
      {getChildren()}
    </Button>
  );
}

export default function BookFoundView({
  ISBN,
  databaseId,
}: BookFoundViewProps) {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const { data, isLoading, error, refetch } = useQuery(
    [operations.getBookDetails.key, ISBN],
    {
      queryFn: () => operations.getBookDetails.fn(ISBN),
      enabled: !!ISBN,
      cacheTime: 10000,
    }
  );

  const { mutate, isLoading: isSavingBook } = useMutation({
    mutationFn: operations.saveBookToReadList.fn,
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: () => {
      setIsError(true);
    },
  });

  function handleOnClick() {
    setIsError(false);
    setIsSuccess(false);

    if (!!data) {
      mutate({
        databaseId,
        body: data,
      });
    }
  }

  if (isLoading) {
    return <LoadingView>🔍 Looking up book details</LoadingView>;
  }

  if (error) {
    return (
      <BaseView
        emoji="🤭"
        title="Error"
        subtitle="Something went wrong upon retrieving book details. Please try again"
        button={{ text: "Try again", onClick: refetch }}
      />
    );
  }

  return (
    <div className="w-11/12 relative rounded-lg border px-5 pb-4 shadow-md">
      <img
        src={data?.coverUrl}
        alt="book-cover"
        className="absolute z-10 left-5 -top-5 rounded-lg h-36 w-26 shadow-md"
      />
      <div className="flex flex-wrap ml-28 mb-8">
        <div>
          <h2 className="text-lg font-bold mt-3">{data?.title}</h2>
          <h3 className="font-base text-base text-neutral-800 mb-1">
            {data?.author}
          </h3>
          <p className="text-xs">
            <span className="font-semibold">{data?.pages.toString()}</span>{" "}
            pages
          </p>
        </div>
        <div className="flex flex-wrap">
          {data?.genres.map((genre, idx) => (
            <div
              key={idx}
              className="cursor-default rounded-md bg-neutral-100 p-1 mr-1 mt-1"
            >
              <p className="text-neutral-800 text-xs">{genre}</p>
            </div>
          ))}
        </div>
      </div>
      <SaveButton
        isLoading={isSavingBook}
        isSuccess={isSuccess}
        isError={isError}
        handleOnClick={handleOnClick}
      />
      <div className="mb-2" />
      <Button fullWidth type={ButtonType.SECONDARY} link={data?.goodreadsUrl}>
        View on Goodreads
      </Button>
    </div>
  );
}
