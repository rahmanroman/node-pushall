node-pushall
============

PushAll.ru API for node.js

## Install
	npm install node-pushall
	
If you are not familiar with PushAll - visit https://pushall.ru/
	
## Usage example :
	
```javascript
var pushall = require('node-pushall');
var channel = pushall.channel(id, key);

channel.self({
    'title': '...',
    'text': '...',
    'priority': pushall.priority.HIGH
});

channel.broadcast({
    'title': '...',
    'text': '...',
    'priority': pushall.priority.NORMAL
});

channel.unicast(uid, {
    'title': '...',
    'text': '...',
    'priority': pushall.priority.LOW
});
```	
