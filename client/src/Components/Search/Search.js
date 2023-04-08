import "./Search.css";

import { useContext, useState } from "react";

import { CarContext } from "../../contexts/CarContext";
import { CatalogItem } from "../Catalog/CatalogItem/CatalogItem";


export const Search = () => {

    const { filterCars, filteredCars } = useContext(CarContext)
    const [search,setSearch] = useState("");
    const [criteria,setCriteria] = useState("all");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
        filterCars(e.target.value,criteria)
    }

    const onChangeType = (e) => {
        setCriteria(e.target.value);
        filterCars(search,e.target.value)
    }

  const onSubmit = (e) => {
    e.preventDefault()
   
  } 

    return (
    <>
        <h1 className="search-h1">Find your car..</h1>
        <form className="search-form" onSubmit={onSubmit}>
            <div className="filter">
                <input 
                type="text" 
                name="model"
                value={search}
                className="search-value"
                placeholder="Search....."
                onChange={onChangeSearch}
                ></input>
                <select name="type" className="criteria" value={criteria} onChange={onChangeType}>
                    <option value="all" disabled selected >Select your option</option>
                    <option value="model">Model</option>
                    <option value="type">Type</option>
                    <option value="kilometers">Kilometers</option>
                    <option value="price">Price</option>
                </select>
                {/* <input type="submit"  className="search-submit" value="Search" ></input> */}
            </div>
        </form>

        
        <div className="all-cars-search">
            {filteredCars?.map(x => <CatalogItem key={x._id} {...x} />)}
        </div>
         
        
            
       
        
           
       



    </>
    );
};