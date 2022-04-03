# Commander
Commander is a command handler / mini framework designed to make working with Discord.JS 12 easier. Keep in mind the version of Discord.JS that this command handler uses is deprecated and this command handler might just stop working randomly out of the blue.

## File Structure & Explanations
The following explains all the files and folders and what they do and why you **should** not delete it.

`./commands` - All your commands go in this directory

`./utils` - This directory comes with a few message embeds and other utilites which you can import and use. Keep in mind if you delete this directory shit will hit the fan.

`commandHandler.js` - This file is the main handler file. It takes the users message and executes it. You would be very stupid if you were to delete this.

`metaGenerator.js` - This file generates meta data from the commands directory. Do not in under any circumstances delete this file.

`index.js` - The main file in the project. DO NOT MESS WITH THE MESSAGE EVENT LISTENER AT THE BOTTOM OF THE FILE. Other than that you can add custom code to this file.

## Usage & Setup
The following describes how to use the command handler and how to setup your project.

### Local Setup
In order to setup a project using this command handler you need to clone the repository onto your machine.
```
git clone https://github.com/tahlilma/commander
```
After cloning the repository, rename it to whatever you want to call your project. After that open the folder in your code editor. 

After opening the folder in your editor the first thing you will want to do is in `package.json` change the `"name"` property to whatever you called your project back in the previous section.

Now we will do some bot setup which basically just involves creating a `.env` file in the root of the project and populating it with two values.
```
TOKEN=yourDiscordTokenHere
PREFIX=yourPrefixHere
```

After you have completed all the things listed above you need to install all the dependencies which can be done by running
```
npm install
```

After which you can start the bot in development mode by running 
```
npm run dev
```

**During prod remember to always use `npm run start` on the server, NOT `npm run dev`.**

After starting the bot you can go onto discord and in the server that your bot is in you can run the `ping` command which should be included in the `./commands` directory. You need to use your prefix before the command so like if your prefix is `$` the command will be `$ping`.

### Adding Commands
Now that you have finished setting up the project its time to add some commands.

You can add commands just by creating files in the `./commands` directory and exporting an object which has a certain schema. The following example will show you how we can add a command that will greet the user whenever the user invokes the command. Lets call the command `hi`.

The following will presume the prefix is `$`.

So in order to add a `$hi` command to the bot you need to create a `hi.js` file in the commands directory. Whatever name you give to the `js` file is what the command is gonna be triggered by. You can add an alternatate short verion of the command **inside** of the file. Since we want our bot to run a function when user uses `$hi` we need to name our file `hi.js`. 

Inside `hi.js` we need to `module.exports` an object which includes the following.
```js
module.exports = {
  name: "hi", 
  alt: "h",
  handler: (message) => { 
    message.reply("Hello");
  },
};

```

You might be wondering what the various object properties do. You can refer below to know what each property does.
```js
{
  name: String, // The actual command name, MUST BE SAME AS THE FILE NAME.
  alt: String, // The alternate small version of main command which will also trigger the command
  handler: Function // The command handler function, accepts the message object.
}
```

If all the above steps were followed correctly the bot should reply with hello when you send `$hi` in the discord server. If it does then you just managed to learn how to use this command handler / mini framework.

Thats all folks.