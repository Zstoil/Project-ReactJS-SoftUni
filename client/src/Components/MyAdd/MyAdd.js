import "./MyAdd.css";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import * as carService from "../../services/carService";
import { CatalogItem } from "../Catalog/CatalogItem/CatalogItem";

export const MyAdd = () => {
    
    const { userId } = useContext(AuthContext);
    const [adds,setAdds] = useState([]);

    
    useEffect(() => {
        carService.getAll()
            .then(result => {
               setAdds(result.filter(add => add._ownerId === userId))
            });
    },[]);

    return (
        <div>
        <h2>My Adds</h2>
        <div className="gallery">
            
        {adds.map(x => <CatalogItem key={x._id} {...x} />)}

        {adds.length === 0 && (
            <h3 className="no-adds">No adds yet</h3>
        )}
        </div>
        </div>
    )
}