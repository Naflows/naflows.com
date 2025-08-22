export default interface Article {
    id : string[];
    titles : {
        name : string,
        id : string
    }[];
    paragraphs : {
        [key: string]: string[]
    };
}