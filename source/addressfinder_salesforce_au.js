/*
 * The AddressFinder for Salesforce plugin adds autocomplete capability for VisualForce pages.
 *
 * For more information view the README here:
 * https://github.com/AbleTech/addressfinder-salesforce/blob/master/README.md
 *
 * VERSION 1.0.1
 *
 * Copyright (c) 2016 Abletech
 */

/**************************** CONFIGURATION ****************************/
// AddressFinder license key.
var afKey = 'INSERT_LICENSE_KEY_HERE';

// AddressFinder country details (supports NZ and AU country codes).
var countryCode = 'AU';
var countryName = 'Australia';

// address field elements - update these IDs to match the address fields on your page
// (the street input element is used as the address search field)
var streetId = 'INSERT_STREET_FIELD_ID_HERE';
var cityId = 'INSERT_CITY_FIELD_ID_HERE';
var provinceId = 'INSERT_PROVINCE_FIELD_ID_HERE';
var postcodeId = 'INSERT_POSTCODE_FIELD_ID_HERE';
var countryId = 'INSERT_COUNTRY_FIELD_ID_HERE';

// enable/disable debug mode (displays errors as JS alerts, else logs to console)
var debug = true;
/***********************************************************************/


// initialise and configure AddressFinder widget
var widget;
var streetField = document.getElementById(streetId);

initAF = function() {
    widget = new AddressFinder.Widget(
        streetField,
        afKey,
        countryCode
    );

    widget.on("result:select", function(address, metaData) {

        // country is hardcoded to match the scope of the widget
        setFieldValue(countryId, countryName);

        // get full address string from widget result
        var addressComponents = address.split(', ');
        var componentCount = addressComponents.length;

        // separate address components into city/postcode and street address
        var cityStatePostcode = addressComponents[componentCount - 1].split(' ');
        var streetAddress = addressComponents.slice(0, componentCount - 1).join('\n');

        // populate street field
        setFieldValue(streetId, streetAddress);

        // populate city, state and postcode fields
        var cspLength = cityStatePostcode.length;
        var city = cityStatePostcode.slice(0, cspLength - 2).join(' ');
        var state = cityStatePostcode[cspLength - 2];
        var postcode = cityStatePostcode[cspLength - 1];
        setFieldValue(cityId, city);
        setFieldValue(provinceId, state);
        setFieldValue(postcodeId, postcode);

        // remove focus from street field
        streetField.blur();
    });
};

// load widget when DOM content has loaded
document.addEventListener("DOMContentLoaded", (function(event) {
    var script = document.createElement('script');
    script.src = '//api.addressfinder.io/assets/v3/widget.js';
    script.async = true;
    script.onload = event;
    document.body.appendChild(script);
})(initAF));

/*
 * Sets the value of the input field corresponding to a given element id.
 * If the corresponding field is not found an error message is either
 * displayed in a JS alert or, if debug mode is disabled, logged to console.
 */
var setFieldValue = function(elementId, value) {

    // update field value
    var field = document.getElementById(elementId);
    if (field) {
        field.value = value;
        return;
    }

    // handle field not found
    var errorMessage = "AddressFinder Error: Attempted to update value for field that could not be found.\n"
                        + "\nField ID: \t" + elementId
                        + "\nValue: \t" + value;
    if(debug){
        alert(errorMessage);
    } else {
        if (window.console) {
            console.log(errorMessage);
        }
    }
}
