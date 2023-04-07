import "./EditComments.css";

import { useEffect } from "react";

import { useForm } from "../../../../hooks/useForm";
import * as commentsService from "../../../../services/commentsService";

export const EditComments = ({
    onCloseEdit,
    onEditCommentSubmit,
    editCommentId
}
) => {

    const { values, changeHandler, onSubmit, changeValues, submitError } = useForm({
        _id: "",
        comment: "",

    }, onEditCommentSubmit);

    useEffect(() => {
        commentsService.getOne(editCommentId)
            .then(result => {
                changeValues(result);
            });
    }, [editCommentId]);

    return (

        <article className="edit-comment">
            <label><h3>Edit comment:</h3></label>
            <form className="edit-comment-form" onSubmit={onSubmit}>
                <textarea name="comment" value={values.comment} onChange={changeHandler}></textarea>
                <input type="submit" className="edit-comment-submit" value="Edit Comment" />
                <button className="edit-comment-btn" type="button" onClick={onCloseEdit}>Cancel</button>
            </form>

            {submitError &&
                <p className="error-comment">
                    {submitError}
                </p>
            }
        </article>


    );
};