import PropTypes from 'prop-types';
import Button from '../../../../components/modules/button';
import { useEffect, useRef, useState } from 'react';

const Menu = ({ theme, isPhone, setTheme, appStorage, setInformationsView, setFirstConnection, setSearchProjects, setViewSearchBoxState, setSelectedProject, setViewProjectSelection, setProjectCreationComponentState }) => {
    const rollMenuRef = useRef(null);

    const [
        rollMenuView, setRollMenuView
    ] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (rollMenuRef.current && !rollMenuRef.current.contains(event.target)) {
                setRollMenuView(false);
                rollMenuRef.current.classList.add('menu-parameters-disappear');
                setTimeout(() => {
                    rollMenuRef.current.classList.remove('menu-parameters-disappear');
                }, 500);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    
    return (
        <div className={`menu view`}>
            <div className="logotype">
                <svg id="shortmenu" width="633" height="634" viewBox="0 0 633 634" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M165.614 166.308H175.614C203.228 166.308 225.614 188.693 225.614 216.308V497.536H215.614C188 497.536 165.614 475.15 165.614 447.536V166.308Z" fill="#1759A6"/>
                    <path d="M171.94 369.746C168.134 364.613 166.08 358.392 166.08 352.002V314.986C166.08 306.729 169.475 298.835 175.468 293.155L205.876 264.337C213.809 256.82 226.878 262.535 226.744 273.463V273.463L226.815 279.077C226.974 291.812 237.344 302.052 250.08 302.052V302.052H334.08H452.08C479.694 302.052 502.08 324.438 502.08 352.052V361.841H334.08H250.08V361.841C236.598 361.841 225.668 372.771 225.668 386.253V412.961V412.961C225.668 422.274 213.789 426.197 208.243 418.715L171.94 369.746Z" fill="#1759A6"/>
                    <path d="M292.08 496.997V433.221H501.794V446.997C501.794 474.611 479.408 496.997 451.794 496.997H292.08Z" fill="#1759A6"/>
                    <path d="M318.335 233.702C300.723 233.702 286.447 219.425 286.447 201.814V201.814C286.447 184.203 300.723 169.926 318.335 169.926H329.938V233.702H318.335Z" fill="#1759A6"/>
                    <path d="M367.08 233.221V170.221H395.58C412.977 170.221 427.08 184.324 427.08 201.721V201.721C427.08 219.118 412.977 233.221 395.58 233.221H367.08Z" fill="#1759A6"/>
                </svg>
            </div>
            <div className="menu-content">
                <div className="section">
                    <Button
                        icon='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>'
                        text="Rechercher"
                        className='primary justify-start'
                        onClick={() => {
                            setSearchProjects([]);
                            setViewSearchBoxState(true);
                        }}
                    />
                    <Button 
                        icon='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-120q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm544-528 56-56-56-56-56 56 56 56Z"/></svg>'
                        text="Ecrire"
                        onClick={() => {
                            setSelectedProject(null);
                            setViewProjectSelection(true);
                        }}
                        className="primary add-project justify-start"
                    />
                    <Button 
                        icon='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>'
                        text="Nouveau projet"
                        onClick={() => setProjectCreationComponentState(true)}
                        className="primary add-project justify-start"
                    />
                </div>
                <div className="section" id="menu-roll">
                    <div className="roll-up-menu width100">
                        <Button
                            icon='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120q-17 0-28.5-11.5T440-160v-160q0-17 11.5-28.5T480-360q17 0 28.5 11.5T520-320v40h280q17 0 28.5 11.5T840-240q0 17-11.5 28.5T800-200H520v40q0 17-11.5 28.5T480-120Zm-320-80q-17 0-28.5-11.5T120-240q0-17 11.5-28.5T160-280h160q17 0 28.5 11.5T360-240q0 17-11.5 28.5T320-200H160Zm160-160q-17 0-28.5-11.5T280-400v-40H160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h120v-40q0-17 11.5-28.5T320-600q17 0 28.5 11.5T360-560v160q0 17-11.5 28.5T320-360Zm160-80q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520h320q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H480Zm160-160q-17 0-28.5-11.5T600-640v-160q0-17 11.5-28.5T640-840q17 0 28.5 11.5T680-800v40h120q17 0 28.5 11.5T840-720q0 17-11.5 28.5T800-680H680v40q0 17-11.5 28.5T640-600Zm-480-80q-17 0-28.5-11.5T120-720q0-17 11.5-28.5T160-760h320q17 0 28.5 11.5T520-720q0 17-11.5 28.5T480-680H160Z"/></svg>'
                            text="Paramètres"
                            onClick={() => {
                                setRollMenuView(!rollMenuView);
                            }}
                            className={`primary justify-start width100`}
                        />
                    </div>
                    <div className={
                        `roll-up-menu-content ${rollMenuView ? "view" : ""}`
                    }
                        ref={rollMenuRef}
                        style={{
                            display: rollMenuView ? 'flex' : 'none'
                        }}
                    >
                        <div className="back" 
                        onClick={() => {
                            setRollMenuView(false);
                        }}
                        style={{
                            display : (isPhone && rollMenuView ? "flex" : "none")
                        }}></div>
                        <div className="buttons-container">
                            <Button
                                icon={
                                    theme == "light" ? '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120q-151 0-255.5-104.5T120-480q0-138 90-239.5T440-838q13-2 23 3.5t16 14.5q6 9 6.5 21t-7.5 23q-17 26-25.5 55t-8.5 61q0 90 63 153t153 63q31 0 61.5-9t54.5-25q11-7 22.5-6.5T819-479q10 5 15.5 15t3.5 24q-14 138-117.5 229T480-120Z"/></svg>'
                                    : '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm720 0q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440h-80ZM480-760q-17 0-28.5-11.5T440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760Zm0 720q-17 0-28.5-11.5T440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 28.5T480-40ZM226-678l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226-678Zm494 495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734-282l43 42q12 11 11.5 28T777-183q-12 12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678-734l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 28l-43 42q-12 11-28 11t-28-11ZM183-183q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282-226l-42 43q-11 12-28 11.5T183-183Z"/></svg>'
                                }
                                text={
                                    theme === "light" ? "Mode sombre" : "Mode clair"
                                }
                                onClick={() => {
                                    setTheme(theme === "light" ? "dark" : "light");
                                    appStorage.setTheme(theme === "light" ? "dark" : "light");
                                }}
                                className={`secondary justify-start`}
                            />
                            <Button
                                icon='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>'
                                text="Informations"
                                onClick={() => setInformationsView(true)}
                                className={`secondary justify-start`}
                            />
                            <Button 
                                icon='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>'
                                text="Aide"
                                onClick={() => setFirstConnection(true)}
                                className={`secondary justify-start`}
                            />
                            <Button
                                icon='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h560v-240q0-17 11.5-28.5T800-480q17 0 28.5 11.5T840-440v240q0 33-23.5 56.5T760-120H200Zm560-584L416-360q-11 11-28 11t-28-11q-11-11-11-28t11-28l344-344H600q-17 0-28.5-11.5T560-800q0-17 11.5-28.5T600-840h200q17 0 28.5 11.5T840-800v200q0 17-11.5 28.5T800-560q-17 0-28.5-11.5T760-600v-104Z"/></svg>'
                                text="Mises à jour"
                                className={`secondary justify-start`}
                                onClick={() => {
                                    window.open("https://www.naflouille-creations.com/devblog/");
                                }}
                            /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Menu.propTypes = {
    theme: PropTypes.string,
    isPhone: PropTypes.bool,
    setTheme: PropTypes.func,
    appStorage: PropTypes.object,
    setInformationsView: PropTypes.func,
    setFirstConnection: PropTypes.func,
    setSearchProjects: PropTypes.func,
    setViewSearchBoxState: PropTypes.func,
    setSelectedProject: PropTypes.func,
    setViewProjectSelection: PropTypes.func,
    setProjectCreationComponentState: PropTypes.func,
};

export default Menu;