import React from "react";
import ReactDOM from "react-dom";

export const SetLoaderStatus = (state, parent) => {
  if (!parent) {
    console.error("Error: the parsed parent does not contain any loader.");
    return;
  }

  const loader = parent.querySelector(".loader-container");

  if (!loader) {
    console.error("No loader is currently active.");
    return;
  }

  if (state === false) {
    loader.remove();
  }
};

const SetLoader = (parent) => {
  const portalRoot = parent;
  const portal = ReactDOM.createPortal(
  <div className="loader-container">
    <div className="loader"></div>
  </div>, portalRoot);
  ReactDOM.render(portal, portalRoot);
};

export default SetLoader;
