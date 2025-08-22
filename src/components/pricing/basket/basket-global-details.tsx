import { useEffect, useState } from "react";
import type { ForfaitProps } from "../../../interface-types/interface/forfait";
import type { OfferProps } from "../../../interface-types/interface/offer";
import type { ProductProps } from "../../../interface-types/interface/product";
import getOfferDetails from "../utils/getOfferDetails";
import type { AccurateOfferDetailsProps } from "../../../interface-types/interface/offerDetails";



const BasketProductsAndPlans = (
    {
        currentForfaits,
        currentProducts,
        currentOffer,
        prices
    }: {
        currentProducts: ProductProps["product"][],
        currentOffer: OfferProps["offer"] | undefined,
        currentForfaits: ForfaitProps["forfait"][],
        prices: Array<ForfaitProps['forfait'] | ProductProps["product"] | OfferProps["offer"]>;
    }
) => {

    const [offerDetails, setOfferDetails] = useState<AccurateOfferDetailsProps | undefined>(undefined);

    useEffect(() => {
        if (currentOffer) {
            console.log("Checking for offer details...");
            console.log("Current offer: ", currentOffer);
            const offerDetails = getOfferDetails(currentOffer, prices);
            console.log("Offer details: ", offerDetails);
            setOfferDetails(offerDetails);
        } else {
            setOfferDetails(undefined);
        }
    }, [currentOffer, prices])

    return (
        <div className={`pricing-global__basket__products }`}>
            {
                currentOffer && offerDetails && (
                    <div className="pricing-global__basket__products__product pricing-global__basket__products__product--offer">
                        <div className="pricing-global__basket__products__product--offer__header">
                            <h4>{currentOffer["Nom"]}</h4>
                            <p>{offerDetails?.total} € min.</p>
                        </div>
                        <div className="pricing-global__basket__products__product--offer__content">
                            {
                                offerDetails?.productsNames.map((productName, index) => {
                                    return (
                                        <p key={index}>{productName}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
            {
                currentProducts.length > 0 && currentProducts.map((product: ProductProps["product"], index) => {
                    if (product) {
                        const isInCurrentOffer = currentOffer && currentOffer["Contenu"][product["_id"]["$oid"]] !== undefined;
                        if (!isInCurrentOffer) {
                            return (
                                <div className={`pricing-global__basket__products__product`} key={index}>
                                    <h4>{product["Nom"]}</h4>
                                    <p>{product["A partir de"]} € min.</p>
                                </div>
                            )
                        }
                    }
                })
            }
            {
                currentForfaits.length > 0 && currentForfaits.map((forfait, index) => {
                    if (forfait) {
                        const currentForfait = prices.find((price) => price["_id"]["$oid"] === forfait["_id"]["$oid"] && price["Catégorie"] === "forfait");

                        if (currentForfait) {
                            const f = currentForfait as ForfaitProps["forfait"];
                            const isForfaitInCurrentOffer = currentOffer && currentOffer["Contenu"][f["_id"]["$oid"]] !== undefined;

                            if (!isForfaitInCurrentOffer) {
                                return (
                                    <div className={`pricing-global__basket__products__product  ${isForfaitInCurrentOffer ? "pricing-global__basket__offer" : ""}`} key={index}>
                                        <h4>{f["Nom"]}</h4>
                                        <p>{f["A partir de par mois"] * 12} € / an</p>
                                    </div>
                                )
                            }
                        }
                    }
                })
            }
        </div>
    )
}

export default BasketProductsAndPlans;