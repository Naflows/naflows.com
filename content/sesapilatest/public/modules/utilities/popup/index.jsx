import AppButton from "../buttons/visual";
import ReactDOM from "react-dom";
import '../../../styling/modules/index.css';


export const popup = {
  close : function() {
    const portalRoot = document.querySelector('.popup-container-dnd');
    const popupContainer = document.querySelector('.popupcontainer');
  
    portalRoot.classList.remove('active');
    if (popupContainer) popupContainer.remove();
    portalRoot.innerHTML = '';

    console.log('Popup removed')
  },
  new : function(content, buttons) {
    ActualizePopUp(content,buttons);
  }
}


function ActualizePopUp(content, buttons = []) {
  const portalRoot = document.querySelector('.popup-container-dnd');
  portalRoot.classList.add('active');

  const popupContainer = document.createElement('div');
  popupContainer.className = "popupcontainer";
  portalRoot.appendChild(popupContainer);

  if (!content.title) console.error('Error: missing a title for the popup module.');
  if (!buttons || buttons.length === 0) console.error('Error: missing proper actions for the popup module.');

  const t = content.title;
  const d = content.description;
  const b = buttons;
  console.log(buttons)
  const buttonsContainer = (
    <div className="buttons-container">
      {b.map((button, i) => {
        if (button != null) {
          return (
            <AppButton
              key={i}
              type={button.type}
              container={button.container}
              action={() => button.action()} 
              custom_properties={button.custom_properties}
              
            />
          )
        }
      })}
      <AppButton
        type="blank"
        container={{ text: content.customEndMessage || "Cancel" }}
        action={() => popup.close()}
      />
    </div>
  );

  const body = (
    <div className="popup">
      <div className="informations">
        <div className="title">
          {t}
        </div>
        {d ? 
          <div className="description">
            {d}
          </div> : null}
      </div>
      {
        content.code ? content.code : null
      }
      {buttonsContainer}
    </div>
  );

  const portal = ReactDOM.createPortal(body, portalRoot);


  ReactDOM.render(portal, popupContainer);

}

