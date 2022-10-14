import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message } from "discord.js"


export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args?) => void
}