interface ProductProps {
    product: {
        _id: {
            $oid: string;
        };
        "Nom" : string;
        "A partir de" : number;
        "Nombre d'heures théoriques minimal" : number;
        "Durée en semaines" : number,
        "Catégorie" : string;
        "A propos" : string;
        "Phrase d'accroche" : string;
        "Inclus" : Array<string>;
        "Public ciblé" : Array<string>;
        "Hue" : string;
    };
}

export type { ProductProps };