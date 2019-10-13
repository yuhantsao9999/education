function diff(array1, array2) {
    var tmp = [];
    var flag;
    for (var i = 0; i < array1.length; i++) {
        flag = true
        for (var j = 0; j < array2.length; j++) {
            if (array1[i] == array2[j] || array1[i] == "undefined" || array1[i] == null) {
                flag = false;
            }
        }
        if (flag) {
            tmp.push(array1[i]);
        }
    }

    return tmp;
}

module.exports = diff;