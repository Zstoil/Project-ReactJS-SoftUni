import { CatalogItem } from "./CatalogItem/CatalogItem";

export const Catalog = ({
    cars,
}) => {
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