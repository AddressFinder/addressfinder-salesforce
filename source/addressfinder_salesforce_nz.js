/*
 * The AddressFinder for Salesforce script adds autocomplete capability for VisualForce pages.
 *
 * For more information view the README here:
 * https://github.com/AbleTech/addressfinder-salesforce/blob/master/README.md
 *
 * VERSION 1.0.0
 *
 * Copyright (c) 2016 Abletech
 */

/**************************** CONFIGURATION ****************************/
// AddressFinder license key.
var afKey = 'INSERT_LICENSE_KEY_HERE';

// AddressFinder country details (supports NZ and AU country codes). 
var countryCode = 'NZ';
var countryName = 'New Zealand';

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
        var postcode = cityAndPostcode[cityAndPostcode.length - 1];
        var city = cityAndPostcode.slice(0, cityAndPostcode.length - 1).join(' ');
        setFieldValue(cityId, city);
        setFieldValue(postcodeId, postcode);
                                       
        // populate street field
        setFieldValue(streetId, streetAddress);
        
        // populate city and postcode fields
        setFieldValue(cityId, cityAndPostcode[0]);
        setFieldValue(postcodeId, cityAndPostcode[1]);
        
        // retrieve address region & populate province field
        setFieldValue(provinceId, metaData.region);
        
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