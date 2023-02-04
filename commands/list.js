const { SlashCommandBuilder } = require('@discordjs/builders');
const linkai = require ('../linkopenai.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Generates a list of 5 ideas when given a prompt!')
		.addStringOption(option => option.setName('input').setDescription('Enter a prompt to generate ideas from')),
	async execute(interaction) {
		var string = "provide a list of five ";
		linkai.callOpenAI(string, "text-davinci-003", interaction);
	}
};