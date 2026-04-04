
type props = {
    data: Object
}

const Filter = ({data}: props) => {

    const filterName = (query:string) =>{
        console.log(query);
    }

    const debounce = (fn, delay) => {
        let timer;
        return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
        };
    };

    const debouncedSearch = debounce(filterName, 500);

    return(
        <>
            <h1>Filters</h1>
            <input type="text" onChange={(e)=>{filterName(e.target.value)}} />
        </>
    )
}

export default Filter;