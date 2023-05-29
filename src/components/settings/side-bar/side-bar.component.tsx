import { useNavigate, useParams } from 'react-router'
import ShowTimer from '../../base/show-timer/show-timer.component'
import './side-bar.css'
import { ISection } from '../../../interfaces';
import useSection from '../../../hooks/pages/section.hook';

const SideBarItem = ({ listItem, isSelected, className }: { listItem: { title: string, route: string }, isSelected?: boolean, className?: string }) => {
  const navigate = useNavigate();
  return <li onClick={() => { navigate(`/settings/${listItem.route}`) }} className={`${className ? className : ``}${isSelected ? ` selected` : ``}`}>{listItem.title}</li>
}

const SideBar = () => {
  const { sectionType } = useSection();
  const listItems = Object.values(ISection.SectionInfo);

  return <ul className="side-bar">
    {listItems.map((listItem, i) => <ShowTimer key={listItem.route} timeout={80 * i}><SideBarItem key={listItem.route} isSelected={ISection.SectionInfo[sectionType].route == listItem.route} listItem={listItem}></SideBarItem></ShowTimer>)}
  </ul>
}

export default SideBar;