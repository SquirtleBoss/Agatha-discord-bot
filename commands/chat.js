const { SlashCommandBuilder } = require('@discordjs/builders');
const linkai = require ('../linkopenai.js');
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.airtablekey}).base(process.env.airtablebase);
var sha256 = require('js-sha256').sha256;

var recordId = "";
var convo = "";
var isNew = false;

//discord
module.exports = {
	data: new SlashCommandBuilder()
		.setName('chat')
		.setDescription('Chat with Agatha!')
		.addStringOption(option => option.setName('input').setDescription('Your message here')),
	async execute(interaction) {
        // begin retrieval
        var user = interaction.user.id;
        const records = await base('Chats').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 1,
        filterByFormula: "{ID} = '"+ sha256(user) + "'"
        }).firstPage();

        if (records.length == 0) {
            isNew = true;
            convo = "U:";
        }
        else {
            record = records[0];
            recordId = record.getId();
            var x = record.fields;
            convo = `U:${x.M1}\nA:${x.M2}\nU:${x.M3}\nA:${x.M4}\nU:${x.M5}\nA:${x.M6}\nU:`;
        }

            //openai
            var string = "Continue the following conversation, the chat can be about anything\n" + convo;
		    var resp = await linkai.callOpenAI(string, "text-davinci-003", interaction, response_len=1024, suffix = "\nA:");

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
                        "M5": interaction.options.getString('input'),
                        "M6": resp
                    }
                    }])
                }
                else {
                    base('Chats').create([
                        {
                        "fields": {
                            "ID": sha256(user),
                            "M1": " ",
                            "M2": " ",
                            "M3": " ",
                            "M4": " ",
                            "M5": interaction.options.getString('input'),
                            "M6": resp
                        }
                        }])
                    isNew = false;
                }
    }
};