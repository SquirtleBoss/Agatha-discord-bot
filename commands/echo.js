const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input'),
	async execute(interaction) {
        const ret = interaction.options.getString('input');
		await interaction.reply(ret);
	},
};