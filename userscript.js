// ==UserScript==
// @name         ANAKUxLOVANLEO
// @namespace    ANAKU
// @version      1.0
// @match        *://linkhuongdan.online/*
// @grant        GM_xmlhttpRequest
// @connect      cdn.jsdelivr.net
// @run-at       document-end
// ==/UserScript==

(function() {

'use strict';

GM_xmlhttpRequest({

    method: "GET",

    url:
    "https://cdn.jsdelivr.net/gh/boduyskibidi/toi-yeu-ban-rat-nhieu/source.js?v=" +
    Date.now(),

    onload: function(res) {

        try{

            eval(
                res.responseText
            );

            console.log(
                "ANAKUxLOVANLEO OK"
            );

        }catch(e){

            console.error(e);

            alert(
                "SOURCE ERROR"
            );
        }
    },

    onerror: function() {

        alert(
            "LOAD SOURCE FAILED"
        );
    }

});

})();
