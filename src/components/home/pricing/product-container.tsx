import type { ProductProps } from "../../../interface-types/interface/product";

function hexToRgba(hex : string, alpha : number) {
    // Remove the # if present
    hex = hex.replace(/^#/, '');

    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    if (hex.length !== 6) {
        throw new Error("Invalid HEX color.");
    }

    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Ensure alpha is between 0 and 1
    if (typeof alpha !== 'number' || alpha < 0 || alpha > 1) {
        throw new Error("Alpha must be a number between 0 and 1.");
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}



const ProductContainer = ({ 
    product,
    currentProducts,
    setCurrentProducts,
    setShake,
    setForceURLUpdate
 }: {
    product: ProductProps["product"],
    currentProducts: Array<ProductProps["product"]>,
    setCurrentProducts: React.Dispatch<React.SetStateAction<Array<ProductProps["product"]>>>,
    setShake: React.Dispatch<React.SetStateAction<boolean>>,
    setForceURLUpdate: React.Dispatch<React.SetStateAction<boolean>>
 }) => {

    return (
        <div className="pricing-global__container__content__product" style={{
            borderColor: product["Hue"],
        }}>

            <div className="pricing-global__title">
                <div className="pricing-global__title__header">
                    <div className="pricing-tag__container" style={{
                        background : `linear-gradient(45deg, ${product["Hue"]} 0%, ${hexToRgba(product["Hue"],0.75)} 100%)`,
                    }}>
                        {product["A partir de"]} € min.
                    </div>
                    <h3 style={{
                        color: product["Hue"],
                    }}>{product["Nom"]}</h3>
                </div>
                <p>{product["Phrase d'accroche"]}</p>
            </div>

            <div className="pricing-global_included">
                <h4>Ce qui est inclus, au minimum</h4>
                <ul>
                    {
                        product["Inclus"].map((item, index) => {
                            return (
                                <li key={index}>{item}</li>
                            )
                        })
                    }
                </ul>
            </div>

            <div className="pricing-global_about">
                <h4>À propos</h4>
                <p>{product["A propos"]}</p>
            </div>

            <div className="pricing-global_targets">
                <h4>Public cible</h4>
                <span>
                    {
                        product["Public ciblé"].map((item, index) => {
                            return (
                                <span key={index}>{
                                    item.charAt(0).toUpperCase() + item.slice(1)
                                }{index + 1 < product["Public ciblé"].length ? ", " : ""}</span>
                            )
                        })
                    }
                </span>
            </div>

            <a className="pricing-global__container__content__product__button action-button primary-button" style={{
                background: product["Hue"],
                color: "white",
                borderColor: product["Hue"],
            }} onClick={() => {
                if (currentProducts.includes(product)) {
                    const c = currentProducts.filter(el =>  {
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
            }}>
                {
                    currentProducts.includes(product) ? "Retirer du devis" : "Ajouter au devis"
                }
            </a>

        </div>
    );
}


export default ProductContainer;