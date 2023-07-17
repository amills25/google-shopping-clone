import { ProductData } from "@/typings";
import { getFetchUrl } from "@/utils/getFetchUrl";
import { StarIcon } from "@heroicons/react/24/solid";
import { notFound } from "next/navigation";

export const revalidate = 300;

type Props = {
  params: {
    id: string;
  };
};

async function ProductPage({ params: { id } }: Props) {
  const response = await fetch(getFetchUrl(`api/shopping/product/${id}`));
  const productData = (await response.json()) as ProductData;

  if (!productData.content.pricing) {
    notFound();
  }

  return (
    <div className="p-12 pt-0">
      <h1 className="text-2xl">{productData.content.title}</h1>

      {productData.content.reviews && (
        <div className="flex space-x-1">
          {[
            ...Array.from({
              length: Math.round(productData.content.reviews.rating),
            }),
          ].map((_, i) => (
            <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
          ))}

          {/* show remaining stars from review out of 5 */}
          {[
            ...Array.from({
              length: 5 - Math.round(productData.content.reviews.rating),
            }),
          ].map((_, i) => (
            <StarIcon key={i} className="w-5 h-5 text-gray-200" />
          ))}
        </div>
      )}

      <section className="flex flex-col mt-5 lg:flex-row md:mt-0">
        <div className="mx-auto md:p-10 md:pl-0">
          <div className="flex gap-4">
            <img
              className="object-contain border rounded-md h-80 w-80"
              src={productData.content.images?.full_size[0]}
              alt=""
            />
            <div className="flex flex-col justify-between">
              {productData.content.images?.full_size
                .slice(1, 3)
                .map((image) => (
                  <img
                    src={image}
                    alt=""
                    className="min-w-[9.5rem] h-[9.5rem] object-contain border rounded-md"
                    key={image}
                  />
                ))}
            </div>
          </div>

          <div className="flex max-w-xl mx-auto space-x-6 overflow-y-auto">
            {productData.content.images?.full_size.slice(3).map((image) => (
              <img
                key={image}
                src={image}
                alt=""
                className="object-contain w-20 h-20"
              />
            ))}
          </div>
        </div>

        <div className="flex-1 pt-10">
          <div>
            {productData.content.pricing.online[0].details && (
              <>
                <h3 className="text-2xl font-bold">Product Details</h3>

                <p className="text-lg">
                  {productData.content.pricing.online[0].price_total}{" "}
                  {productData.content.pricing.online[0].currency}
                </p>

                <div className="flex space-x-4">
                  <p className="text-sm text-gray-600">
                    ({productData.content.pricing.online[0].price}{" "}
                    {productData.content.pricing.online[0].currency}{" "}
                    {productData.content.pricing.online[0].price_tax}{" "}
                    {productData.content.pricing.online[0].currency} tax )
                  </p>

                  {productData.content.pricing.online.length > 1 && (
                    <p className="text-sm text-blue-600">
                      + {productData.content.pricing.online.length - 1} more
                      prices
                    </p>
                  )}
                </div>

                <p className="mt-5 text-sm text-gray-600">
                  {productData.content.pricing.online[0].details}
                </p>
              </>
            )}

            <hr className="my-5" />

            <p>{productData.content.description}</p>

            {productData.content.highlights && (
              <div className="mt-5 space-y-2">
                <h3 className="text-2xl font-bold">Product Highlights</h3>
                <hr />
                <ul className="space-y-2">
                  {productData.content.highlights.map((highlight) => (
                    <li key={highlight} className="list-disc">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <hr className="my-10" />

        {productData.content.reviews ? (
          <>
            <h3 className="text-2xl font-bold">
              Reviews ({productData.content.reviews.rating})
            </h3>

            <h4 className="text-lg italic">Top Review</h4>

            {productData.content.reviews.top_review && (
              <div className="p-5 mt-2 border rounded-lg">
                <div className="flex space-x-1">
                  <p className="font-bold capitalize">
                    {productData.content.reviews.top_review.author} says:
                  </p>

                  <h5>{productData.content.reviews.top_review.title}</h5>
                </div>
                <div className="flex mb-2 space-x-1">
                  {[
                    ...Array.from({
                      length: Math.round(
                        productData.content.reviews.top_review.rating
                      ),
                    }),
                  ].map((_, i) => (
                    <StarIcon className="w-5 h-5 text-yellow-500" key={i} />
                  ))}
                </div>

                <p>&quot;{productData.content.reviews.top_review.text}&quot;</p>
              </div>
            )}
          </>
        ) : (
          <div>
            <h3 className="text-2xl font-bold">Reviews</h3>

            <h4 className="text-lg italic">No reviews yet</h4>
          </div>
        )}
      </section>

      {productData.content.specifications && (
        <section>
          <hr className="my-10" />

          <h3 className="text-2xl font-bold">Specifications</h3>

          <div className="flex flex-wrap space-x-5">
            {productData.content.specifications.map((spec) => (
              <div key={spec.section_title}>
                <h4 className="my-2 text-xl font-bold">{spec.section_title}</h4>

                {spec.items.map((item) => (
                  <div className="text-sm" key={item.title}>
                    <h5 className="font-bold">{item.title}</h5>
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductPage;
