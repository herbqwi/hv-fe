import './info-card.css'

interface IProps {
  title: string,
  info: string,
  mini?: boolean,
  backgroundColor: string,
}

const InfoCard = ({ title, info, mini, backgroundColor }: IProps) => {
  return <div className={`info-card-container${mini ? ` mini` : ``}`} style={{ backgroundColor }}>
    <div className="contents">
      <h2>{title}</h2>
      <h1>{info}</h1>
      <p>+15%</p>
    </div>
  </div>
}

export default InfoCard;