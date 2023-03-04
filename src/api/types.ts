export type GetReadListResponse = {
  pages: {
    name: string;
    emoji: string | null;
    url: string;
    databaseId: string;
  }[];
};

export type BookDetails = {
  isbn: string;
  title: string;
  author: string;
  goodreadsUrl: string;
  pages: string;
  genres: string[];
  coverUrl: string;
};

export type GetBookDetailsResponse = {
  data: BookDetails;
};

export type SaveBookToReadListPayload = {
  databaseId: string | null;
  body: BookDetails;
};

export type SaveBookToReadListResponse = {
  pageId: string;
  pageUrl: string | null;
};
