$(document).ready(function()
{
    $(".delete-art").on('click',function(e)
{
    const id = $(e.target).attr('data-id');
    $.ajax(
        {
            type:'DELETE',
            url:'/articles/'+id,
            success:function(){alert("Successful deletion..");window.location.href="/articles";},
            error: function(err){console.log(err);}
        }



    );
})});