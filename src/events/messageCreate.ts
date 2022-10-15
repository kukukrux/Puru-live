import { Client, TextChannel, Message, ChannelType} from "discord.js";
import { BotEvent} from "src/types";

const event : BotEvent = {
    name: "messageCreate",
    execute: async (message : Message) => {
        //  check if message is from a server member or not from bot, else return
        if (!message.member || message.member.user.bot) return;
        //  check if message is send inside a server, else return
        if (!message.guild) return;
        const prefix = process.env.PREFIX!;
        if (!message.content.startsWith(prefix)) return;
    }  
}