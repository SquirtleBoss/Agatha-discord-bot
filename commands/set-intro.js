const { SlashCommandBuilder } = require('@discordjs/builders');
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.airtablekey}).base(process.env.airtablebase);
var sha256 = require('js-sha256').sha256;

var isNew = false;

//discord
module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-intro')
		.setDescription('What type of person do want to be?')
		.addStringOption(option => option.setName('intro').setDescription('Your intro here')),
	async execute(interaction) {
        // begin retrieval
        await interaction.deferReply();
        var user = interaction.user.id;
        const records = await base('Chats').select({
        maxRecords: 1,
        filterByFormula: "{ID} = '"+ sha256(user) + "'"
        }).firstPage();

            if (records.length != 0) {
                var record = records[0].fields;
                base('Chats').update([
                    {
                    "id": recordId,
                    "fields": {
                        "intro": interaction.options.getString('input')
                    }
                    }])
                }
                else {
                    base('Chats').create([
                        {
                        "fields": {
                            "ID": sha256(user),
                            "intro": interaction.options.getString('input'),
                            "persona": 'a friendly assistant',
                            "M1": " ",
                            "M2": " ",
                            "M3": " ",
                            "M4": " ",
                            "M5": " ",
                            "M6": " ",
                            "M7": " ",
                            "M8": " "
                        }
                        }])
                    isNew = false;
                }
    }
};