const { SlashCommandBuilder } = require('@discordjs/builders');
const linkai = require ('../linkopenai.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('feedback')
		.setDescription('Provides feedback on a piece of formal writing')
		.addStringOption(option => option.setName('input').setDescription('Paste your writing here')),
	async execute(interaction) {
		var string = "Provide feedback on the following writing and how it can be improved:";
		linkai.callOpenAI(string, "text-davinci-003", interaction, response_len=512);
	}
};