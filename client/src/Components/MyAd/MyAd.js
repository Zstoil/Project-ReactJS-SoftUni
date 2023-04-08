import "./MyAd.css";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import * as carService from "../../services/carService";
import { CatalogItem } from "../Catalog/CatalogItem/CatalogItem";

export const MyAd = () => {
    
    const { userId } = useContext(AuthContext);
    const [ads,setAds] = useState([]);

    
    useEffect(() => {
        carService.getAll()
            .then(result => {
               setAds(result.filter(ad => ad._ownerId === userId))
            });
    },[]);

    return (
        <div>
        <h2>My Ads</h2>
        <div className="gallery">
           
        {ads.map(x => <CatalogItem key={x._id} {...x} />)}

        {ads.length === 0 && (
            <h3 className="no-ads">No ads yet!</h3>
        )}
        </div>
        </div>
    )
}