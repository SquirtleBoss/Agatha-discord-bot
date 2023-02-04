const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows a list of commands available for Agatha'),
	async execute(interaction) {

        var ret = "";
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        console.log('commandFiles');
        for (const file of commandFiles) {
            const command = require(`./${file}`);
            // Set a new item in the Collection
            // With the key as the command name and the value as the exported module
            client.commands.set(command.data.name, command);
            ret += `Name: ${command.data.name}, Description: ${command.data.description} \n`;
        }
        console.log(ret);
		await interaction.reply(ret);
	},
};