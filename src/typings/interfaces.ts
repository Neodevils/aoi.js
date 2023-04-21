import  StringObject  from "../core/structs/StringObject.js";
import { Client, ClientOptions, GatewayEventNames, GroupConfigOptions } from "aoiluna";
export interface TranspilerOptions {
    sendMessage: boolean;
    scopeData?: {
        variables?: string[];
        embeds?: unknown[];
        name?: string;
        sendFunction?: string;
        functions?: string;
        env?: string[];
        objects?: Record<string, StringObject>;
    };
    reverse?: boolean;
    minify?: boolean;
    parsedStringOnly?: boolean;
}

import  Scope  from "../core/structs/Scope.js";
import { CommandTypes, autoFetchDataTypes } from "./types.js";
import { AoiClient } from "../index.js";

export interface FunctionData {
    name: string;
    brackets: boolean;
    optional: boolean;
    type:
        | "scope"
        | "setter"
        | "getter"
        | "function"
        | "function_getter"
        | "scope_getter";
    fields: {
        name: string;
        type: string;
        required: boolean;
    }[];
    returns: unknown;
    default: string[];
    description: string;
    version: string;
    extra?: unknown;
    code: (
        data: funcData,
        scope: Scope[],
    ) => { code: string; scope: Scope[]; data?: funcData; }
}
export interface PartialFunctionData extends FunctionData {
    total: string;
}
export interface funcData extends FunctionData {
    inside?: string;
    parent?: FunctionData;
    total: string;
    splits: string[];
    funcs: funcData[];
    parsed: string;
}
export interface CommandData {
    name: string;
    type: CommandTypes;
    code: string;
    __compiled__?: string;
    __uglify__: boolean;
    aliases?: string[];
    __path__?: string;
}

export interface TransformedGuild {
    rulesChannel: { id: string | null; name: string | undefined };
    publicUpdatesChannel: { id: string | null; name: string | undefined };
    bans: string;
    commands: number;
    partnered: boolean;
    verified: boolean;
    mfaLevel: unknown;
    explicitContentFilter: unknown;
    defaultMessageNotifications: unknown;
    systemChannelFlags: unknown;
    premiumTier: unknown;
    premiumSubscriptionCount: number | null;
    preferredLocale: unknown;
    systemChannel: { id: string | null; name: string | undefined };
    splash: string | null;
    owner: { id: string; name: string; nick: string | null };
    icon: string | null;
    afkChannel: { id: string | null; name: string | undefined };
    membersId: string[];
    channelsId: string[];
    rolesId: string[];
    emojisId: string[];
    stickersId: string[];
}

export interface AoiClientOptions extends ClientOptions
{
    events: (keyof typeof GatewayEventNames)[];
    prefixes: string | string[];
    caches: Record<string, GroupConfigOptions>;
    autoFetchData?: autoFetchDataTypes[];
}

export interface CommandOptions
{
    name: string;
    type: CommandTypes;
    code: string;
    aliases?: string[];
    reverseRead?: boolean;
    executeAt?: "guild" | "dm" | "both";
    __path__: string;
}

export interface TranspiledFuncData
{
    client: Client;
    bot: AoiClient;
    [ key: string ]: unknown;
}