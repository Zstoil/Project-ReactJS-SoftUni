import "./Catalog.css";

import { useContext } from "react";

import { CatalogItem } from "./CatalogItem/CatalogItem";
import { CarContext } from "../../contexts/CarContext";


export const Catalog = () => {
       
    const {cars} = useContext(CarContext);
    return (
        <div className="all-cars">
    <h2>All Cars</h2>
    <div className="gallery">
        
       {cars.map(x => <CatalogItem key={x._id} {...x} />)}

        {cars.length === 0 && (
            <h3 className="no-cars">No cars yet</h3>
        )}
    
    </div>

   
</div>
    );
}