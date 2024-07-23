# Discord Message Forwarder

A simple message forwarder for Discord servers that supports multiple and specific channels.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/zulnabil/discord-message-forwarder.git
   cd discord-message-forwarder
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

4. Fill in your Discord user token or bot token in the `.env` file:

   ```env
   DISCORD_TOKEN=your_discord_token_here
   ```

## Configuration

Modify the channel source and destination configuration in `./config.json`. The configuration file should look like this:

```json
{
  "channels": {
    "[channelIdSource]": "[channelWebhookDestination]"
  }
}
```

- The key of the object (on the left) is the channel ID of the source channel.
- The value of the object (on the right) is the webhook URL of the destination channel.

### Example

```json
{
  "channels": {
    "1265184412635631760": "https://discord.com/api/webhooks/1265184641485377588/4pG1fiSYyZt-Z4KYlQtYByJCuPqCxFykg-o-UF8MTzRY1Ga-HyxYyayhOw0s3SP6xUcZ",
    "1265184438447374397": "https://discord.com/api/webhooks/1265184823878750270/to3xpJsrBwK6mCamq87xiQO1TVNVt78mXAu4Mt-tRRUANWSm-6GeiUo86xM3d-iR01Bn"
  }
}
```

## Running the Script

To start the message forwarder, run the following command:

```bash
npm start
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Issues

If you encounter any issues or have any questions, feel free to open an issue in the repository.

---
