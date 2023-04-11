let likeListenser = function() {
    const likes = document.querySelectorAll(' .like');
    likes.forEach((like) => {
        like.addEventListener('click', (event) => {
            event.preventDefault();
            // console.log("Id :", $(like).data('id'));
            // console.log("Type :", $(like).data('type'));
            var id = $(like).data('id');
            $.ajax({
                type: 'get',
                url: $(like).prop('href'), //value of href froma  tag
                data : {
                    id: $(like).data('id'),
                    type: $(like).data('type')
                },
                success: function (data) {
                    let noty;
                    console.log('liked');
                    if (data.data.deleted) noty = notification("Unliked Successfully", "success");
                    else noty = notification("Liked Successfully", "success");
                    $(`#like-${id}`).html(data.data.likes);
                    $('#flash-message').append(noty);
                },
                error: function (xhr, status, error) {
                    let noty = notification("Post Not Able To Like", "error");
                    $('#flash-message').append(noty);
                    console.log('Error: ' + error);
                }
            });
        });
    });
}



let createPost = function () {
    $('#new-post-form').submit(function (event) {
        var postId;
        event.preventDefault();
        // Serialize the form data to a JSON string
        var formData = JSON.stringify($(this).serializeArray());
        // Send an AJAX request to the server
        $.ajax({
            type: 'POST',
            url: '/post/create',
            data: $(this).serialize(),
            success: function (response) {
                var id = response.data.post._id;
                console.log('id ::: ', id);
                // Handle the successful response here
                let newPost = newPostDom(response.data);
                $('#text-content').val('');
                $('#post-list-container>ul').prepend(newPost);
                let noty = notification("Post Added Successfully", "success");
                $('#flash-message').append(noty);
                deletePost($(' .post-delete', newPost));
                commentListener($(' .post-comment', newPost));
                //likeListenserDynamic($(' .like', newPost));
                let toggleLike = new ToggleLike($(' .like', newPost));
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error);
            }
        });

    });
}   

let newPostDom = function (response) {
  
    var date = new Date(response.post.updatedAt);
    var dateString = date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    return $(`
            <li id="post-${response.post._id}" class="post-list">
            <a class="post-delete" href="/post/delete/${response.post._id}" id="post-delete-${response.post._id}"style="border: blue solid 2px; padding : 1px 5px; border-radius: 15%; box-shadow: 2px 2px 1px blue;">X</a> &nbsp;&nbsp;
            ${response.post.content}
            <div style="padding: 5px; margin-left: 30px;">
                <form action="/comment/create" class="post-comment" id="post-comment-${response.post._id}" method="POST">
                        <input type="hidden" name="postId" value="${response.post._id}">
                        <input type="text" name="content"  id="comment-text-${response.post._id}" placeholder="Enter Your Comment.." required style="height: 20px; width: 400px; padding: 2px 5px;">
                        <button type="submit">Send</button>
                </form>
            </div>
            <div class="post-comments-list">
                <ul id="post-comments-${response.post._id}">
                </ul>
            </div>
            <br>
             <div style="display: inline;">
                <a href="/likes/toggle" data-type="Post" data-id="${response.post._id}" class="like" style="text-decoration: none;"> 
                    <img src="/icons/like_button.png" id="image1" style="height: 15px; width: 20px; object-fit: contain;">
                </a><p id="like-${response.post._id}" style="display: inline;">0</p> Likes
            </div>
            <div style="display: inline; padding: 5px; margin-left: 500px; border-bottom: lightgrey solid 1px;">
                <small><i> By : <u>${response.name}</u>, UpdatedAt : <u>${dateString}</u></i></small>
            </div>
        </li>
        <br>
    `);
}

let deletePost = function (deleteLink) {
    $(deleteLink).click(function (event) {
        event.preventDefault();
        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'), //value of href froma  tag
            success: function (data) {
                let noty = notification("Post Deleted Successfully", "success");
                $('#flash-message').append(noty);
                $(`#post-${data.data.posts_id}`).remove();
            },
            error: function (xhr, status, error) {
                let noty = notification("Error In Deleting Post", "success");
                console.log('Error: ' + error);
            }
        });
    });
}

let commentListener = function (commentLink) {
    console.log(commentLink);
    $(commentLink).submit((event)=>{
        event.preventDefault();
        $.ajax({
            type : 'POST',
            url : '/comment/create',
            data : commentLink.serialize(),
            success :function(data) {
                let newComment = newCommentDom(data.data);
                $(`#comment-text-${data.data.comment.post}`).val('');
                $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                let noty = notification("Comment Added Successfully", "success");
                $('#flash-message').append(noty);
                deleteComment($(' .comment-delete', newComment));
                //likeListenserDynamic($(' .like', newComment));
                let toggleLike = new ToggleLike($(' .like', newComment));
            },
            error : function (xhr, status, error) {
                let noty = notification("Error In Adding Comment", "success");
                console.log('Error: '+ error);
            }
        });
    });
}

let likeListenserDynamic = function (like) {
    $(like).click((event) =>{
        event.preventDefault();
        var id = $(like).data('id');
        $.ajax({
            type: 'get',
            url: $(like).prop('href'), //value of href froma  tag
            data: {
                id: $(like).data('id'),
                type: $(like).data('type')
            },
            success: function (data) {
                let noty;
                console.log('liked');
                if (data.data.deleted) noty = notification("Unliked Successfully", "success");
                else noty = notification("Liked Successfully", "success");
                $(`#like-${id}`).html(data.data.likes);
                $('#flash-message').append(noty);
            },
            error: function (xhr, status, error) {
                let noty = notification("Post Not Able To Like", "error");
                $('#flash-message').append(noty);
                console.log('Error: ' + error);
            }
        });
       
    });
}

let deleteComment = function (deleteLink){
    $(deleteLink).click((event) =>{
        event.preventDefault();
        $.ajax({
            type : 'GET',
            url : $(deleteLink).prop('href'),
            success : function(data) {
                let noty = notification("Comment Deleted Successfully", "success");
                $('#flash-message').append(noty);
                $(`#comment-${data.data.comment._id}`).remove();
            }, error: function (xhr, status, error) {
                console.log('Error: ' + error);
            }
        })
    })
}

let newCommentDom = function (data) {
    var date = new Date(data.comment.updatedAt);
    var dateString = date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    return $(`
        <li id="comment-${data.comment._id}" class="comment-list" style="border: skyblue solid 1px; padding: 5px 5px;">
            <a href="/comment/delete/${data.comment._id}" class="comment-delete" id="comment-delete-${data.comment._id}"style="border: blue solid 1px; padding : 0px 4px; border-radius: 15%; box-shadow: 2px 2px 1px blue;">X</a>&nbsp;&nbsp;
            ${data.comment.content} 
            <br>
            <div style="padding: 10px 10px;">
                <div style="display: inline;" >
                     <a href= "/likes/toggle" data-type="Comment" data-id="${data.comment._id}" class="like" style="text-decoration: none;">
                        <img src="/icons/like_button.png" id="image1" style="height: 13px; width: 20px; object-fit: contain;">
                    </a><p id="like-${data.comment._id}" style="display: inline;">0</p> Likes
                </div>
                <div style="display: inline; padding: 5px; margin-left: 400px;">
                   <small><i>By : <u> ${data.name} </u>, UpdatedAt : <u> ${dateString}</u></i></small>
                </div>
            </div>
            
        </li>
    `);
}

let notification = function (message, type) {
        return $(
            `<script> new Noty({
                theme : 'relax',
                type : '${type}',
                text : '${message}',
                layout : 'topRight',
                timeout : 500
            }).show();</script>`
        );
    }

createPost();

let allPostDelete = function () {
    const postsDelete = document.querySelectorAll(' .post-delete');
    postsDelete.forEach((postDelete) => {
        postDelete.addEventListener('click', (event) =>{
            event.preventDefault();
            $.ajax({
                type: 'get',
                url: $(postDelete).prop('href'), //value of href froma  tag
                success: function (data) {
                    let noty = notification("Post Deleted Successfully", "success");
                    $('#flash-message').append(noty);
                    $(`#post-${data.data.posts_id}`).remove();
                },
                error: function (xhr, status, error) {
                    console.log('Error: ' + error);
                }
            });
        });
    });
}


let allCommentDelete = function(){
    const commentsDelete = document.querySelectorAll(' .comment-delete');
    //console.log(commentsDelete);
    //console.log("------");
    commentsDelete.forEach((commentDelete) => {
        //console.log(commentDelete);
        commentDelete.addEventListener('click', (event) => {
            event.preventDefault();
            $.ajax({
                type : 'GET',
                url : $(commentDelete).prop('href'),
                success : function (data) {
                    let noty = notification("Comment Deleted Successfully", "success");
                    $('#flash-message').append(noty);
                    $(`#comment-${data.data.comment._id}`).remove();
                },
                error : function(xhr, status, error){
                    console.log('Error :' + error);
                }
            });
        });
    });
}

let allCommentListener = function () {
    const commentsListener = document.querySelectorAll(' .post-comment');
    commentsListener.forEach((commentListener) => {
        commentListener.addEventListener('submit',(event) => {
            console.log('I am here');
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/comment/create',
                data: $(commentListener).serialize(),
                success: function (data) {
                    let newComment = newCommentDom(data.data);
                    $(`#comment-text-${data.data.comment.post}`).val('');
                    $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                    let noty = notification("Comment Added Successfully", "success");
                    $('#flash-message').append(noty);
                    deleteComment($(' .comment-delete', newComment));
                },
                error: function (xhr, status, error) {
                    console.log('Error: ' + error);
                }
            })
        })
    });
}


allPostDelete();
allCommentDelete();
allCommentListener();
//likeListenser();





// {
//     // method to submit the form data using AJAX
//     let createPost = function () {

//         let newPostForm = $('#new-post-form');
//         newPostForm.submit(function (event) {
//             event.preventDefault(); // disables the normal event flow.
//             $.ajax({
//                 type: 'post',
//                 url: '/post/create',
//                 data: newPostForm.serialize(),   // converts form-data to json
//                 success: function (data) {
//                     let newPost = newPostDom(data.data);
//                     let noty = notification("Post Added Successfully", "success");
//                     $('#post-list-container>ul').prepend(newPost);
//                     $('#flash-message').append(noty);
//                     $('#text-content').val('');
//                    // deletePost($(' .delete-post-button', newPost));
//                     console.log(data.data.posts);
//                     const link = document.getElementById(`post-delete-${data.data.posts._id}`);
//                     console.log(link);
//                     document.getElementById(`post-${data.data.posts._id}`).addEventListener('click', (event) => {
//                         event.preventDefault();
//                         console.log('Prevented');
//                         $.ajax({
//                             type: 'get',
//                             url: link,
//                             success: function (data) {
//                                 let noty = notification("Post Deleted Successfully", "success");
//                                 $('#flash-message').append(noty);
//                                 $(`#post-${data.data.posts_id}`).remove();
//                             },
//                             error: function (error) {
//                                 console.log(error.responseText);
//                             }
//                         });
//                     });
//                 }, error: function (error) {
//                     notyFailure();
//                     console.log(error.responseText);
//                 }
//             });
//         });
//     }

//     // // method to delete a post from DOM
//     // let deletePost = function (deleteLink) {
//     //     $(deleteLink).click(function (event) {
//     //         event.preventDefault();
//     //         $.ajax({
//     //             type: 'get',
//     //             url: $(deleteLink).prop('href'), //value of href froma  tag
//     //             success: function (data) {
//     //                 let noty = notification("Post Deleted Successfully", "success");
//     //                 $('#flash-message').append(noty);
//     //                 $(`#post-${data.data.posts_id}`).remove();
//     //             },
//     //             error: function (error) {
//     //                 console.log(error.responseText);
//     //             }
//     //         });
//     //     })
//     //}

//     const deleteLink = function () {
//         const deleteLinks = document.querySelectorAll('.delete-post-button');
//         deleteLinks.forEach((link) => {
//             link.addEventListener('click', (event) => {
//                 event.preventDefault();
//                 $.ajax({
//                     type: 'get',
//                     url: link.getAttribute('href'),
//                     success: function (data) {
//                         let noty = notification("Post Deleted Successfully", "success");
//                         $('#flash-message').append(noty);
//                         $(`#post-${data.data.posts_id}`).remove();
//                     },
//                     error: function (error) {
//                         console.log(error.responseText);
//                     }
//                 });
//             });
//         });
//     }

//     const createComment = function () {
//         const createComments = document.querySelectorAll('.new-post-comment');
//         createComments.forEach((comment) => {
//             let commentPost = $(comment);
//             comment.addEventListener('submit', function (event) {
//                 event.preventDefault();
//                 $.ajax({
//                     type: 'post',
//                     url: '/comment/create',
//                     data: commentPost.serialize(),   // converts form-data to json
//                     success: function (data) {
//                         console.log(data);
//                         let noty = notification("Comment Added Successfully", "success");
//                         $('#flash-message').append(noty);
//                         comment.reset();
//                         let newComment = newCommentDom(data.data);
//                         $(`#post-comments-${data.data.post}`).prepend(newComment);

//                     }, error: function (error) {
//                         notyFailure();
//                         console.log(error.responseText);
//                     }
//                 });
//             });

//         });
//     }


//     const deleteComment = function () {
//         const deleteComments = document.querySelectorAll(' .new-comment');
//         deleteComments.forEach((comment) => {
//             comment.addEventListener('click', (event) => {
//                 event.preventDefault();
//                 $.ajax({
//                     type: 'get',
//                     url: comment.getAttribute('href'),
//                     success: function (data) {
//                         let noty = notification("Comment Delete Successfully");
//                         let id = comment.getAttribute('id');
//                         $('#flash-message').append(noty);
//                         $(`#comment-${id}`).remove();
//                     }
//                 });
//             });
//         });
//     }


//     // returns code for noty 
//     let notification = function (message, type) {
//         return $(`<script> new Noty({
//             theme : 'relax',
//             type : '${type}',
//             text : '${message}',
//             layout : 'topRight',
//             timeout : 500
//         }).show();</script>`);
//     }

//     // method to create the post in DOM
//     let newPostDom = function (posts) {
//         return $(`
//         <li id="post-${posts.posts._id}">
//                 <a class="delete-post-button" href="/post/delete/${posts.posts._id}" id="post-delete-${posts.posts._id}">X</a>
//             ${posts.posts.content}
//             <small><i>, By : <u>${posts.name}</u>, UpdatedAt : <u>${posts.posts.updatedAt}.toLocalString()</u></i></small>
//             <div class="post-comments">
                
//                     <form action="/comment/create" method="POST">
//                         <input type="hidden" name="postId" value="${posts._id}">
//                         <input type="text" name="content"  placeholder="Enter Your Comment.." required>
//                         <button type="submit">Send</button>
//                     </form>

//                 <div class="post-comments-list">
//                     <ul id="post-comments-${posts._id}">
                        
//                     </ul>
//                 </div>
//             </div>
//             <br>
//         </li>
//     `);
//     }

//     let newCommentDom = function (data) {
//         return $(`
//             <li id="comment-${data.id}" >
//                 ${data.content} :: <small><i>${data.name}</i></small>
//                 <a href="/comment/delete/${data.id}" class="new-comment" id="${data.id}">X</a>
//             </li>
//         `);
//     }
//     createPost();
//     deleteLink();
//     createComment();
//     deleteComment();

// }



