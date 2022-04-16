const { SlashCommandBuilder } = require('@discordjs/builders');
const { Configuration, OpenAIApi } = require ('openai');
const { openaikey } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sentence-completion')
		.setDescription('Completes an unfinished sentence.')
		.addStringOption(option => option.setName('input').setDescription('Enter an incomplete sentence')),
	async execute(interaction) {
		const string = interaction.options.getString('input');
		var prompt = "finish the sentence in an interesting way: " + string;
		const configuration = new Configuration({
    		organization: "org-oeHFO17GLBSVBz6jHRSUglKo",
    		apiKey: openaikey,
		});
		const openai = new OpenAIApi(configuration);
		const completion = await openai.createCompletion("text-davinci-002", {
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