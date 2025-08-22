export default interface Archive {
    id: string;
    name: string;
    date: string;
    description: string;
    svg: string;
  url: string;
  hue: string;
  contributors?: string[];
  status : "active" | "discontinued";
}
