const { SlashCommandBuilder } = require('@discordjs/builders');
const linkai = require ('../linkopenai.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('re-write')
		.setDescription('Paraphrases a sentence.')
		.addStringOption(option => option.setName('input').setDescription('Enter a sentence to be paraphrased')),
	async execute(interaction) {
		var string = "Correct this to standard English: ";
		linkai.callOpenAI(string, "text-davinci-003", interaction);
	}
};