// Instantiate the Bootstrap carousel
$('.multi-item-carousel').carousel({
    interval: false
});

// for every slide in carousel, copy the next slide's item in the slide.
// Do the same for the next, next item.
$('.multi-item-carousel .item').each(function () {
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    if (next.next().length > 0) {
        next.next().children(':first-child').clone().appendTo($(this));
    } else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    }
});

function getHighlighted(src) {
    document.getElementById("image-stage").style.backgroundImage = "url(" + src + ")";
}

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var recipient = button.data('whatever'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    //modal.find('.modal-title').text('New message to ' + recipient);
});

function placeOrder() {
    $('#exampleModal').modal('hide');
    //send POST ajax request for placing the order
    var data = {};
    data.products_id = document.getElementById("products_id").value;
    data.quantity = document.getElementById("quantity").value;
    data.name = document.getElementById("name").value;
    data.phone = document.getElementById("phone").value;
    data.email = document.getElementById("email").value;
    data.address = document.getElementById("address").value;
    data.message = document.getElementById("message").value;
    $.ajax({
        //fetch categories from sever
        url: "./api/orders/",
        type: "POST",
        data: data,
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Categories fetch result is " + JSON.stringify(data.categories));
            console.log("A new order is created with id " + data.insertId);
            $('#orderPlaceModal').find('.modal-title').text("Congratulations! Your Order has been placed successfully...");
            $('#orderPlaceModal').modal('show');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            $('#orderPlaceModal').find('.modal-title').text("Order was not placed... Please try again");
            $('#orderPlaceModal').modal('show');
            //toastr.error("The error from server is --- " + jqXHR.responseJSON.message);
        }
    });
    return false;
}