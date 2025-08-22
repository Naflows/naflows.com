import AppButton from "../../../../../public/modules/utilities/buttons/visual";
import { ExternalDownload } from "../../../../../src/main/storage/render/components/box_render";
import save from "../../modules/save";
import { DefaultArticle } from "../body";


const DownloadButton = () => {
    save(DefaultArticle);
    return (
        <AppButton
            type="blank"
            container={{text : "Download"}}
            action={() => ExternalDownload(DefaultArticle)}      
        />
    )
};

export default DownloadButton;