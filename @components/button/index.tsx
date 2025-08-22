import "../../@styling/components/button.scss";


export default function NaflowsButton({
    onUserClick = () => {},
    type='tertiary',
    style = null,
    content=[]
} : {
    onUserClick: () => void;
    type: string;
    style?: React.CSSProperties | null;
    content: React.ReactNode[];
}) {
    return (
        <button style={style || {}} onClick={onUserClick} className={type}>
            {content}
        </button>
    )
}

