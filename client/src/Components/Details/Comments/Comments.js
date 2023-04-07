import "./Comments.css";

import { useForm } from "../../../hooks/useForm";


export const Comments = ({
    onCommentSubmit,
}) => {
    const { values, changeHandler, onSubmit, submitError } = useForm({
        comment: ''
    }, onCommentSubmit);

    return (
        <article className="create-comment">
            <label><h3>Add new comment:</h3></label>
            <form className="create-comment-form" onSubmit={onSubmit}>
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