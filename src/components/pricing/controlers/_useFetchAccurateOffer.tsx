import { useEffect } from "react";
import type { ProductProps } from "../../../interface-types/interface/product";
import type { ForfaitProps } from "../../../interface-types/interface/forfait";
import type { OfferProps } from "../../../interface-types/interface/offer";
import type { AccurateOfferDetailsProps } from "../basket/basket-component";
import axios from "axios";
import getOfferDetails from "../utils/getOfferDetails";

export function useFetchAccurateOffer(
    currentProducts: Array<ProductProps["product"]>,
    currentForfaits: Array<ForfaitProps["forfait"]>,
    prices: Array<ForfaitProps['forfait'] | ProductProps["product"] | OfferProps["offer"]>,
    setAccurateOffer: (offer: OfferProps["offer"]) => void,
    setAccurateOfferDetails: (details: AccurateOfferDetailsProps) => void
) {
    useEffect(() => {
        const k: Array<string> = [];
        currentProducts.forEach((product) => { 
            if (product != undefined) {
                k.push(product["_id"]["$oid"]);
            }
         });
        currentForfaits.forEach((forfait) => {
            if (forfait != undefined) {
                k.push(forfait["_id"]["$oid"]);
            }
         });

        axios.post('http://193.70.115.114:3001/get-prices/custom-offer', {
            products: JSON.stringify(k)
        }).then((response) => {
            const data = response.data;
            if (data && data.accuracy > 1) {
                const correspondingOffer: OfferProps["offer"] = prices.find((price) => price["_id"]["$oid"] === data.bestOffer) as OfferProps["offer"];
                setAccurateOffer(correspondingOffer);
                const offerDetails = getOfferDetails(correspondingOffer, prices);
                setAccurateOfferDetails(offerDetails);
            }
        }).catch((error) => {
            console.error("Error fetching accurate offer:", error);
        });
    }, [currentProducts, currentForfaits]);
}