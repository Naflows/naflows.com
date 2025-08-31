import type { JSX } from "react"

interface AdvantageCardProps {
    svg: JSX.Element,
    title: string,
    description: string
}

const AdvantageCard = ({
    svg,
    title,
    description
}: AdvantageCardProps) => {
    return (
        <div className="advantages__card">
            {svg}
            <div className="advantages__card__body">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}


export default AdvantageCard;