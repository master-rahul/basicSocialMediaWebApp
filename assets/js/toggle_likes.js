class ToggleLike{
    
    constructor(toggleElement){
        let toggler = toggleElement;
        this.toggleLike(toggler);
    }
    toggleLike(toggler){
        $(toggler).click((event)=>{
            event.preventDefault();
            let self = this;
            var id = $(toggler).data("id");
            // console.log(toggler);
            // console.log(id);
            $.ajax({
                type : 'get',
                url: $(toggler).attr('href'),
                data : {
                    id: $(toggler).data('id'),
                    type: $(toggler).data('type')
                }
            })
            .done(function (data) {
                let noty;
                if (data.data.deleted) noty = notification("Unliked Successfully", "success");
                else noty = notification("Liked Successfully", "success");
                $(`#like-${id}`).html(data.data.likes);
                $('#flash-message').append(noty);
            })
            .fail(function (error) {
                let noty = notification("Post Not Able To Like", "error");
                $('#flash-message').append(noty);
                console.log('Error in Liking', error);
            })
        });
    }
}