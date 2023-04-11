function sendFriendRequest(self) {
    let id = $(self).data('to');
    
    $.ajax({
        type : 'get',
        url : '/friend/add',
        data : {to : $(self).data('to')},
        success : function (data) {
            console.log('data');
            $(`#user-${id}`).remove();
        },
        error : function (error) {
            console.log('error');
        }
    });
}
function acceptFriendRequest(self) {
    let id = $(self).data('id');
    let to = $(self).data('to');
    let name = $(self).data('name');
    let addFriend = addFriendDOM(to, name);
    $('#friends-list').prepend(addFriend);
    $.ajax({
        type: 'get',
        url: '/friend/accept',
        data: { 
            to: $(self).data('to'),
            id: $(self).data('id')
        },
        success: function (data) {
            console.log('data');
            
            $(`#name-${id}`).remove();
            $(`#button-${id}`).remove();
            
        },
        error: function (error) {
            console.log('error');
        }
    })
}

let addFriendDOM =function (to, name) {
    return $(`
     <li>
        <div class="username">
            <a href="/user/profile/${to}">
                ${name}
            </a>
        </div>
         </li>
    `);
}