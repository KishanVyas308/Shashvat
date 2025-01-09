import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { productAtom } from "../Atoms/productsAtom";
import { allProduct } from "../backend/manageProduct";
import { loadingAtom } from "../Atoms/loadingAtom";
import { userAtom } from "../Atoms/userAtom";
import PopularProduct from "../Componets/PopularProduct";
import DeleteProductButton from "../Componets/admin/DeleteProductButton";
import WhatsappContectButton from "../Componets/WhatsappContectButton";
import SendRequirementButton from "../Componets/SendRequirementButton";
import Loading from "../Componets/Loading";
import ReactImageMagnify from "react-image-magnify";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const params = useParams();
  const userAtm = useRecoilValue(userAtom);
  const [products, setProducts] = useRecoilState(productAtom);
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);

  useEffect(() => {
    scrollToTop();
    setUp();
  }, [params, products]);

  const setUp = async () => {
    setIsLoading(true);
    if (products === null) {
      setProducts(await allProduct());
    }

    let prod = null;

    if (products !== null) {
      products.map((p) => {
        if (p.id == params.id) {
          prod = p;
        }
      });
      setProduct(prod);
    }

    setIsLoading(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {product && (
        <div className="max-w-4xl mt-4 mx-auto p-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: product.name,
                    isFluidWidth: true,
                    src: product.imageUrl,
                  },
                  largeImage: {
                    src: product.imageUrl,
                    width: 900,
                    height: 600,
                  },
                  enlargedImageContainerDimensions: {
                    width: "150%",
                    height: "150%",
                  },
                  isHintEnabled: true,
                  shouldUsePositiveSpaceLens: true,
                }}
                className="lg:block hidden"
              />

              <img src={product.imageUrl} className="block lg:hidden flex-1" />
            </div>
            <div className="flex-1 lg:pl-6 mt-6 lg:mt-0">
              <h1 className="text-3xl font-bold mb-4 text-gray-800">
                {product.name}
              </h1>
              <table className="mb-4 mt-2 w-full border-collapse border border-gray-200">
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-bold">
                      MOQ:
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.moq} Piece
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-bold">
                      Business Type:
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Manufacturers, Wholesaler, Supplier
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-bold">
                      Country of Origin:
                    </td>
                    <td className="border border-gray-200 px-4 py-2">India</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-bold">
                      Size:
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.size}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-bold">
                      Material:
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.material}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex items-center my-2">
                <WhatsappContectButton product={product} />
                <SendRequirementButton product={product} />
                {userAtm && userAtm.isAdmin === true && (
                  <div className="mx-5 z-30">
                    <DeleteProductButton
                      productId={params.id}
                      imgUrl={product.imgUrl}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Product Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Shape:</strong>{" "}
                  {product.details.shape ? product.details.shape : "----"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Color:</strong>{" "}
                  {product.details.color ? product.details.color : "----"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Pattern:</strong>{" "}
                  {product.details.pattern ? product.details.pattern : "----"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Finish:</strong>{" "}
                  {product.details.finish ? product.details.finish : "----"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <h3 className="text-center mt-8 text-2xl font-semibold">View Similar</h3>
      <PopularProduct productIdToSkip={params.id} />
      {isLoading && <Loading />}
    </>
  );
};

export default ProductDetail;
