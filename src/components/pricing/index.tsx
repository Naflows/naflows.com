import { useEffect, useState } from "react";
import { fetchPrices } from "../home/pricing";
import TitleContainer from "../main/title-container";
import type { ForfaitProps } from "../../interface-types/interface/forfait";
import PricingComponent from "./pricing-component";
import './index.scss';
import BasketComponent from "./basket/basket-component";
import type { ProductProps } from "../../interface-types/interface/product";
import type { OfferProps } from "../../interface-types/interface/offer";
import { useUpdateLink } from "./controlers/_useUpdateLink";

const PricingPage = () => {
    const [displayedForfait, setDisplayedForfait] = useState<string>("");
    const [lastScrolLLevel, setLastScrollLevel] = useState<number>(0);
    
    const [currentProducts, setCurrentProducts] = useState<Array<ProductProps["product"]>>([]);
    const [currentForfaits, setCurrentForfaits] = useState<Array<ForfaitProps["forfait"]>>([]);
    const [currentOffer, setCurrentOffer] = useState<OfferProps["offer"] | undefined>(undefined);
    
    const [accurateOffer, setAccurateOffer] = useState<OfferProps["offer"] | null>();
    const [prices, setPrices] = useState<Array<ForfaitProps['forfait'] | ProductProps["product"] | OfferProps["offer"]>>([]);

    const [forceLoad, setForceLoad] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            await fetchPrices(setPrices);
        }
        fetchData();
    }, []);



    useUpdateLink(
        prices,

        forceLoad,
        setForceLoad,

        currentForfaits,
        currentOffer,
        currentProducts,

        setCurrentForfaits,
        setCurrentOffer,
        setCurrentProducts
    );

    return (
        <>
            <TitleContainer
                titleComponent={ <span> Avec Naflows, bénéficiez de <span id="colorful">support technique</span> à <span id="colorful">long terme</span>. </span> }
                descriptionComponent={ <> Naflows met à disposition des forfaits annualisés pour apporter une aide réactive à tout problème. </> }
            />

            <div className="pricing-global__container" id="_pricing">
                <div className="pricing-global__container__informations">
                    <div className="pricing-global__title">
                        <h2>Nos forfaits Long Time Support¹</h2>
                        <p>Ces forfaits sont facturés à l'année et soumis à un quota mensuel d'heures allouées.</p>
                    </div>
                    <div className="pricing-global__container_forfaits">
                        {
                            prices ? prices.map((price, index) => {
                                if (price["Catégorie"] == "forfait") {
                                    const p = price as ForfaitProps['forfait'];
                                    return (
                                        <PricingComponent
                                            forfait={p}
                                            key={index}
                                            setLastScrollLevel={setLastScrollLevel}
                                            lastScrollLevel={lastScrolLLevel}
                                            displayedForfait={displayedForfait}
                                            setDisplayedForfait={setDisplayedForfait}
                                            currentForfaits={currentForfaits}
                                            setCurrentForfaits={setCurrentForfaits}
                                            prices={prices}
                                            setForceLoad={setForceLoad}
                                        />
                                    )
                                }
                            }) : <p>Loading...</p>
                        }
                    </div>

                </div>
                <BasketComponent
                    currentForfaits={currentForfaits}
                    prices={prices}
                    currentProducts={currentProducts}
                    accurateOffer={accurateOffer || null}
                    setAccurateOffer={setAccurateOffer}
                    setForceLoad={setForceLoad}
                    setCurrentProducts={setCurrentProducts}
                    setCurrentForfaits={setCurrentForfaits}
                    setCurrentOffer={setCurrentOffer}
                    currentOffer={currentOffer ? currentOffer : prices.find((price) => price["Catégorie"] == "offre" && price["_id"]["$oid"] == currentOffer) as OfferProps["offer"]}
                />
            </div>
        </>
    )
}

export default PricingPage;