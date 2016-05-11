# AddressFinder for Salesforce

## What is the AddressFinder for Salesforce script?

Enables Salesforce developers to implement autocompletion of New Zealand and Australian Addresses in custom VisualForce pages. 

![Alt Text](assets/addressfinder-salesforce-NZ.gif)

The AddressFinder for Salesforce script provides the following features:
- Address autocompletion for New Zealand and Australian Addresses
- Customisability for integration with custom Salesforce pages

## Install Instructions

**_Insert Screencast Walkthrough Here_**

1. Copy our script source from the [AddressFinder for Salesforce script](https://github.com/AbleTech/addressfinder-salesforce/blob/master/addressfinder_salesforce.js) in our GitHub repository
2. Paste the script into your VisualForce page
3. Edit the `CONFIGURATION` block
  1. Enter your AddressFinder license key and country details
  2. Edit the Address field IDs to match your page
  3. Set debug mode (enabled by default).  This simply displays JS alerts if any of your Address field IDs are misconfigured.  You may prefer to disable debug mode, in which case these errors will be logged to the browser console.

New users can register for a free account at one of these links:
- [Free Account for Australia](https://portal.addressfinder.io/signup/au/free)
- [Free Account for New Zealand](https://portal.addressfinder.io/signup/nz/free)

Existing users can obtain their API key from the [AddressFinder Portal](https://portal.addressfinder.io).

For full example code take a look at our [example VisualForce pages](https://github.com/AbleTech/addressfinder-salesforce/tree/master/examples).

## Open Source

The AddressFinder for Salesforce script is Open Source.
