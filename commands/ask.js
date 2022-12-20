const { SlashCommandBuilder } = require('@discordjs/builders');
const linkai = require ('../linkopenai.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Answers a factual question to the best of its abilities')
		.addStringOption(option => option.setName('input').setDescription('Your question here')),
	async execute(interaction) {
		var string = "Answer the following question truthfully:";
		linkai.callOpenAI(string, "text-davinci-003", interaction);
	}
};