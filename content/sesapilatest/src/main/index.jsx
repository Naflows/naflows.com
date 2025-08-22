import StorageRender from "./storage/render";
import { storage } from "../../editor/edit/src/storage/access";
import { InfoBar } from "../App";
import { useState } from "react";


const MainRendering = () => {
    const [ storageDisplay, setStorageDisplay ] = useState(1);

    const st = storage.access().articles;
    console.log(st)
    return (
        <div className="home-main-render">
            <InfoBar active={"Drive"}/>
            <StorageRender s = {st} storageDisplay= {storageDisplay} />
        </div>
    )
};

export default MainRendering;