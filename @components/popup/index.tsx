import '../../@styling/components/popup.scss';

const NaflowsPopup = ({
    type,
    title,
    content
} : {
    type: string;
    title: string;
    content: string;
}) => {
    return (
        <div className="naflows-popup-box" id={`naflows-popup-box-${type}`}>
            <div className="naflows-popup-content">
                <div className="naflows-popup-title" style={{
                    display : title ? "block" : "none"
                }}>
                    {title}
                </div>
                <div className="naflows-popup-body">
                    {content}
                </div>
            </div>
        </div>
    )
}


export default NaflowsPopup;