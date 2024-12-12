const { devs, server } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (laviana, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();
    
    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

        if (!commandObject) return;

        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: "Only developers are allowed to run this command.",
                    ephemeral: true,
                });
                return;
            }
        }

        if (commandObject.server) {
            if (!(interaction.guild.id === server)) {
                interaction.reply({
                    content: "This command cannot be run here.",
                    ephemeral: true,
                });
                return;
            }
        }

        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: "You doesn't have enough permission.",
                        ephemeral: true,
                    });
                    break;
                }
            }
        }

        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: "I don't have enough permissions.",
                        ephemeral: true,
                    });
                    break;
                }
            }
        }

        await commandObject.callback(laviana, interaction);

    } catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
};