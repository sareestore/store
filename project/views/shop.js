document.onreadystatechange = function () {
    if (document.readyState == "interactive") {

    } else if (document.readyState == "complete") {
        $(".chosen-select").chosen();
    }
};

function clearFilters() {
    var elementIds = ["product_types", "occasions", "colors"];
    for (var i = 0; i < elementIds.length; i++) {
        var sel = $("#" + elementIds[i]);
        $(sel).val([]);
        $(sel).trigger("chosen:updated");
    }
}

function applyFilters() {

    var location = "./shop";
    var filterStrings = [];

    var sel = $("#colors");
    if ($(sel).val() != null) {
        var filterItems = $(sel).val();
        for (var k = 0; k < filterItems.length; k++) {
            filterStrings.push("colors=" + filterItems[k]);
        }
    }

    var sel = $("#occasions");
    if ($(sel).val() != null) {
        filterItems = $(sel).val();
        for (var k = 0; k < filterItems.length; k++) {
            filterStrings.push("occasions=" + filterItems[k]);
        }
    }

    var sel = $("#product_types");
    if ($(sel).val() != null) {
        filterItems = $(sel).val();
        for (var k = 0; k < filterItems.length; k++) {
            filterStrings.push("product_types=" + filterItems[k]);
        }
    }

    if (filterStrings.length > 0) {
        window.location = location + "?" + filterStrings.join("&");
    } else {
        window.location = location;
    }
}