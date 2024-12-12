module.exports = {
    name: 'ping',
    description: 'Pong!',

    callback: (laviana, interaction) => {
        interaction.reply(`Pong! ${laviana.ws.ping}ms`);
    }
};