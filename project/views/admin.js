var base_url = "http://localhost:3000";

document.onreadystatechange = function () {
    if (document.readyState == "interactive") {

    } else if (document.readyState == "complete") {
        populateColors(document.getElementById("colors"));
        populateOccasions(document.getElementById("occasion"));
        populateTags(document.getElementById("tags"));
        populateTypes(document.getElementById("product_type"));
        $(".chosen-select").chosen({enable_split_word_search: true, search_contains: true});
        enableImageRead();
    }
};

enableImageRead = function(){
    //Check File API support
    if(window.File && window.FileList && window.FileReader)
    {
        var filesInput = document.getElementById("product_images");

        filesInput.addEventListener("change", function(event){

            var files = event.target.files; //FileList object
            var output = document.getElementById("product_images_preview");

            for(var i = 0; i< files.length; i++)
            {
                var file = files[i];

                //Only pics
                if(!file.type.match('image'))
                    continue;

                var picReader = new FileReader();

                picReader.addEventListener("load",function(event){

                    var picFile = event.target;

                    var div = document.createElement("div");

                    div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
                        "title='" + picFile.name + "'/>";

                    output.insertBefore(div,null);

                });

                //Read the image
                picReader.readAsDataURL(file);
            }

        });
    }
    else
    {
        console.log("Your browser does not support File API");
    }
};

function populateTypes(element) {
    $.ajax({
        //fetch categories from sever
        url: base_url + "/api/product_types/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Categories fetch result is " + JSON.stringify(data.categories));
            console.log("product_types fetched are " + JSON.stringify(data.product_types));
            fillProductTypesSelect(element, data.product_types);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for product_types fetch is --- " + jqXHR.responseJSON.message);
        }
    });
}

function fillProductTypesSelect(sel, options) {
    if (options.constructor !== Array) {
        return;
    }
    sel.options.length = 0;
    for (var i = 0; i < options.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = options[i].type;
        opt.value = options[i].id;
        sel.appendChild(opt);
    }
}

function populateOccasions(element) {
    $.ajax({
        //fetch categories from sever
        url: base_url + "/api/occasions/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Categories fetch result is " + JSON.stringify(data.categories));
            console.log("occasions fetched are " + JSON.stringify(data.occasions));
            fillOccasionsSelect(element, data.occasions);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for occasions fetch is --- " + jqXHR.responseJSON.message);
        }
    });
}

function fillOccasionsSelect(sel, options) {
    if (options.constructor !== Array) {
        return;
    }
    sel.options.length = 0;
    for (var i = 0; i < options.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = options[i].occasion;
        opt.value = options[i].id;
        sel.appendChild(opt);
    }
}

function populateColors(element) {
    $.ajax({
        //fetch categories from sever
        url: base_url + "/api/colors/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Categories fetch result is " + JSON.stringify(data.colors));
            console.log("colors fetched are " + JSON.stringify(data.colors));
            fillColorsSelect(element, data.colors);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for colors fetch is --- " + jqXHR.responseJSON.message);
        }
    });
}

function fillColorsSelect(sel, options) {
    if (options.constructor !== Array) {
        return;
    }
    var selectedVals = $(sel).val();
    $(sel).empty();
    $(sel).trigger("chosen:updated");
    for (var i = 0; i < options.length; i++) {
        $(sel).append($("<option/>", {
            value: options[i].id,
            text: options[i].color
        }));
    }
    //change selected entities by the following statement
    $(sel).val(selectedVals).trigger("chosen:updated");
    $(sel).trigger("chosen:updated");
}

function populateTags(element) {
    $.ajax({
        //fetch categories from sever
        url: base_url + "/api/tags/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Tags fetch result is " + JSON.stringify(data.colors));
            console.log("tags fetched are " + JSON.stringify(data.tags));
            fillTagsSelect(element, data.tags);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for tags fetch is --- " + jqXHR.responseJSON.message);
        }
    });
}

function fillTagsSelect(sel, options) {
    if (options.constructor !== Array) {
        return;
    }
    var selectedVals = $(sel).val();
    $(sel).empty();
    $(sel).trigger("chosen:updated");
    for (var i = 0; i < options.length; i++) {
        $(sel).append($("<option/>", {
            value: options[i].id,
            text: options[i].tag
        }));
    }
    //change selected entities by the following statement
    $(sel).val(selectedVals).trigger("chosen:updated");
    $(sel).trigger("chosen:updated");
}

function addNewProductType() {
    var newType = document.getElementById("new_product_type").value;
    if (newType == null || newType.trim() == "") {
        document.getElementById("new_product_type").value = "";
        return;
    }
    $.ajax({
        //fetch categories from sever
        url: base_url + "/api/product_types/",
        type: "POST",
        data: {"product_type": newType.trim()},
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Categories fetch result is " + JSON.stringify(data.tags));
            console.log("product_type creation result is " + JSON.stringify(data));
            if (data.insertId == null) {
                toastr.error("Couldn't create a product_type --- " + JSON.stringify(data));
                return;
            }
            document.getElementById("new_product_type").value = "";
            populateTypes(document.getElementById("product_type"));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for product_type create is --- " + jqXHR.responseJSON.message);
        }
    });

}

function addNewOccasion() {
    var new_occasion = document.getElementById("new_occasion").value;
    if (new_occasion == null || new_occasion.trim() == "") {
        document.getElementById("new_occasion").value = "";
        return;
    }
    $.ajax({
        //fetch categories from sever
        url: base_url + "/api/occasions/",
        type: "POST",
        data: {"occasion": new_occasion.trim()},
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Categories fetch result is " + JSON.stringify(data.tags));
            console.log("occasion creation result is " + JSON.stringify(data));
            if (data.insertId == null) {
                toastr.error("Couldn't create an occasion --- " + JSON.stringify(data));
                return;
            }
            document.getElementById("new_occasion").value = "";
            populateOccasions(document.getElementById("occasion"));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for occasion create is --- " + jqXHR.responseJSON.message);
        }
    });

}

function addNewColor() {
    var new_color = document.getElementById("new_color").value;
    if (new_color == null || new_color.trim() == "") {
        document.getElementById("new_color").value = "";
        return;
    }
    $.ajax({
        //fetch categories from sever
        url: base_url + "/api/colors/",
        type: "POST",
        data: {"color": new_color.trim()},
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Categories fetch result is " + JSON.stringify(data.tags));
            console.log("color creation result is " + JSON.stringify(data));
            if (data.insertId == null) {
                toastr.error("Couldn't create a color --- " + JSON.stringify(data));
                return;
            }
            document.getElementById("new_color").value = "";
            populateColors(document.getElementById("colors"));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for color create is --- " + jqXHR.responseJSON.message);
        }
    });

}

function addNewTag() {
    var new_tag = document.getElementById("new_tag").value;
    if (new_tag == null || new_tag.trim() == "") {
        document.getElementById("new_tag").value = "";
        return;
    }
    $.ajax({
        //fetch categories from sever
        url: base_url + "/api/tags/",
        type: "POST",
        data: {"tag": new_tag.trim()},
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Tags fetch result is " + JSON.stringify(data.tags));
            console.log("tag creation result is " + JSON.stringify(data));
            if (data.insertId == null) {
                toastr.error("Couldn't create a tag --- " + JSON.stringify(data));
                return;
            }
            document.getElementById("new_tag").value = "";
            populateTags(document.getElementById("tags"));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for tag create is --- " + jqXHR.responseJSON.message);
        }
    });

}

/* todo Not working, make it work - http://stackoverflow.com/questions/18706735/adding-text-other-than-the-selected-text-options-to-the-select-with-the-chosen-p/18707331#18707331*/
function manipulateTagsSelect() {
    var select, chosen;
    // Cache the select element as we'll be using it a few times
    select = document.getElementById("tags");
    // Init the chosen plugin
    select.chosen({no_results_text: 'Press Enter to add new entry:'});
    // Get the chosen object
    chosen = select.data('chosen');
    // Bind the keyup event to the search box input
    chosen.search_field.on('keyup', function (e) {
        // If we hit Enter and the results list is empty (no matches) add the option
        if (e.which == 13 && chosen.dropdown.find('li.no-results').length > 0) {
            var option = $("<option>").val(this.value).text(this.value);
            // Add the new option
            select.prepend(option);
            // Automatically select it
            select.find(option).prop('selected', true);
            // Trigger the update
            select.trigger("chosen:updated");
        }
    });
}