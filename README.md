# AddressFinder plugin for Salesforce

Enables Salesforce developers to add autocomplete capability for Australian and New Zealand addresses. 

![Alt Text](assets/salesforce-au.gif)

The AddressFinder plugin for Salesforce provides the following features:
- Address autocompletion for New Zealand and Australian Addresses
- Ability to customise the integration on Salesforce pages

## Install Instructions

**_Insert Screencast Walkthrough Here_**

1. Copy our script source:
	- [AddressFinder for Salesforce New Zealand](source/addressfinder_salesforce_nz.js)
	- [AddressFinder for Salesforce Australia](source/addressfinder_salesforce_au.js)
2. Paste the script into your VisualForce page
3. Edit the `CONFIGURATION` block
  1. Enter your AddressFinder license key and country details
  2. Edit the Address field IDs to match your page
  3. Set debug mode (enabled by default).  This displays JS alerts if any of your address field IDs are misconfigured.  
  4. When working successfully, disable debug mode. Any errors will be silently logged to the Javascript console.

#### Obtaining a license key

New users can register for a free account at one of these links:
- [Free Account for Australia](https://portal.addressfinder.io/signup/au/free)
- [Free Account for New Zealand](https://portal.addressfinder.io/signup/nz/free)

Existing users can obtain their API key from the [AddressFinder Portal](https://portal.addressfinder.io).

#### Implementation Examples

Read and copy our code within the [example VisualForce pages](examples).

## Software License

The AddressFinder plugin for Salesforce is released under the permissive free software [MIT License](LICENSE).
