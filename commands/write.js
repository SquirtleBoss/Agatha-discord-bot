const { SlashCommandBuilder } = require('@discordjs/builders');
const linkai = require ('../linkopenai.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('write')
		.setDescription('produces a piece of writing according to a prompt')
		.addStringOption(option => option.setName('input').setDescription('What should it write?')),
	async execute(interaction) {
		var string = "In a formal style, write: ";
		linkai.callOpenAI(string, "text-davinci-003", interaction, response_len=240);
	}
};