const fs = require('fs');
module.exports = (id) => {
if (! fs.existsSync(`./user/${id}.json`)) {
// user data is exists!
var json = { level : 1, exp : 0 };
fs.writeFileSync(`./user/${id}.json`, JSON.stringify(json));
}}
