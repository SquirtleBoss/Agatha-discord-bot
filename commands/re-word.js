const { SlashCommandBuilder } = require('@discordjs/builders');
const { Configuration, OpenAIApi } = require ('openai');
const { openaikey } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('re-word')
		.setDescription('Paraphrases a sentence.')
		.addStringOption(option => option.setName('input').setDescription('Enter a sentence to be paraphrased')),
	async execute(interaction) {
		const string = interaction.options.getString('input');
		var prompt = "paraphrase the sentence to make it longer: " + string;
		const configuration = new Configuration({
    		organization: "org-oeHFO17GLBSVBz6jHRSUglKo",
    		apiKey: openaikey,
		});
		const openai = new OpenAIApi(configuration);
		const completion = await openai.createCompletion("text-curie-001", {
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