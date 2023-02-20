const { SlashCommandBuilder } = require('@discordjs/builders');
const linkai = require ('../linkopenai.js');
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.airtablekey}).base(process.env.airtablebase);

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
        base('Chats').select({
            // Selecting the first 3 records in Grid view:
            maxRecords: 1,
            filterByFormula: "{ID} = '"+ "asdfg" + "'"
        }).eachPage(function page(records, fetchNextPage) {
            console.log("cp");
            if (records.length == 0)
                isNew = true;
            //This function (`page`) will get called for each page of records.
            records.forEach(function(record) {
                //console.log('Retrieved', record.fields);
                recordId = record.getId();
                var x = record.fields;
                convo += `U: ${x.M1}\nA: ${x.M2}\nU: ${x.M3}\nA: ${x.M4}\nU: ${x.M5}\nA: ${x.M6}\nU: ${interaction.options.getString('input')}\nA: `;
            });

            console.log(convo);
            //openai
            var string = "Continue the following conversation\n" + convo;
		    var resp = linkai.callOpenAI(string, "text-davinci-003", interaction, response_len=1024);

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
                            "ID": "asdfg",
                            "M1": " ",
                            "M2": " ",
                            "M3": " ",
                            "M4": " ",
                            "M5": interaction.options.getString('input'),
                            "M6": resp
                        }
                        }])
                }


        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }
};