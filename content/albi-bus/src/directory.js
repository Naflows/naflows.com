import get from "./mods/query/get"

export const InnerAPI = {
    get : async function(directory) {
        const c = await get(directory);
        return c;
    }
}