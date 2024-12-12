module.exports = async (laviana, guildId) => {
    let applicationCommands;

    if(guildId) {
        const guild = await laviana.guilds.fetch(guildId);
        applicationCommands = guild.commands;
    } else {
        applicationCommands = await laviana.application.commands;
    }

    await applicationCommands.fetch();
    return applicationCommands;
};