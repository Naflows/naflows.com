import { useEffect, useState } from "react";
import type { ForfaitProps } from "../../../interface-types/interface/forfait";
import type { ProductProps } from "../../../interface-types/interface/product";
import type { OfferProps } from "../../../interface-types/interface/offer";
import BasketProductsAndPlans from "./basket-global-details";
import BasketOfferSuggestion from "./basket-offer-suggestion";
import { useFetchAccurateOffer } from "../controlers/_useFetchAccurateOffer";









interface AccurateOfferDetailsProps {
    total: number;
    productsNames: Array<string>;
    hues: Array<string>;
}


const BasketComponent = ({
    currentForfaits,
    currentOffer,
    currentProducts,
    prices,
    setAccurateOffer,
    setCurrentProducts,
    setCurrentForfaits,
    accurateOffer,
    setForceLoad,
    setCurrentOffer
}: {
    currentForfaits: Array<ForfaitProps["forfait"]>;
    currentOffer: OfferProps["offer"];
    currentProducts: Array<ProductProps["product"]>;
    setAccurateOffer: (offer: OfferProps["offer"]) => void;
    accurateOffer: OfferProps["offer"] | null;
    prices: Array<ForfaitProps['forfait'] | ProductProps["product"] | OfferProps["offer"]>;
    setForceLoad: (forceLoad: boolean) => void;
    setCurrentOffer: (offer: OfferProps["offer"]) => void;
    setCurrentProducts: (products: Array<ProductProps["product"]>) => void;
    setCurrentForfaits: (forfaits: Array<ForfaitProps["forfait"]>) => void;
}) => {

    const [accurateOfferDetails, setAccurateOfferDetails] = useState<AccurateOfferDetailsProps>();

    useEffect(() => {

    }, [currentOffer])

    useFetchAccurateOffer(
        currentProducts,
        currentForfaits,
        prices,
        setAccurateOffer,
        setAccurateOfferDetails
    );

    return (
        <div className="pricing-global__container__basket">
            <a href={
                `/?${new URLSearchParams({
                    product: currentProducts.map((product) => {
                        if (product) {
                            const isProductInOffer = currentOffer && currentOffer["Contenu"][product["_id"]["$oid"]] !== undefined;
                            if (!isProductInOffer) {
                                return product["_id"]["$oid"];
                            }
                        }
                    }).join(","),
                    forfait: currentForfaits.map((forfait) => {
                        if (forfait) {
                            const isForfaitInOffer = currentOffer && currentOffer["Contenu"][forfait["_id"]["$oid"]] !== undefined;
                            if (!isForfaitInOffer) {
                                return forfait["_id"]["$oid"];
                            }
                        }
                    }).join(","),
                    offer: currentOffer ? currentOffer["_id"]["$oid"] : "",
                }).toString()}`
            } className="pricing-global__container__back button action-button tertiary-button fit-content">
                <span>Retourner aux solutions</span>
            </a>
            <div className="pricing-global__container__recap">
                <h3>Produits que vous souhaitez commander</h3>
                <div className="pricing-global__container__recap__pricing">
                    {

                        <BasketProductsAndPlans
                            currentForfaits={currentForfaits}
                            prices={prices}
                            currentProducts={currentProducts}
                            currentOffer={currentOffer}
                        />

                    }

                    <div className="pricing-global__basket__total">
                        <h3>Total</h3>
                        <p>
                            {
                                (
                                    ((currentOffer && accurateOfferDetails) ? accurateOfferDetails.total : 0)
                                    + currentProducts.reduce((acc, product: ProductProps["product"]) => {
                                        if (product) {
                                            const isProductInOffer = currentOffer && currentOffer["Contenu"][product["_id"]["$oid"]] !== undefined;
                                            if (!isProductInOffer) {
                                                console.log(`ADDING PRICE OF PRODUCT ${product["Nom"]} TO OFFER (${product["A partir de"]})`);
                                                return acc + product["A partir de"];
                                            }
                                        }
                                        return acc;
                                    }, 0)
                                    + currentForfaits.reduce((acc, forfait: ForfaitProps["forfait"]) => {
                                        if (forfait) {
                                            const isForfaitInOffer = currentOffer && currentOffer["Contenu"][forfait["_id"]["$oid"]] !== undefined;
                                            if (!isForfaitInOffer) {
                                                console.log(`ADDING PRICE OF FORFAIT ${forfait["Nom"]} TO OFFER (${forfait["A partir de par mois"] * 12})`);
                                                return acc + forfait["A partir de par mois"] * 12;
                                            }
                                            return acc;
                                        }
                                        return acc;
                                    }, 0)
                                )
                            } € min.
                        </p>
                    </div>
                </div>
            </div>

            {
                (accurateOffer && accurateOfferDetails && accurateOffer != currentOffer) && (
                    <BasketOfferSuggestion
                        accurateOffer={accurateOffer}
                        accurateOfferDetails={accurateOfferDetails}
                        setCurrentOffer={setCurrentOffer}
                        setForceLoad={setForceLoad}
                        prices={prices}
                        setCurrentProducts={setCurrentProducts}
                        setCurrentForfaits={setCurrentForfaits}
                    />
                )
            }

            <button className="pricing-global__container__basket__button action-button primary-button">
                Prendre rendez-vous
            </button>
        </div>
    )
}

export type { AccurateOfferDetailsProps };
export default BasketComponent;