/* eslint-disable no-inline-comments */
import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message } from 'discord.js';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string,
            PREFIX: string,
            TEST_CHANNEL_ID: string,
            LOG_CHANNEL: string,
            BOT_LOG: string,
            MONGO_URI: string,
            MONGO_DATABASE_NAME: string
        }
    }
}

export interface SlashCommand {
    command: SlashCommandBuilder | any,
    execute: (interaction : CommandInteraction) => void,
}

export interface Command {
    name: string,
    execute: (message: Message, args: Array<string>) => void,
    permissions: Array<PermissionResolvable>
}

export interface Reaction {
    name: string,
    trigger: string[],
    execute: (...args?) => void
}

interface GuildOptions {
    prefix: string,
    log: boolean,
    welcomeUser: boolean,
    welcomeChannelId: string
}
export type GuildOption = keyof GuildOptions

export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args?) => void
}

export interface MongoEvent {
    name: string,
    once?: boolean | false,
    execute: (...args?) => void
}

declare module 'discord.js' {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
        commands: Collection<string, Command>
        reactions: Collection<string, Reaction>
    }
}