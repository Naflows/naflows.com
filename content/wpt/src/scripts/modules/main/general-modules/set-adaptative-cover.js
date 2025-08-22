import appStorage from "../storage-management/directory";


const setAdaptativeCover = () => {
    return  appStorage.get().theme == "light" ? 
    "/public/resources/placeholders/cover_placeholder_white_theme.png" :
    "/public/resources/placeholders/cover_placeholder_black_theme.png"
};

export default setAdaptativeCover;