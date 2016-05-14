$(document).ready(function() {
    console.log("jQuery initialized");

    $('#submit').click(function(event) {
        event.preventDefault();
        var img = $('.img').val();
        var comment = $('.comment').val();
        var item = {
            image: img,
            text: comment
        };
        console.log(item);
        $.post('/post', item, function(data) {
            console.log(data)
            // if (err){
            //     console.log(err)
            // }
            //     else{
            // console.log(item)
            // res.send(item);
            //     }
        });
        $('.img').val("");
        $('.comment').val("");
        $('#submit').attr("disabled", true);
    })
});

//[req.query.text, req.query.img]