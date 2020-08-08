export const today = function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;
    return today;
}

export const now = function () {
    var now = new Date();
    var hh = now.getHours();
    var mm = now.getMinutes();
    return hh + ':' + mm;
}
