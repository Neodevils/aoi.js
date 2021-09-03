const {SnowflakeUtil} = require('discord.js')
const axios = require("axios");
const parser = require("../../handlers/slashCommandOptionsParser");
module.exports = async (d) => {
  const code = d.command.code;

  const r = code.split(`$deleteSlashCommand`).length - 1;

  const inside = code.split(`$deleteSlashCommand`)[r].after();

  const err = d.inside(inside);

  if (err) return d.error(err);

  const [guildID, option] = inside.splits;
let command;
  let commands = d.client.application.commands.cache
    
  command = commands.find(
    (c) => c.name.toLowerCase() === option.toLowerCase() || c.id === option
  );

  if (!command)
    return d.error(`${d.func}: Could not find any command with name/id ${option}`);
   command = {

       id: command.id,

       name: command.name,

       description:command.description,

       options: command.options || [],

       defaultPermission : command.default_permission ,

       guild : d.client.guilds.cache.get(command.guild_id) || null,

       application : d.client ,

       timestamp : SnowflakeUtil.deconstruct(command.id).timestamp, 

       createdAt: SnowflakeUtil.deconstruct(command.id).date

       } 
const req = await d.client.application.commands.delete(command,guildID === "global" ? undefined : guildID).catch(e=>undefined)
   if(!req) return d.error(`${d.func}: Failed to delete slash command ${command.name}`);

  return {
    code: code.replaceLast(`$deleteSlashCommand${inside}`, ""),
  };
};