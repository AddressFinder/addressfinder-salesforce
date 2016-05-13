/*!
 * The AddressFinder for Salesforce plugin adds autocomplete capability for VisualForce pages.
 *
 * For more information view the README here:
 * https://github.com/AbleTech/addressfinder-salesforce/blob/master/README.md
 *
 * VERSION 1.0.2
 *
 * Copyright (c) 2016 Abletech
 */
(function(d,w){

    /** CONFIGURATION *********************************************************************/
        // AddressFinder license key.
    var afKey       = 'INSERT_LICENSE_KEY_HERE',
        // AddressFinder country details (supports NZ and AU country codes).
        countryCode = 'NZ',
        countryName = 'New Zealand',
        // address field elements - update these IDs to match the address fields on your page
        // (the street input element is used as the address search field)
        streetId    = 'INSERT_STREET_FIELD_ID_HERE',
        cityId      = 'INSERT_CITY_FIELD_ID_HERE',
        provinceId  = 'INSERT_PROVINCE_FIELD_ID_HERE',
        postcodeId  = 'INSERT_POSTCODE_FIELD_ID_HERE',
        countryId   = 'INSERT_COUNTRY_FIELD_ID_HERE',
        // enable/disable debug mode (displays errors as JS alerts, else logs to console)
        debug       = true;
    /***************************************************************************************/
    
    /** PRIVATE FUNCTIONS ******************************************************************/
    
    /*
     * Sets the value of the input field corresponding to a given element id.
     * If the corresponding field is not found an error message is either
     * displayed in a JS alert or, if debug mode is disabled, logged to console.
     */
    var _setFieldValue = function(elementId, value) {
        // find the matching field
        var field = d.getElementById(elementId);
        // If the matching field exists
        if (field) {
            // update field value
            field.value = value;
            return;
        }
        // The field has not been found, log errors
        var errorMessage = 'AddressFinder Error: '
                            + 'Attempted to update value for field that could not be found.\n'
                            + '\nField ID: ' + elementId
                            + '\nValue: ' + value;
        if (debug) {
            alert(errorMessage);
        } else if (w.console) {
            console.log(errorMessage);
        }
    };

    /*
     * This callback function invokes the AF widget and binds it to the streetField
     * If the user selects a result, then it formats the address response data for 
     * use within the page's form.
     */
    var _initAF = function() {
        var streetField = d.getElementById(streetId),
            widget      = new AddressFinder.Widget(streetField, afKey, countryCode);

        widget.on('result:select', function(address, metaData) {
            
            // country is hardcoded to match the scope of the widget
            _setFieldValue(countryId, countryName);

            // get full address string from widget result
            var addressComponents = address.split(', ');
            var componentCount = addressComponents.length;

            // separate address components into city/postcode and street address
            var cityAndPostcode = addressComponents[componentCount - 1].split(' ');
            var streetAddress = addressComponents.slice(0, componentCount - 1).join('\n');

            // populate street field
            _setFieldValue(streetId, streetAddress);

            // populate city and postcode fields
            var city = cityAndPostcode.slice(0, cityAndPostcode.length - 1).join(' ');
            var postcode = cityAndPostcode[cityAndPostcode.length - 1];
            _setFieldValue(cityId, city);
            _setFieldValue(postcodeId, postcode);

            // retrieve address region & populate province field
            _setFieldValue(provinceId, metaData.region);

            // remove focus from street field
            streetField.blur();

        });
    };

    /*
     * This function is called when the window DOMContentLoaded event fires.
     * It adds the AddressFinder widget script, and when it loads, calls _initAF().
     */
    var _addScript = function() {
        var s = d.createElement('script');
        s.src = 'https://api.addressfinder.io/assets/v3/widget.js';
        s.async = 1;
        s.onload = _initAF;
        d.body.appendChild(script);
    };
    /***********************************************************************/

    /*
     * Add the AF widget when DOM content has loaded.
     * The widget (when downloaded) will then call the initAF function
     */
    w.addEventListener('DOMContentLoaded', _addScript);

})(document, window);