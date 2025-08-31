import { useEffect, useState } from "react";
import ProductContainer, { hexToRgba } from "./product-container";

import "./index.scss";
import type { ForfaitProps } from "../../../interface-types/interface/forfait";
import type { ProductProps } from "../../../interface-types/interface/product";
import type { OfferProps } from "../../../interface-types/interface/offer";
import getOfferDetails from "../../pricing/utils/getOfferDetails";
import { useUpdateLink } from "../../pricing/controlers/_useUpdateLink";
import fetchPrices from "./fetch-pricing";



const Pricing = () => {
  const [prices, setPrices] = useState<
    Array<
      ForfaitProps["forfait"] | ProductProps["product"] | OfferProps["offer"]
    >
  >([]);
  const [currentProducts, setCurrentProducts] = useState<
    Array<ProductProps["product"]>
  >([]);
  const [currentForfaits, setCurrentForfaits] = useState<
    Array<ForfaitProps["forfait"]>
  >([]);
  const [currentOffer, setCurrentOffer] = useState<
    OfferProps["offer"] | undefined
  >(undefined);
  const [forceURLUpdate, setForceURLUpdate] = useState(false);
  const [shake, setShake] = useState(false);

  const [selectedProductToDisplay, setSelectedProductToDisplay] = useState<
    ProductProps["product"] | undefined
  >(undefined);

  const [pickerWidth, setPickerWidth] = useState<number>(0);
  const [pickerLeft, setPickerLeft] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPrices(setPrices, setSelectedProductToDisplay);

    };
    fetchData();
  }, []);

  useUpdateLink(
    prices,
    forceURLUpdate,
    setForceURLUpdate,
    currentForfaits,
    currentOffer,
    currentProducts,
    setCurrentForfaits,
    setCurrentOffer,
    setCurrentProducts
  );

    const handleResize = () => {
      if (selectedProductToDisplay) {
        const element: HTMLElement | null = document.querySelector(
          `.global-product__picker__item[data-id="${selectedProductToDisplay["_id"]["$oid"]}"]`
        );
        if (element) {
          setPickerWidth(element.offsetWidth);
          setPickerLeft(element.offsetLeft);
        }
      }
    };

  // Update picker position on resize
  useEffect(() => {
    handleResize();
  }, [selectedProductToDisplay]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedProductToDisplay]);

  useEffect(() => {
    if (shake) {
      setTimeout(() => {
        setShake(false);
      }, 1000);
    }
  }, [shake]);

  return (
    <>
      <div className="pricing-global__container">
        <div className="global-product__picker">
          <div
            className="picker__background"
            style={{
              width: pickerWidth,
              left: pickerLeft,
              background: selectedProductToDisplay ?`linear-gradient(45deg, ${
                selectedProductToDisplay["Hue"]
              } 0%, ${hexToRgba(selectedProductToDisplay["Hue"], 0.75)} 100%)` : "transparent",
            }}
          ></div>
          <div className="global-product__picker__items" style={{
            borderColor: selectedProductToDisplay ? selectedProductToDisplay["Hue"] : "transparent"
          }}>
            {prices
              .filter((product) => product["Catégorie"] === "produit")
              .map((product, index) => {
                const p = product as ProductProps["product"];
                return (
                  <div
                    className={`global-product__picker__item ${selectedProductToDisplay?._id.$oid === p["_id"]["$oid"] ? "active" : ""}`}
                    key={index}
                    data-id={p["_id"]["$oid"]}
                    onClick={(el) => {
                      setSelectedProductToDisplay(p);
                      setPickerWidth(el.currentTarget.offsetWidth);
                      setPickerLeft(el.currentTarget.offsetLeft);
                    }}
                  >
                    <span>{p.Nom}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="pricing-global__container__content">
          {prices ? (
            prices.map((price, index) => {
              if (
                price["Catégorie"] == "produit" &&
                (selectedProductToDisplay == undefined ||
                  selectedProductToDisplay["_id"]["$oid"] ===
                    price["_id"]["$oid"])
              ) {
                const p = price as ProductProps["product"];
                return (
                  <ProductContainer
                    product={p}
                    key={index}
                    setCurrentProducts={setCurrentProducts}
                    currentProducts={currentProducts}
                    setForceURLUpdate={setForceURLUpdate}
                    setShake={setShake}
                  />
                );
              }
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div
        className={`pricing-devis__container ${shake ? "shake" : ""}`}
        style={{
          top:
            (document.querySelector("header")?.offsetHeight ?? 0) + 20 + "px",
        }}
      >
        <div className="princing-devis__icon">
          <div className="header-right-part__basket-button">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 3C63.8071 3 75 14.1929 75 28V35H69.1699C69.6837 34.4451 70 33.7045 70 32.8887V28C70 16.9543 61.0457 8 50 8C38.9543 8 30 16.9543 30 28V32.8887C30 33.7045 30.3163 34.4451 30.8301 35H25V28C25 14.1929 36.1929 3 50 3Z"
                fill="#3E4DED"
              />
              <path
                d="M75 26C80.5229 26 85 30.4772 85 36V86C85 91.5229 80.5229 96 75 96H25C19.4772 96 15 91.5229 15 86V36C15 30.4772 19.4772 26 25 26H75ZM29 38C29 48.2173 37.2827 56.5 47.5 56.5H50.5C60.7173 56.5 69 48.2173 69 38H64C61.6897 55.4467 36.4666 55.4253 34 38H29Z"
                fill="#3E4DED"
              />
            </svg>
            <span className="basket-amount">
              {(currentOffer ? 1 : 0) +
                currentProducts.filter((product) => {
                  if (!product) return false;
                  return (
                    !currentOffer ||
                    currentOffer["Contenu"][product["_id"]["$oid"]] ===
                      undefined
                  );
                }).length +
                currentForfaits.filter((forfait) => {
                  if (!forfait) return false;
                  return (
                    !currentOffer ||
                    currentOffer["Contenu"][forfait["_id"]["$oid"]] ===
                      undefined
                  );
                }).length}
            </span>
          </div>
        </div>
        <div className="pricing-devis__container__main">
          <div className="pricing-devis__container__content">
            <h3>Produits que vous souhaitez commander</h3>
            <div className="pricing-devis__container__products">
              {currentProducts && currentForfaits ? (
                <>
                  {currentProducts &&
                    currentProducts.length > 0 &&
                    currentProducts.map((plan, index) => {
                      const product = prices.find((price) => price === plan);
                      if (product) {
                        const isProductInCurrentOffer =
                          currentOffer &&
                          currentOffer["Contenu"][product["_id"]["$oid"]] !==
                            undefined;
                        const p = product as ProductProps["product"];
                        if (!isProductInCurrentOffer) {
                          return (
                            <div
                              className="pricing-devis__container__products__product"
                              key={index}
                            >
                              <h4>{p["Nom"]}</h4>
                              <p>{p["A partir de"]} € min.</p>
                            </div>
                          );
                        }
                      }
                    })}
                  {currentForfaits &&
                    currentForfaits.length > 0 &&
                    currentForfaits.map((forfait, index) => {
                      const plan = prices.find((price) => price === forfait);
                      if (plan) {
                        const isForfaitInCurrentOffer =
                          currentOffer &&
                          currentOffer["Contenu"][plan["_id"]["$oid"]] !==
                            undefined;
                        const p = plan as ForfaitProps["forfait"];
                        if (!isForfaitInCurrentOffer) {
                          return (
                            <div
                              className="pricing-devis__container__products__product"
                              key={index}
                              style={{
                                opacity: currentProducts.length == 0 ? 0.25 : 1,
                              }}
                            >
                              <h4>{p["Nom"]}</h4>
                              <p>{p["A partir de par mois"]} € / mois</p>
                            </div>
                          );
                        }
                      }
                    })}
                  {currentOffer != undefined &&
                    prices.map((offer, index) => {
                      if (
                        offer["Catégorie"] == "offre" &&
                        offer === currentOffer
                      ) {
                        const o = offer as OfferProps["offer"];
                        return (
                          <div
                            className="pricing-devis__container__products__product"
                            key={index}
                          >
                            <h4>Offre {offer["Nom"]}</h4>
                            <p>{getOfferDetails(o, prices).total} € </p>
                          </div>
                        );
                      }
                    })}
                </>
              ) : (
                <p>Aucun produit dans votre panier.</p>
              )}
            </div>
          </div>
          <div
            className="pricing-devis__container__button"
            style={{
              display:
                currentProducts.length > 0 || currentOffer != undefined
                  ? "flex"
                  : "none",
            }}
          >
            <a
              href={(() => {
                const params = new URLSearchParams({
                  product:
                    currentProducts && currentProducts.length > 0
                      ? currentProducts
                          .map((product) => {
                            if (product) {
                              return product["_id"]["$oid"];
                            }
                          })
                          .join(",")
                      : "",
                  forfait:
                    currentForfaits && currentForfaits.length > 0
                      ? currentForfaits
                          .map((forfait) => {
                            if (forfait) {
                              return forfait["_id"]["$oid"];
                            }
                          })
                          .join(",")
                      : "",
                  offer:
                    currentOffer != undefined
                      ? currentOffer["_id"]["$oid"]
                      : "",
                });
                return `pricing?${params.toString()}`;
              })()}
              className="action-button primary-button"
            >
              <span>Demander un devis</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
