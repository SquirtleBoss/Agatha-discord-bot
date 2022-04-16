const { SlashCommandBuilder } = require('@discordjs/builders');
const { Configuration, OpenAIApi } = require ('openai');
const { openaikey } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Generates a list of 5 ideas when given a prompt!')
		.addStringOption(option => option.setName('prompt').setDescription('Enter a prompt to generate ideas from')),
	async execute(interaction) {
		const string = interaction.options.getString('prompt');
		var prompt = "Provide a list of 5 " + string + ".";
		const configuration = new Configuration({
    		organization: "org-oeHFO17GLBSVBz6jHRSUglKo",
    		apiKey: openaikey,
		});
		const openai = new OpenAIApi(configuration);
		const completion = await openai.createCompletion("text-babbage-001", {
	  		prompt: prompt,
	  		temperature: 0.1,
	  		max_tokens: 120,
		});
		var reply = "";
		for(const val of completion.data.choices) {
			reply = reply + val.text;
			console.log(val.text);
		}
		await interaction.reply(reply);
	},
};