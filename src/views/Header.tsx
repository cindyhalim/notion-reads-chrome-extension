import { useQuery } from "@tanstack/react-query";
import React from "react";
import operations from "../api/operations";

function HeaderSkeleton() {
  const commonStyles = "bg-neutral-200 animate-pulse rounded-md";
  return (
    <>
      <div className={`${commonStyles} w-[120px]`} />
      <Slash />
      <div className={`${commonStyles} w-[120px]`} />
    </>
  );
}

function HeaderError({ retry }: { retry: () => void }) {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  return (
    <div
      className=" bg-red-400 hover:bg-neutral-400 w-[180px] text-white rounded-md p-1 cursor-pointer text-center"
      onClick={retry}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? "try again" : "⚠️ error fetching reads"}
    </div>
  );
}

function Slash() {
  return <span className="text-sm mx-1">/</span>;
}

export default function Header() {
  const { data, isLoading, error, refetch } = useQuery(
    [operations.getNotionMetadata.key],
    operations.getNotionMetadata.fn
  );

  function getContent() {
    if (isLoading) {
      return <HeaderSkeleton />;
    }

    if (error) {
      return <HeaderError retry={refetch} />;
    }

    return (
      <>
        {data?.workspaceDetails?.icon}
        <span className="text-sm ml-1">{data?.workspaceDetails?.name}</span>
        <span className="text-sm mx-1">/</span>

        {data?.readListDetails.emoji}
        <a
          href={data?.readListDetails.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm ml-1 hover:underline underline-offset-4 cursor-pointer"
        >
          {data?.readListDetails.name}
        </a>
      </>
    );
  }

  return <div className="flex cursor-default m-4">{getContent()}</div>;
}
