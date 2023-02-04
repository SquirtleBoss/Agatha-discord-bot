const { SlashCommandBuilder } = require('@discordjs/builders');

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
		await interaction.reply(ret);
	},
};














// // Require the necessary discord.js classes
// const fs = require('node:fs');
// const { Client, Collection, Intents } = require('discord.js');

// // Create a new client instance
// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// client.commands = new Collection();

// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	const command = require(`./commands/${file}`);
// 	// Set a new item in the Collection
// 	// With the key as the command name and the value as the exported module
// 	client.commands.set(command.data.name, command);
// }

// // When the client is ready, run this code (only once)
// client.once('ready', () => {
// 	console.log('Ready!');
// });


// client.on('interactionCreate', async interaction => {
// 	if (!interaction.isCommand()) return;

// 	const command = client.commands.get(interaction.commandName);

// 	if (!command) return;

// 	try {
// 		await command.execute(interaction);
// 	} catch (error) {
// 		console.error(error);
// 		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 	}
// });

// // Login to Discord with your client's token
// client.login(process.env.token);