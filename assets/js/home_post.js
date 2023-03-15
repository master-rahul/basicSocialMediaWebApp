{
    // method to submit the form data using AJAX
    let createPost = function () {
        
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (event) {
            event.preventDefault(); // disables the normal event flow.
            $.ajax({
                type : 'post',
                url : '/post/create',
                data : newPostForm.serialize(),   // converts form-data to json
                success : function (data) {
                    let newPost = newPostDom(data.data.posts);
                    $('#post-list-container>ul').prepend(newPost);
                    $('#text-content').val('');
                    deletePost($(' .delete-post-button', newPost));
                }, error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
   
    // method to create the post in DOM

    let newPostDom = function (posts) {
        return $(`
            <li id="post-${posts._id}">
                    <a class="delete-post-button" href="/post/delete/${posts._id}">X</a>
                ${posts.content}
                <small><i>, By : <u>${posts.user.name}</u>, UpdatedAt : <u>${posts.updatedAt}.toLocalString()</u></i></small>
                <div class="post-comments">
                   
                        <form action="/comment/create" method="POST">
                            <input type="hidden" name="postId" value="${posts._id}">
                            <input type="text" name="content"  placeholder="Enter Your Comment.." required>
                            <button type="submit">Send</button>
                        </form>

                    <div class="post-comments-list">
                        <ul id="post-comments-${posts._id}">
                           
                        </ul>
                    </div>
                </div>
                <br>
            </li>`);
    }

    // method to delete a post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function(event){
            event.preventDefault();
            $.ajax({
                type: 'get',
                url : $(deleteLink).prop('href'), //value of href froma  tag
                success : function (data) {
                    $(`#post-${data.data.posts_id}`).remove();
                },
                error : function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }






    createPost();
}

