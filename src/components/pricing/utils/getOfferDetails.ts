import type { ForfaitProps } from "../../../interface-types/interface/forfait";
import type { OfferProps } from "../../../interface-types/interface/offer";
import type { ProductProps } from "../../../interface-types/interface/product";

const getOfferDetails = (offer: OfferProps["offer"], prices: Array<ForfaitProps['forfait'] | ProductProps["product"] | OfferProps["offer"]>) => {
    const content: Record<string, number> = offer["Contenu"];
    let total = 0;
    const productsNames: Array<string> = [];
    const hues: Array<string> = [];
    const offerContentIDs: {
        "forfaits": Array<string>,
        "products": Array<string>
    } = {
        "forfaits": [],
        "products": []
    };
    // Taking each key of the content and finding the corresponding price
    Array.from(Object.keys(content)).forEach((contentID: string) => {
        // Find the product or forfait corresponding to the ID of the key
        const c: ForfaitProps["forfait"] | ProductProps["product"] | OfferProps["offer"] | undefined = prices.find((price) => price["_id"]["$oid"] === contentID);
        if (c) {
            // This is a number between 0-100 that is the percentage of the payed price
            const valueOfPayement: number = content[contentID];
            if (c["Catégorie"] === "produit") {
                // If the category is product, we need to get the price of the product
                // and multiply it by the percentage of the payed price
                const product = c as ProductProps["product"];
                const productPrice: number = product["A partir de"];
                total += productPrice * (valueOfPayement / 100);

                // Also, we need to add the name of the product to the list of products
                productsNames.push(`Une solution ${product["Nom"]}`);

                // Also, we need to add the hue of the product to the list of hues
                if (product["Hue"] && !hues.includes(product["Hue"]) && hues.length <= 1) {
                    hues.push(product["Hue"]);
                }

                // Also, we need to add the ID of the product to the list of IDs
                offerContentIDs["products"].push(product["_id"]["$oid"]);
            } else if (c["Catégorie"] === "forfait") {
                // If the category is forfait, we need to get the price of the forfait
                // and multiply it by the percentage of the payed price
                // and by 12 months (since each price is monthly)
                const forfait = c as ForfaitProps["forfait"];
                total += forfait["A partir de par mois"] * 12 * (valueOfPayement / 100);

                // Also, we need to add the name of the forfait to the list of products
                const freeMonth: number = 12 - (12 * (offer["Contenu"][contentID] / 100));
                productsNames.push(`Un forfait ${forfait["Nom"]} ${12 - freeMonth} mois + ${freeMonth} mois gratuit${freeMonth > 1 ? "s" : ""}`);

                // Also, we need to add the ID of the forfait to the list of IDs
                offerContentIDs["forfaits"].push(forfait["_id"]["$oid"]);
            }
        }
    });

    if (hues.length === 1) {
        hues.push(hues[0]);
    }

    return {
        total: total,
        productsNames: productsNames,
        hues: hues,
        offerContentIDs: offerContentIDs
    };
}


export default getOfferDetails;