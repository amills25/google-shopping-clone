import ResultsList from "@/components/ResultsList";
import { PageResult, SearchParams } from "@/typings";
import { getFetchUrl } from "@/utils/getFetchUrl";
import { redirect } from "next/navigation";

export const revalidate = 300;

type Props = {
  searchParams: SearchParams;
  params: {
    term: string;
  };
};

async function SearchPage({ searchParams, params: { term } }: Props) {
  if (!term) {
    redirect("/");
  }

  // fetch from API...
  const response = await fetch(getFetchUrl("api/search"), {
    method: "POST",
    body: JSON.stringify({ searchTerm: term, ...searchParams }),
  });

  const results = (await response.json()) as PageResult[];

  // console.log(results);

  return (
    <div>
      <ResultsList results={results} term={term} />
    </div>
  );
}

export default SearchPage;
