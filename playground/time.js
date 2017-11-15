const moment = require('moment');

createdAt = 1134567088808;
var someTimeStamp = moment().valueOf();
var date = moment(createdAt);
// date.add(1, 'years').subtract(9, 'months');
console.log(date.format('MMM Do YYYY HH:mm:ss'));

// console.log(date.format('h:mm a'));


// var date = new Date();
// console.log(date.getMonth());
