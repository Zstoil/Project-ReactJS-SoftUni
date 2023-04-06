import "./DeleteModal.css";

export const DeleteModal = ({
 car,
  onClose,
  onDeleteClick,
}) => {
    return(
        <div className="confirm-container">
              <h2>Are you sure you want to delete this car model: {car.model} ?</h2>
              
            <div className="actions">
              <div className="actions-btn">
                <button id="action-del" className="btn" type="submit" onClick={onDeleteClick}>Delete</button>
                <button id="action-cancel" className="btn" type="button" onClick={onClose}>Cancel</button>
              </div>
                
              
            </div>
          </div>
    )
}