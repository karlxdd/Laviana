const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'announcement',
    description: 'Make an announcement',
    options: [
        {
            name: 'create-an-announcement',
            description: 'Announcement: ',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'announce-to',
            description: 'Who should receive the announcement',
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'channel',
            description: 'The channel to send the announcement',
            type: ApplicationCommandOptionType.Channel,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

    callback: async (laviana, interaction) => {
        const announcementText = interaction.options.getString('create-an-announcement');
        const announceTo = interaction.options.getMentionable('announce-to');
        const targetChannel = interaction.options.getChannel('channel') || interaction.channel;

        try {
            let user = announceTo ? (announceTo.id === interaction.guild.id ? '@everyone' : await laviana.users.fetch(announceTo.id)) : null;
            await targetChannel.send(`Announcement to ${user || 'everyone'}: \n${announcementText}`);
        } catch (error) {
            console.error('Error sending announcement:', error);
            interaction.reply('Error sending announcement.');
        }
    },
};