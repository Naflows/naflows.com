import type { ForfaitProps } from "../../../interface-types/interface/forfait";
import type { OfferProps } from "../../../interface-types/interface/offer";
import type { ProductProps } from "../../../interface-types/interface/product";
import getOfferDetails from "../utils/getOfferDetails";
import type { AccurateOfferDetailsProps } from "./basket-component";



const BasketOfferSuggestion = ({
    accurateOffer,
    accurateOfferDetails,
    setCurrentOffer,
    setCurrentProducts,
    setCurrentForfaits,
    setForceLoad,
    prices
}: {
    accurateOffer: OfferProps["offer"],
    accurateOfferDetails: AccurateOfferDetailsProps,
    setCurrentOffer: (offer: OfferProps["offer"]) => void,
    setForceLoad: (forceLoad: boolean) => void,
    prices: Array<OfferProps["offer"] | ProductProps["product"] | ForfaitProps["forfait"]>;
    setCurrentProducts: (products: Array<ProductProps["product"]>) => void,
    setCurrentForfaits: (forfaits: Array<ForfaitProps["forfait"]>) => void,
}) => {

    return (
        <div className="pricing-global__container_suggestion_content">
            <h3>Cette offre semble vous correspondre</h3>
            <div className="pricing-global__container__suggestion" style={{
                display: accurateOffer ? "flex" : "none",
                background: `linear-gradient(45deg, ${accurateOfferDetails?.hues[0]} 0%, ${accurateOfferDetails?.hues[1]} 100%)`
            }}>
                <div className="pricing-global__container__suggestion_content">
                    <div className="pricing-global__forfait__header">
                        <div className="pricing-global__forfait__header__left">
                            <div className="pricing-global__forfait__header__informations" >
                                <h4 style={{
                                    background: `linear-gradient(45deg, ${accurateOfferDetails.hues[0]} 0%, ${accurateOfferDetails.hues[1] || accurateOfferDetails.hues[0]} 100%)`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    color: "transparent"
                                }}>
                                    {accurateOffer["Nom"]}
                                </h4>
                            </div>
                        </div>
                        <div className="pricing-global__forfait__header__price" style={{
                            background: `linear-gradient(45deg, ${accurateOfferDetails.hues[0]} 0%, ${accurateOfferDetails.hues[1]} 100%)`,
                        }}>
                            <p>
                                {
                                    accurateOfferDetails && accurateOfferDetails.total
                                } €
                            </p>
                        </div>
                    </div>

                    <div className="pricing-global__forfait__description">
                        <ul>
                            {
                                accurateOfferDetails?.productsNames.map((item, index) => {
                                    return (
                                        <li key={index}>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>



                    <button className="pricing-global__forfait__button button action-button primary-button" style={{
                        background: `linear-gradient(45deg, ${accurateOfferDetails?.hues[0]} 0%, ${accurateOfferDetails?.hues[1] || accurateOfferDetails?.hues[0]} 100%)`,
                        borderRadius: "50px",
                    }} onClick={() => {
                        // Loading all the products and forfaits of the offer
                        const offerDetails = getOfferDetails(accurateOffer, prices);
                        const relatedProducts = prices.filter((price) => offerDetails?.offerContentIDs?.products.includes(price["_id"]["$oid"]));
                        const relatedForfaits = prices.filter((price) => offerDetails?.offerContentIDs?.forfaits.includes(price["_id"]["$oid"]));

                        setCurrentForfaits(relatedForfaits as Array<ForfaitProps["forfait"]>);
                        setCurrentProducts(relatedProducts as Array<ProductProps["product"]>);
                        setCurrentOffer(accurateOffer);
                        setForceLoad(true);
                    }}>
                        <span>Commander</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BasketOfferSuggestion;