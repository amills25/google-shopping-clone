import { PageResult } from "@/typings";
import Link from "next/link";

type Props = {
  results: PageResult[];
  term: string;
};

function ResultsList({ term, results }: Props) {
  return (
    <div className="flex md:px-5">
      {/* sidebar */}
      <div className="w-36 md:w-64">
        {/* each page */}
        {results.map((pageResult) => (
          <div key={pageResult.job_id} className="space-y-2">
            {pageResult.content.results.filters?.map((filter, i) => (
              <div key={i} className="p-5 border rounded-r-lg md:rounded-lg">
                <p className="font-bold">{filter.name}</p>
                <div className="flex flex-col">
                  {filter.values.map((value) => (
                    <Link
                      key={value.value}
                      prefetch={false}
                      href={`https://www.google.com${value.url}`}
                    >
                      {value.value}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* main body */}
      <div className="flex-1 px-5 space-y-5 md:p-10 md:pt-0">
        {results.map((pageResult, i) => (
          <div
            key={pageResult.job_id}
            className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
          >
            {i !== 0 && <hr className="w-full col-span-full" />}
            <div className="py-5 md:col-span-2 lg:col-span-3 xl:col-span-4">
              <div className="flex items-center space-x-2 divide-x-2">
                <h1>Shop On Google</h1>
                <h2 className="pl-2 text-xl font-semibold">
                  Search Results for Page {i + 1}
                </h2>
              </div>

              <h3 className="font-extralight">
                Showing results for &quot;{decodeURIComponent(term)}&quot;
              </h3>
            </div>

            {pageResult.content.results.organic.map((item) => (
              <Link
                key={item.pos}
                prefetch={false}
                href={
                  item.url.includes("url?url=")
                    ? item.url.split("url?url=")?.[1]
                    : item.url.split("?")?.[0]
                }
                className={`border rounded-2xl flex flex-col hover:shadow-lg transition duration-200 ease-in-out ${
                  item.url.includes("url?url=") && "italic"
                }`}
              >
                <div className="flex-1 p-5 border-b">
                  <p className="text-[#1B66D2]">{item.title}</p>
                </div>

                <div className="px-5 py-2 not-italic">
                  <p className="font-light">
                    {item.price_str} {item.currency}
                  </p>
                  <p className="text-[#1B66D2] font-semibold">
                    {item.merchant.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsList;
