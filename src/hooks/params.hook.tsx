import { useSearchParams } from "react-router-dom";


const useParams = (key: string) => {
    const [params, setParams] = useSearchParams();

    const setParam = (value: string) => {
        if (value == '') {
            params.delete(key)
        } else {
            params.set(key, value)
        }
        setParams(params);
    };

    const getParam = () => {
        const value = params.get(key);
        return value || ''
    }

    const toggleParam = () => {
        setParam((!(getParam() == `true`)).toString())
    }

    const compare = (str?: string) => {
        return str?.toLowerCase().includes(getParam().toLowerCase());
    }

    return [getParam(), setParam, compare, toggleParam] as const
}

export default useParams;