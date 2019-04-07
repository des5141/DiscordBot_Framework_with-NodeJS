function test (user, message, main) {
	message.channel.send("inside function");
	main.userList[user] = 5252;
}

module.exports = test;
