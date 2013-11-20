/**
 *
 * Author: humanhuang
 * Date: 13-10-16
 */
var G = {}
G.isDebug = true;
G.version = "1.1.0";

G.loadjs = function (path_arr) {

    function load(path) {
        if (~path.lastIndexOf(".js")) {
            if (G.isDebug) {
                path = path.replace("{0}", "src");
            } else {
                path = path.replace("{0}", "dist");
                path = path.substring(0, path.lastIndexOf(".js")) + ".min.js";
            }
            path = path + "?version=" + G.version;
            document.write('<script type="text/javascript" src="' + path + '"></script>');
        } else {
            path = path + "?version=" + G.version;
            document.write('<link rel="stylesheet" type="text/css" href="' + path + '" />');
        }
    }

    if (typeof(path_arr) == 'string') {
        load(path_arr);
    } else {
        for (var i = 0, len = path_arr.length; i < len; i++) {
            load(path_arr[i]);
        }
    }
}

G.loadPrefix = function (path_arr, prefix) {
    if (G.isDebug) {
        prefix = prefix.replace("{0}", "src");
    } else {
        prefix = prefix.replace("{0}", "dist");
    }

    if (typeof(path_arr) == 'string') {
        G.loadjs(prefix + path_arr);
    } else {
        for (var i = 0, len = path_arr.length; i < len; i++) {
            G.loadjs(prefix + path_arr[i]);
        }
    }
}

G.loadLib = function (path_arr) {
    G.loadPrefix(path_arr, "./js/lib/{0}/");
}