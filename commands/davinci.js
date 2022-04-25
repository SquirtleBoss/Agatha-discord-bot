const { SlashCommandBuilder } = require('@discordjs/builders');
const linkai = require ('../linkopenai.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('davinci')
		.setDescription('Speak directly with the davinci model')
		.addStringOption(option => option.setName('input').setDescription('Your input here')),
	async execute(interaction) {
		var string = "";
		linkai.callOpenAI(string, "text-davinci-002", interaction);
	}
};