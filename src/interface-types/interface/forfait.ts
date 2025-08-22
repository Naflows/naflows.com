interface ForfaitProps {
    forfait: {
        "_id": { "$oid": string },
        "Nom": string,
        "Heures max par mois": number,
        "A partir de par mois": number,
        "Description": Array<string>,
        "Catégorie": string,
    }
}

export type { ForfaitProps }