const fs = require('fs');
module.exports = (id) => {
// user data is exists!
var json = JSON.parse(fs.readFileSync(`./user/${id}.json`));


}
