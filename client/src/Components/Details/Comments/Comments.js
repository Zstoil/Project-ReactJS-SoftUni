import "./Comments.css";

import { useForm } from "../../../hooks/useForm";


export const Comments = ({
    onCommentSubmit,
}) => {
    const { values, changeHandler, onSubmit, submitError } = useForm({
        comment: ''
    }, onCommentSubmit);
console.log(submitError);
    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form onSubmit={onSubmit}>
                <textarea 
                name="comment" 
                placeholder="Comment......" 
                value={values.comment}  
                onChange={changeHandler}
                ></textarea>
                <input type="submit" value="Add Comment" />
            </form>
        
        { submitError &&
            <p className="error-comment">
                {submitError}
            </p>
        }
        
        </article>
    );
};