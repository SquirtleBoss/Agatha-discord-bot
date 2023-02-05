const { SlashCommandBuilder } = require('@discordjs/builders');
const { Configuration, OpenAIApi } = require ('openai');
const wait = require('node:timers/promises').setTimeout;

async function callOpenAI(prefix, model, interaction, response_len=100) {
		const string = interaction.options.getString('input');
		console.log(string);
		var context = "You are Agatha, a discord writing assistant bot that helps people with their writing\n";
		var prompt = context + prefix + string + ".";
		await interaction.deferReply();
		const configuration = new Configuration({
    		organization: process.env.openaiorg,
    		apiKey: process.env.openaikey,
		});
		const openai = new OpenAIApi(configuration);
		console.log(prompt);
		const completion = await openai.createCompletion(model, {
	  		prompt: prompt,
	  		temperature: 0.1,
	  		max_tokens: response_len,
		});
		var reply = "";
		for(const val of completion.data.choices) {
			reply = reply + val.text;
			console.log(val.text);
		}

		//run the reply thru the filter to ensure safe content. 
		const filter = await openai.createCompletion("content-filter-alpha", {
	      prompt: "<|endoftext|>"+ reply +"\n--\nLabel:",
	      temperature: 0,
	      max_tokens: 1,
	      top_p: 0,
	      logprobs: 10
		})
		console.log(filter.data.choices[0].text);
		console.log(filter.data.choices[0].logprobs.top_logprobs[0][2]);

		//reply if content is safe
		if (filter.data.choices[0].text == "2" && filter.data.choices[0].logprobs.top_logprobs[0][2] > -0.355)
			await interaction.editReply("***Content reply has been filtered due to inappropriate responses by the AI***");
		else
			await interaction.editReply(reply);
}
module.exports = {callOpenAI};