import AppButton from "../../../../../public/modules/utilities/buttons/visual";
import { popup } from "../../../../../public/modules/utilities/popup";
import appSvg from "../../../../../public/modules/utilities/svg";
import Switch from "../../../../../public/modules/utilities/switch";
import '../../../public/style/article/body.css';
import { storage } from "../../storage/access";
import EditorSettings from "./editor";
import DownloadButton from "./download";
import DisplayRender from "./render";
import DisplayUpload from "./upload";

export function displayManagement(d)  {
    const Storage = storage.access('SesAPIParameters');
    Storage.enableInfoBox = !Storage.enableInfoBox;
    storage.set(Storage,'SesAPIParameters');
    const i = document.querySelectorAll('.info-box');
    if (i) {
        Array.from(i).forEach((i) => {
            i.style.display = d;
        })
    }
}

export function buttonOpacity(d) {
    // true for disabling

    const Storage = storage.access('SesAPIParameters');
    Storage.disableOpacity = !Storage.disableOpacity;
    storage.set(Storage,'SesAPIParameters');
    if (d) {
        const t = document.querySelectorAll('.filled');
        if (t) {
            Array.from(t).forEach((i) => {
                i.classList.remove("filled");
                i.classList.add('blank');
                i.classList.add('parameterblank');
            })
        }
    } else {
        const t = document.querySelectorAll('.parameterblank');
        if (t) {
            Array.from(t).forEach((i) => {
                i.classList.remove("parameterblank");
                i.classList.remove('blank');
                i.classList.add('filled');
            })
        }
    }
}

export const BetaView = () => {
    const Storage = storage.access('SesAPIParameters');
    Storage.enableSecondView = !Storage.enableSecondView;
    storage.set(Storage,'SesAPIParameters');
};

const Toolsbar = () => {


    return (
      <div className="toolsbar">
        <div className="left-container">
            <a href='/SesAPI/'>
            {appSvg.new('logotype')}
            </a>
            <div className="tools">
                <EditorSettings />
                <DownloadButton />
                <DisplayRender />
                <DisplayUpload />
            </div>
        </div>

        <div className="save-update">
          {appSvg.new('check')}
          <div className="container">
            <div className="value"></div>
            <div className="info"></div>
          </div>
        </div>
      </div>
    )
  };


export default Toolsbar;