const { SlashCommandBuilder } = require('@discordjs/builders');
const linkai = require ('../linkopenai.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('re-word')
		.setDescription('Paraphrases a sentence.')
		.addStringOption(option => option.setName('input').setDescription('Enter a sentence to be paraphrased')),
	async execute(interaction) {
		var string = "paraphrase the sentence using different words: ";
		linkai.callOpenAI(string, "text-davinci-002", interaction);
	}
};