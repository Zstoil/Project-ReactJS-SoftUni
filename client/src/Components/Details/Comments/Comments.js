import "./Comments.css";

import { useForm } from "../../../hooks/useForm";


export const Comments = ({
    onCommentSubmit,
}) => {
    const { values, changeHandler, onSubmit } = useForm({
        comment: ''
    }, onCommentSubmit);

    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form onSubmit={onSubmit}>
                <textarea name="comment" placeholder="Comment......" value={values.comment} onChange={changeHandler}></textarea>
                <input type="submit" value="Add Comment" />
            </form>
        </article>
    );
};