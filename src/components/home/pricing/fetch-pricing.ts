import type { ForfaitProps } from "../../../interface-types/interface/forfait";
import type { OfferProps } from "../../../interface-types/interface/offer";
import type { ProductProps } from "../../../interface-types/interface/product";
import axios from "axios";

export async function fetchPrices(
    setPrices: React.Dispatch<
        React.SetStateAction<
            Array<
                OfferProps["offer"] | ForfaitProps["forfait"] | ProductProps["product"]
            >
        >
    >,
    setSelectedProductToDisplay?: React.Dispatch<
        React.SetStateAction<ProductProps["product"] | null>
    >
) {
    try {
        const response = await axios.get("/public/prices/prices.json");
        const data = response.data;
        console.log("Prices fetched:", data);
        setPrices(data);
        if (setSelectedProductToDisplay) {
            setSelectedProductToDisplay(data.filter((el: ProductProps["product"]) => el.Nom == "Site vitrine")[0]);
            console.log("Selected product:", data.filter((el: ProductProps["product"]) => el.Nom == "Site vitrine")[0]);
        }
    } catch (error) {
        console.error("Error fetching prices:", error);
    }
}

export default fetchPrices;