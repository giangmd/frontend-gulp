/**
* JS Main
*/
'use strict';

var IZWAY = function(configs) {
    this.config = {};
    for (var key in configs) {
        this.config[key] = configs[key];
    }

    return this;
}

IZWAY.prototype = {
    init: function() {
        this.generate()
    },
    generate: function() {
        console.log('app js running...')
        $('.click-me').on('click', function(event) {
            event.preventDefault()

            alert('JQuery is working...')
        })

        $(".dropdown-toggle").dropdown()
        $('[data-toggle="tooltip"]').tooltip()
        $('[data-toggle="popover"]').popover()
    }
}

// init js app
var configs = {}
var appJS = new IZWAY(configs)
appJS.init()
