import { useEffect, useRef, useState } from "react";
import type { ProductProps } from "../../../interface-types/interface/product";

function hexToRgba(hex: string, alpha: number) {
  // Remove the # if present
  hex = hex.replace(/^#/, "");

  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Ensure alpha is between 0 and 1
  if (typeof alpha !== "number" || alpha < 0 || alpha > 1) {
    throw new Error("Alpha must be a number between 0 and 1.");
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ProductContainer = ({
  product,
  currentProducts,
  setCurrentProducts,
  setShake,
  setForceURLUpdate,
}: {
  product: ProductProps["product"];
  currentProducts: Array<ProductProps["product"]>;
  setCurrentProducts: React.Dispatch<
    React.SetStateAction<Array<ProductProps["product"]>>
  >;
  setShake: React.Dispatch<React.SetStateAction<boolean>>;
  setForceURLUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [initialHeight, setInitialHeight] = useState<number | null>(null);
  const [displayBody, setDisplayBody] = useState<boolean>(true);

  useEffect(() => {
    if (ref.current) {
      setInitialHeight(ref.current.clientHeight);
      setDisplayBody(false);
    }
  }, []);

  // On resize
  const handleResize = () => {
    if (ref.current) {
      setInitialHeight(ref.current.clientHeight);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pricing-global__container__content__product showcase-card">
      <div
        className="pricing-global__title"
        style={{
          background: `linear-gradient(45deg, ${product["Hue"]} 0%, ${hexToRgba(
            product["Hue"],
            0.75
          )} 100%)`,
        }}
        onClick={() => {
          setDisplayBody(!displayBody);
        }}
      >
        <div className="pricing-global__title__content">
          <p>{product["Phrase d'accroche"]}</p>

          <div className="pricing-global__title__header">
            <h3>{product["Nom"]}</h3>
            <div className="pricing-tag__container">
              A partir de {product["A partir de"]} €
            </div>
          </div>
        </div>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pricing-global__title__icon"
            style={{
                transform: "rotate(-90deg)",
            }}
        >
          <path
            d="M7.68821 31.3801C4.74645 28.1736 7.02107 23 11.3726 23H88.6274C92.9789 23 95.2535 28.1736 92.3118 31.3802L53.6844 73.484C51.7029 75.6438 48.2971 75.6438 46.3156 73.484L7.68821 31.3801Z"
            fill="white"
          />
        </svg>
      </div>

      <div
        className="pricing-global__body"
        style={{
          height: displayBody ? initialHeight + "px" : 0,
          marginTop: displayBody ? 30 : 0,
          overflow: "hidden",
          transition: "height 0.3s ease-in-out",
        }}
        ref={ref}
      >
        <div className="pricing-global_included">
          <h4>Ce qui est inclus, au minimum</h4>
          <ul>
            {product["Inclus"].map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>

        <div className="pricing-global_about">
          <h4>À propos</h4>
          <p>{product["A propos"]}</p>
        </div>

        <div className="pricing-global_targets">
          <h4>Public cible</h4>
          <span>
            {product["Public ciblé"].map((item, index) => {
              return (
                <span key={index}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  {index + 1 < product["Public ciblé"].length ? ", " : ""}
                </span>
              );
            })}
          </span>
        </div>

        <a
          className="pricing-global__container__content__product__button action-button primary-button"
          style={{
            background: product["Hue"],
            color: "white",
            borderColor: product["Hue"],
          }}
          onClick={() => {
            if (currentProducts.includes(product)) {
              const c = currentProducts.filter((el) => {
                if (el) {
                  return el["_id"]["$oid"] !== product["_id"]["$oid"];
                }
              });
              setCurrentProducts(c);
            } else {
              setShake(true);
              setCurrentProducts([...currentProducts, product]);
            }
            console.log(">> Calling setCurrentProducts <<");
            setForceURLUpdate(true);
          }}
        >
          {currentProducts.includes(product)
            ? "Retirer du devis"
            : "Ajouter au devis"}
        </a>
      </div>
    </div>
  );
};

export default ProductContainer;
