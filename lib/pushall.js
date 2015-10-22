/**
 * Created by Roman Rahman on 21.10.2015.
 */
'use strict';

var request = require('request');
var extend = require('extend');
var Q = require('q');

var _defaultUncode = 'utf8';

var _defaultOptions = {
    icon: null,
    url: null,
    hidden: 0,
    encode: _defaultUncode,
    priority: 0
};

function _send(data) {
    var deffered = Q.defer();

    if(data.title && data.encode) data.title = data.title.toString(data.encode);
    if(data.text && data.encode) data.text = data.text.toString(data.encode);

    request({
        url: 'https://pushall.ru/api.php',
        method: 'POST',
        qs: data,

        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "accept-language": "ru,en-us;q=0.8,en",
            "connection": "keep-alive"
        }
    }, function (e, r, body) {
        if(!e && body) {
            var json = JSON.parse(body);
            if(json.success === 1) {
                deffered.resolve(json);
            } else {
                deffered.reject();
            }

        } else {
            deffered.reject(e);
        }
    });

    return deffered.promise;
}

module.exports.priority = {
    LOW: -1,
    NORMAL: 0,
    HIGH: 1
};

module.exports.channel = function (channelId, channelKey) {
    return {
        self: function (options) {
            return _send(extend({}, _defaultOptions, {
                type: 'self',
                id: channelId,
                key: channelKey
            }, options));
        },

        broadcast: function (options) {
            return _send(extend({}, _defaultOptions, {
                type: 'broadcast',
                id: channelId,
                key: channelKey
            }, options));
        },

        unicast: function (uid, options) {
            return _send(extend({}, _defaultOptions, {
                type: 'unicast',
                id: channelId,
                key: channelKey,
                uid: uid
            }, options));
        },

        showlist: function () {
            return _send({
                type: 'showlist',
                id: channelId,
                key: channelKey
            });
        }
    }
};