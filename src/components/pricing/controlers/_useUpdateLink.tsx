import { useEffect, useState } from "react";
import type { ForfaitProps } from "../../../interface-types/interface/forfait";
import type { ProductProps } from "../../../interface-types/interface/product";
import type { OfferProps } from "../../../interface-types/interface/offer";
import getOfferDetails from "../utils/getOfferDetails";


export function useUpdateLink(
    dependancy: Array<ForfaitProps["forfait"] | ProductProps["product"] | OfferProps["offer"]>,

    /*

        This parameter is a boolean used to force the reloading of the link and so 
        update the different elements in the basket, ultimately.

    */
    forceLoad: boolean,
    setForceLoad: React.Dispatch<React.SetStateAction<boolean>>,


    currentForfaits: Array<ForfaitProps["forfait"]>,
    currentOffer: OfferProps["offer"] | undefined,
    currentProducts: Array<ProductProps["product"]>,


    setCurrentForfaits: React.Dispatch<React.SetStateAction<Array<ForfaitProps["forfait"]>>>,
    setCurrentOffer: React.Dispatch<React.SetStateAction<OfferProps["offer"] | undefined>>,
    setCurrentProducts: React.Dispatch<React.SetStateAction<Array<ProductProps["product"]>>>,
) {
    const [brake, setBrake] = useState(false);

    /*

        The objective here is to make a scalable and reusable function that will QUERY from the URL 
        the products, forfaits and offers that are selected by the user.
        The function will then update the state of the component with the selected products, forfaits and offers.

        The next step is to create a function that updates itself depending on newly added products, forfaits and offers,
        in order to manage two states:
        * The newly added or removed products, forfaits is in the offer: break the offer
        * The newly added or removed products, forfaits is not in the offer: add to the basket without breaking the offer

    */
    useEffect(() => {
        const prices = dependancy;

        console.log("--------------------------")
        console.log("Current products: ", currentProducts);
        console.log("Current forfaits: ", currentForfaits);
        console.log("Current offer: ", currentOffer);
        console.log("--------------------------")



        // Update the state of the component with the selected products, forfaits and offers
        let newProductIDs = currentProducts.map((product) => {
            if (product != undefined) {
                return product["_id"]["$oid"];
            }
        });
        let newForfaitIDs = currentForfaits.map((forfait) => {
            if (forfait != undefined) {
                return forfait["_id"]["$oid"];
            }
        });
        const newOfferIDs = currentOffer ? currentOffer["_id"]["$oid"] : "";

        if (forceLoad) {
            // If there is an active offer, we need to check if all the products and forfaits in the offer are 
            // present in the current products and forfaits.
            // If not, we need to break the offer and set the current products and forfaits to the selected ones

            if (currentOffer) {
                const offerKeys = Object.keys(currentOffer["Contenu"]);
                let i = 0;
                let flag = false;
                while (i < offerKeys.length && currentOffer != undefined) {
                    const contentID = offerKeys[i];
                    const c: ForfaitProps["forfait"] | ProductProps["product"] | OfferProps["offer"] | undefined = prices.find((price) => price["_id"]["$oid"] === contentID);
                    if (c) {
                        if (c["Catégorie"] === "produit") {
                            const product = c as ProductProps["product"];
                            const productID = product["_id"]["$oid"];
                            const isPresent = currentProducts.find((product) => {
                                if (product) {
                                    return product["_id"]["$oid"] === productID;
                                }
                            });
                            if (!isPresent) {
                                console.log(">>>> BREAKING OFFER <<<<");
                                setCurrentOffer(undefined);
                                flag = true;
                            }
                        } else if (c["Catégorie"] === "forfait") {
                            const forfait = c as ForfaitProps["forfait"];
                            const forfaitID = forfait["_id"]["$oid"];
                            const isPresent = currentForfaits.find((forfait) => {
                                if (forfait) {
                                    return forfait["_id"]["$oid"] === forfaitID;
                                }
                            });
                            if (!isPresent) {
                                console.log(">>>> BREAKING OFFER <<<<");
                                setCurrentOffer(undefined);
                                flag = true;
                            }
                        }
                    }
                    i += 1;
                }

                if (!flag) {
                    // If there is an offer, we remove everything in products, forfaits that are already
                    // included in the offer
                    const offerDetails = getOfferDetails(currentOffer, prices);
                    const offerContentIDs = offerDetails.offerContentIDs;

                    console.log("BEFORE >>>> New product IDs: ", newProductIDs);


                    newProductIDs = newProductIDs.filter((productID) => {
                        if (productID) {
                            return !offerContentIDs.products.includes(productID);
                        }
                    });
                    newForfaitIDs = newForfaitIDs.filter((forfaitID) => {
                        if (forfaitID) {
                            return !offerContentIDs.forfaits.includes(forfaitID);
                        }
                    });

                    console.log("AFTER >>>> New product IDs: ", newProductIDs);

                } else {
                    // If the offer has been broken, we need to remove the offer ID from the URL
                    // AND set all the products and forfaits to the selected ones in the URL
                    console.log(">>>> OFFER IS UNDEFINED <<<<");


                }



                const newURL = `${window.location.origin}${window.location.pathname}?product=${newProductIDs.join(',')}&forfait=${newForfaitIDs.join(',')}&offer=${flag ? "" : newOfferIDs}`;

                console.log("New URL: ", newURL);

                window.history.replaceState({}, "", newURL);
                setBrake(true);
            } else {
                // If there is no offer, we need to set the URL with the selected products and forfaits
                const newURL = `${window.location.origin}${window.location.pathname}?product=${newProductIDs.join(',')}&forfait=${newForfaitIDs.join(',')}&offer=${newOfferIDs}`;
                console.log("New URL: ", newURL);
                window.history.replaceState({}, "", newURL);
            }

            setForceLoad(false);
            return;
        }
        // If there is no forceLoad, we need to load from the URL (usually called when the page is loaded)
        else if (brake == false) {
            const urlParams = new URLSearchParams(window.location.search);
            const productIDs = urlParams.get("product");
            const forfaitIDs = urlParams.get("forfait");
            const offerID = urlParams.get("offer");
            const productIDsArray = productIDs ? productIDs.split(",") : [];
            const forfaitIDsArray = forfaitIDs ? forfaitIDs.split(",") : [];




            const arrayOfProducts: Array<ProductProps["product"]> = productIDsArray.map((id) => {
                return prices.find((price) => price["_id"]["$oid"] === id) as ProductProps["product"];
            });
            const arrayOfForfait: Array<ForfaitProps["forfait"]> = forfaitIDsArray.map((id) => {
                return prices.find((price) => price["_id"]["$oid"] === id) as ForfaitProps["forfait"];
            });
            const singleOffer: OfferProps["offer"] | undefined = prices.find((price) => price["_id"]["$oid"] === offerID) as OfferProps["offer"];

            console.log("+++++++++++++++++++++++++++++")
            console.log("Product IDs: ", arrayOfProducts);
            console.log("Forfait IDs: ", arrayOfForfait);
            console.log("Offer ID: ", singleOffer);


            if (singleOffer) {
                // If there is an offer, we add the products and forfaits in the offer to the current products and forfaits
                const offerDetails = getOfferDetails(singleOffer, prices);
                const offerContentIDs = offerDetails.offerContentIDs;
                arrayOfProducts.push(...prices.filter((product) => offerContentIDs.products.includes(product["_id"]["$oid"])).map((product) => product as ProductProps["product"]));
                arrayOfForfait.push(...prices.filter((forfait) => offerContentIDs.forfaits.includes(forfait["_id"]["$oid"])).map((forfait) => forfait as ForfaitProps["forfait"]));
            }

            console.log("Array of products: ", arrayOfProducts);
            console.log("Array of forfaits: ", arrayOfForfait);
            console.log("Single offer: ", singleOffer);

            setCurrentProducts(arrayOfProducts);
            setCurrentForfaits(arrayOfForfait);
            setCurrentOffer(singleOffer);

        }

        setBrake(false);

        return () => { };

    }, [dependancy, forceLoad]);
}