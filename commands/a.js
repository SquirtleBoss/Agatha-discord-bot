const { SlashCommandBuilder } = require('@discordjs/builders');
const { Configuration, OpenAIApi } = require ('openai');
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.airtablekey}).base(process.env.airtablebase);
var sha256 = require('js-sha256').sha256;

var recordId = "";
var convo = ['','','','','','','',''];
var intro = 'an intelligent person';
var persona = 'a friendly assistant';
var isNew = false;

//discord
module.exports = {
	data: new SlashCommandBuilder()
		.setName('a')
		.setDescription('Chat with Agatha!')
		.addStringOption(option => option.setName('input').setDescription('Your message here')),
	async execute(interaction) {
        // begin retrieval
        await interaction.deferReply();
        var user = interaction.user.id;
        const records = await base('Chats').select({
        maxRecords: 1,
        filterByFormula: "{ID} = '"+ sha256(user) + "'"
        }).firstPage();

        if (records.length == 0) {
            isNew = true;
        }
        else {
            record = records[0];
            recordId = record.getId();
            var x = record.fields;
            intro = x.intro;
            persona = x.persona;
            convo[0] = x.M1;
            convo[1] = x.M2;
            convo[2] = x.M3;
            convo[3] = x.M4;
            convo[4] = x.M5;
            convo[5] = x.M6;
            convo[6] = x.M7;
            convo[7] = x.M8;
        }

        //openai
        const string = interaction.options.getString('input');
		console.log(string);
		// context given
		var context = "You are Agatha, a Discord assistant bot. Here's how the user describes themselves: " + intro + "\n and here's how they want you to act: " + persona;
        console.log(context);
		const configuration = new Configuration({
    		organization: process.env.openaiorg,
    		apiKey: process.env.openaikey,
		});
		const openai = new OpenAIApi(configuration);
		const response = await openai.createChatCompletion({
  		model: "gpt-3.5-turbo",
  		messages: [{role: "system", content: context},
                    {role: "user", content: convo[0]},
                    {role: "assistant", content: convo[1]},
                    {role: "user", content: convo[2]},
                    {role: "assistant", content: convo[3]},
                    {role: "user", content: convo[4]},
                    {role: "assistant", content: convo[5]},
                    {role: "user", content: convo[6]},
                    {role: "assistant", content: convo[7]},
                    {role: "user", content: interaction.options.getString('input')}],
		});
		var reply = response.data.choices[0].message.content;
		console.log(reply);
		await interaction.editReply(reply);

		// Moderation of response message
		const moderation = await openai.createModeration({
			input: reply,
		  });
		
		if (moderation.data.flagged) {
			await interaction.editReply("***Content reply has been filtered due to inappropriate responses by the AI***");
		}
		else {
			await interaction.editReply(reply);
		}

        // openai fini.

            if (!isNew) {
                var record = records[0].fields;
                base('Chats').update([
                    {
                    "id": recordId,
                    "fields": {
                        "M1": record.M3,
                        "M2": record.M4,
                        "M3": record.M5,
                        "M4": record.M6,
                        "M5": record.M7,
                        "M6": record.M8,
                        "M7": interaction.options.getString('input'),
                        "M8": reply
                    }
                    }])
                }
                else {
                    base('Chats').create([
                        {
                        "fields": {
                            "ID": sha256(user),
                            "intro": 'an intelligent person',
                            "persona": 'a friendly assistant',
                            "M1": " ",
                            "M2": " ",
                            "M3": " ",
                            "M4": " ",
                            "M5": " ",
                            "M6": " ",
                            "M7": interaction.options.getString('input'),
                            "M8": reply
                        }
                        }])
                    isNew = false;
                }
    }
};