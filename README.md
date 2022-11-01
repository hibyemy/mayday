# Mayday
**in alpha - do not use in production**

An app that sends an urgent SMS text to your specified emergency contacts in a click of a button!

Developed for the Congressional App Challenge.

# Installation
## Prerequisites
* Node.js `12.x` or higher.
* A Twilio account SID, token, and number.
* A domain to host on.
* (Optional for paid plans) A list of US (+1) numbers that you wish to send messages to have whitelisted your Twilio account. Delinate each number with a space. Do not add spaces, hyphens, or parentheses within phone numbers.
* A `.env` in the project root containing the aforementioned information in the format:
```
TWILIO_ACCOUNT_SID='xxxxxxx'
TWILIO_AUTH_TOKEN='xxxxxx'
SENDER_NUMBER='+xxxxxxxxxxx'
WHITELIST='+1XXXXXXXXX +1XXXXXXXXXX'
HOST='http://localhost:3000 https://example.com'
```
### Additional enviromental variables
* You may change the port that the app runs on with `PORT`.
* If you are paying for Twilio, you can disable the whitelist requirement by adding:
```
PAID='true'
```

## Install
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
The API responds to JSON POST requests at `/api/sos`. It requires phone number values to be sent in an array titled "contacts" with the format +1XXXXXXXXXX (so US only). In the HTTP response, it sends a string confirming that it recieved the message plus the numbers to which it failed in sending the message (e.g. due to the number not following the correct format or not being whitelisted).

Although it logs the IPs of who send what request in the console, it currently **does not have any protection** to prevent anyone from using the API to send messages to whitelisted numbers.