const { SlashCommandBuilder } = require('@discordjs/builders');
const linkai = require ('../linkopenai.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sentence-completion')
		.setDescription('Completes an unfinished sentence.')
		.addStringOption(option => option.setName('input').setDescription('Enter an incomplete sentence')),
	async execute(interaction) {
		var string = "finish this sentence in an interesting way: ";
		linkai.callOpenAI(string, "text-davinci-003", interaction);
	}
};