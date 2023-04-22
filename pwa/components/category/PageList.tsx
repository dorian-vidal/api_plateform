import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Category } from "../../types/Category";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getCategorysPath = (page?: string | string[] | undefined) =>
  `/categories${typeof page === "string" ? `?page=${page}` : ""}`;
export const getCategorys =
  (page?: string | string[] | undefined) => async () =>
    await fetch<PagedCollection<Category>>(getCategorysPath(page));
const getPagePath = (path: string) =>
  `/categorys/page/${parsePage("categories", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: categorys, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Category>> | undefined
  >(getCategorysPath(page), getCategorys(page));
  const collection = useMercure(categorys, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Category List</title>
        </Head>
      </div>
      <List categorys={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
