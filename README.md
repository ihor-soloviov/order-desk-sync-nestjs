# Order Desk Synchronization Script

This project contains a script that synchronizes new orders from Order Desk and displays a
Requirements

## To run this script, you will need:

    Nest.js
    Axios

## Installation

    Clone this repository to your local machine.
    Install the dependencies by running `npm install` in the project directory.

## Usage

To run the script, simply run npm start in the project directory. The script will fetch new orders from Order Desk and display a line with the order ID and shipping address for each new order.

By default, the script is configured to run hourly using the node-schedule package. You can modify the schedule in the app.js file by changing the cron expression.
Notes

Unfortunately, Order Desk does not currently support a Node.js SDK, so I had to use the axios package to work with their API.

I also got acquainted with the node-schedule package, which makes it easy to schedule tasks like this one in Nest.js.

If you have any questions or feedback, please feel free to open an issue or submit a pull request. Thanks for using our script!
