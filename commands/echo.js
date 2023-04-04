const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input')
        .addStringOption(option => option.setName('input').setDescription('Your message here')),
	async execute(interaction) {
        const ret = interaction.options.getString('input');
		await interaction.reply(ret);
	},
};