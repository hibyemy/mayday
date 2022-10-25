# Mayday
**in alpha - do not use in production**

An app that allows you to send an SMS text to all your specified contacts in a click of a button!

Developed for the Congressional App Challenge.

# Prequesties
* Node.js 12.x or higher.
* A Twilio account SID, token, and number.
* A list of US (+1) numbers that you wish to send messages to and (if you are on the Twilio trial plan) have whitelisted your Twilio account. Delinate each number with a comma. Do not add spaces or hyphens.
* A `.env` in the project root containing the aforementioned information in the format:
```
TWILIO_ACCOUNT_SID='xxxxxxx'
TWILIO_AUTH_TOKEN='xxxxxx'
SENDER_NUMBER='+xxxxxxxxxxx'
WHITELIST='+1XXXXXXXXX,+1XXXXXXXXXX'
```

# Installation
0. Clone the repository to your system using the command: 
```bash
$ git clone https://github.com/hibyemy/mayday && cd mayday
```
1. Install dependencies:
```bash
$ npm install
```
2. Run the application:
```bash
$ npm run start
```

To expose the API to the web, configure your webserver to direct all requests at the `/api` subdirectory to port 7116.

# Quirks
The API responds to urlencoded POST requests at `/api/sos`. It requires 5 number values to be sent under the names `phonenumber1` to `phonenumber 5`, and a `message`. In the response, it sends a string confirming that it recieved the message as well as the numbers to which it failed sending the message (e.g. due to the number not following the correct format or not being whitelisted).

Although it logs the IPs of who send what request in the console, it currently **does not have any protection** to prevent anyone from using the API to send messages to whitelisted numbers.