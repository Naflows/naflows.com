

interface OfferProps {
    offer: {
        "_id": {
            "$oid": string
        },
        "Nom": string,
        "Contenu": Record<string, number>,
        "Catégorie": string,
    }
}

export type { OfferProps };