import './search-bar.css'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useParams from '../../../hooks/params.hook';

interface IProps {
    disabled: boolean,
}

const SearchBar = ({ disabled }: IProps) => {
    const [search, setSearch, compareSearch] = useParams('search')
    return <div className="search-bar">
        <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={14} color="gray" />
        <input disabled={disabled} placeholder='Search' className='search-bar' value={search} onChange={(e) => { setSearch(e.target.value) }} type="text" />
    </div>
}

export default SearchBar;