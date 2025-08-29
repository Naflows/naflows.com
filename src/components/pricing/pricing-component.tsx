import type { ForfaitProps } from "../../interface-types/interface/forfait";
import React, { useEffect } from "react";
import type { ProductProps } from "../../interface-types/interface/product";
import type { OfferProps } from "../../interface-types/interface/offer";



const PricingComponent = ({
    forfait, displayedForfait, setDisplayedForfait,
    lastScrollLevel, setLastScrollLevel,
    currentForfaits, setCurrentForfaits,
    prices, setForceLoad
}: {
    forfait: ForfaitProps['forfait'];
    displayedForfait: string;
    lastScrollLevel: number;
    currentForfaits: Array<ForfaitProps["forfait"]>;
    setCurrentForfaits: React.Dispatch<React.SetStateAction<Array<ForfaitProps["forfait"]>>>;
    setLastScrollLevel: React.Dispatch<React.SetStateAction<number>>;
    setDisplayedForfait: React.Dispatch<React.SetStateAction<string>>;
    prices: Array<ForfaitProps['forfait'] | ProductProps["product"] | OfferProps["offer"]>;
    setForceLoad: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

    const ref = React.useRef<HTMLDivElement>(null);
    const globalRef = React.useRef<HTMLDivElement>(null);



    useEffect(() => {
        window.scrollTo({ top: lastScrollLevel, behavior: "smooth" })
    }, [])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const forfaitIDs = urlParams.get("forfait");
        const forfaitIDsArray = forfaitIDs ? forfaitIDs.split(",") : [];
        const arrayOfForfait: Array<ForfaitProps["forfait"]> = forfaitIDsArray.map((id) => {
            return prices.find((price) => price["_id"]["$oid"] === id && price["Catégorie"] === "forfait") as ForfaitProps["forfait"];
        });
        setCurrentForfaits(arrayOfForfait);
    }, []);


    return (
        <div className="pricing-global__container__forfait" ref={globalRef} style={{
            height: displayedForfait != forfait["_id"]["$oid"] ? `44px` : `fit-content`,
            overflow: "hidden",
            borderColor: "var(--primary-hue-1)",
        }}>
            <div className="pricing-global__forfait__header" ref={ref} onClick={() => {
                setLastScrollLevel(window.scrollY);
                setDisplayedForfait(displayedForfait == forfait["_id"]["$oid"] ? "" : forfait["_id"]["$oid"]);
            }}>
                <div className="pricing-global__forfait__header__left">
                    <button className="pricing-tag__container action-button primary-button fit-content" onClick={() => {
                        setLastScrollLevel(window.scrollY);
                        setDisplayedForfait(displayedForfait == forfait["_id"]["$oid"] ? "" : forfait["_id"]["$oid"]);
                    }}>
                        <svg style={{
                            transform: displayedForfait == forfait["_id"]["$oid"] ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease-in-out",
                        }} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.68821 31.3801C4.74645 28.1736 7.02107 23 11.3726 23H88.6274C92.9789 23 95.2535 28.1736 92.3118 31.3802L53.6844 73.484C51.7029 75.6438 48.2971 75.6438 46.3156 73.484L7.68821 31.3801Z" fill="#3E4DED" />
                        </svg>
                    </button>
                    <div className="pricing-global__forfait__header__informations" >
                        <h4>
                            {forfait["Nom"]}
                        </h4>
                        <p>
                            {currentForfaits.includes(forfait) ? "Ajouté au devis" : ""}
                        </p>
                    </div>
                </div>
                <div className="pricing-global__forfait__header__price">
                    <p>
                        {forfait["A partir de par mois"]} € / mois
                    </p>
                </div>
            </div>

            <div className="pricing-global__forfait__description">
                <ul>
                    {
                        forfait["Description"].map((item, index) => {
                            return (
                                <li key={index}>{item}</li>
                            )
                        })
                    }
                </ul>
            </div>

            <button onClick={() => {
                const currentID = forfait["_id"]["$oid"];
                if (currentForfaits.includes(forfait)) {
                    const forfaitsArray = currentForfaits.filter((forfait) => {
                        if (forfait) {
                            return forfait["_id"]["$oid"] !== currentID;
                        }
                    });
                    setCurrentForfaits(forfaitsArray);
                } else {
                    const forfaitsArray = [...currentForfaits];
                    forfaitsArray.push(forfait);
                    setCurrentForfaits(forfaitsArray);
                }
                setForceLoad(true);
            }} className="pricing-global__forfait__button button action-button primary-button">
                <span>{
                    currentForfaits.includes(forfait) ? "Supprimer du devis" : "Ajouter au devis"
                }</span>
            </button>
        </div>
    )
}

export default PricingComponent;