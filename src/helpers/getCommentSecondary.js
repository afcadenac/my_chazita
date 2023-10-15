

export const getCommentSecondary = (comment={},commentState=[]) => {
    let comments=[];
    let newComment={...comment}
    let currentComment=false

    do {
        currentComment=false
        for (const com of commentState) {
            if(com.idComment===newComment._id){
                currentComment=true;
                
                newComment=com;
                comments.push(newComment);
                break;
            }
        }
    } while (currentComment);

    return comments;
}
