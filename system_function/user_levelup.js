const fs = require('fs');
module.exports = (id) => {
// user data is exists!
var json = JSON.parse(fs.readFileSync(`./user/${id}.json`));
while(json.exp >= json.level*10) {
	json.exp -= json.level*10;
	json.level++;
}
fs.writeFileSync(`./user/${id}.json`, JSON.stringify(json));
}
