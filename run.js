const Discord = require("discord-user-bots")
const { WebhookClient, MessageEmbed } = require("discord.js")
require("dotenv").config()

const client = new Discord.Client()
const config = require("./config.json")

const token = process.env.DISCORD_TOKEN

client.on("ready", () => {
  console.log("Client online!")
})
client.on("message", (message) => {
  // Check if the message is in the configured channels
  const channel = config.channels[message.channel_id]
  if (!channel) return

  // Function to send a message via webhook
  const sendWebhookMessage = (content, embeds = [], files = []) => {
    if (!content && embeds.length === 0 && files.length === 0) return // Prevent sending empty messages
    const hook = new WebhookClient({ url: channel })
    hook
      .send({
        content: content || undefined,
        embeds,
        files,
        username: message.author.global_name,
        avatarURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`,
      })
      .catch((error) =>
        console.error("Error sending webhook message:\n", error)
      )

    console.log(
      `Sent a message from ${message.author.username} in ${message.channel_id}: ${content}`
    )
  }

  // Allow bot messages if they are interactions
  if (!message.interaction && message.author.bot) return

  // Handle Slash Commands
  if (message.interaction) {
    const embed = new MessageEmbed()
      .setDescription(
        `This message is an interaction (slash command). \n Command Name: ${message.interaction.commandName} \n Invoked by: ${message.interaction.user.username}#${message.interaction.user.discriminator}`
      )
      .setColor("RED")
    sendWebhookMessage(message.content, [embed])
  }
  // Handle Attachments (Images)
  else if (message.attachments.length > 0) {
    const attachments = message.attachments.map((attachment) => attachment.url)
    sendWebhookMessage(message.content || null, [], attachments)
  }
  // Handle Embeds
  else if (message.embeds.length > 0) {
    const embedData = message.embeds[0]
    sendWebhookMessage(message.content || null, [embedData])
  } else {
    sendWebhookMessage(message.content)
  }
})

client.login(token)
