
// Sanity checks.
if ('undefined' === typeof jQuery) {
    throw "jQuery is not loaded! You must load it first!";
}
if ('undefined' === typeof $) {
    var $ = jQuery;
}
if ('undefined' === typeof sprintf) {
    throw "The 'sprintf()' function is not loaded! You must load it first! See https://github.com/alexei/sprintf.js.";
}

// This anonymous function adds the new instance method "xInput()" onto the jQuery prototype.
// This new instance method implements several actions on a given jQuery selector (see below).
// It also initialises the Node module, if the script is running under Node.
(function() {

    var init = function() {
        (function( $ ) {

            // Sanity checks.
            if ('undefined' !== typeof process) {
                if ('undefined' !== typeof $.fn.xInput) {
                    // Initialization already done.
                    return;
                }
            }

            // DESCRIPTION
            //      This function performs actions on a given jQuery selector.
            // INPUT
            //      - inAction
            //        The action to perform. The value can be:
            //          o getType
            //          o checkName
            //          o setState
            //          o setValue
            //          o getValue
            //          o setDefaultState
            //          o setDefaultValue
            //          o getDefault
            //          o reset
            //          o disable
            //          o enable
            //       - Zero or more argument(s) , depending on the action.
            //        
            // OUTPUT
            //      The return value depends on the performed action.

            $.fn.xInput = function() {

                var type = undefined;

                // DESCRIPTION
                //      This function checks if a given value is "empty".
                // INPUT
                //      Value to test.
                // OUTPUT
                //      If the input is empty, then the function returns the value true.
                //      Otherqize, the function returns the value false.

                var __isValueEmpty = function(inValue) {
                    
                    if ('undefined' === typeof inValue) {
                        return true;
                    }
                    if ("boolean" === typeof inValue) {
                        if (! inValue) { return true; }
                    }
                    if ("string"  === typeof inValue) {
                        if (inValue === '') {
                            return true;
                        }
                    }
                    if ("object"  === typeof inValue) {
                        if (inValue === null) {
                            return true;
                        }
                    }
                    
                    return false;           
                };

                var __setData = function(inJQueryElement, inKey, inValue) {
                    var data = inJQueryElement.data();

                    data = 'undefined' === typeof data ? {} : data;
                    data[inKey] = inValue;
                    inJQueryElement.data(data);
                };

                var __setDefaultValue = function(inJQueryElement, inValue) {
                    // /* DEBUG */ console.log(sprintf("Store the default value <%j>", inValue));
                    __setData(inJQueryElement, "default", inValue);
                };

                var __getDefaultValue = function(inJQueryElement) {
                    var data = inJQueryElement.data();

                    if ('undefined' === typeof data) {
                        return undefined;
                    }
                    if (! data.hasOwnProperty("default")) {
                        return undefined;
                    }
                    return data["default"];
                };

                // DESCRIPTION
                //      This function returns the "type" of a given input.
                // OUTPUT
                //      If the input is a form's input, then the function returns one of the following values:
                //      - "select".
                //      - Any type listed in the document http://www.w3schools.com/tags/att_input_type.asp.
                //      Otherwize, the function returns the value null.

                var getType = function() {
                    // Is it an <input> tag ?
                    // For a complete list of inputs, please see: http://www.w3schools.com/tags/att_input_type.asp
                    // Among other inputs, it includes: checkbox, file, hidden, password, radio, text.
                    if (this.is('input')) {
                        // Is the type of the input explicitly specified ?
                        // If no, then it is a text, by default.
                        return undefined != this.attr("type") ? this.attr("type").toLowerCase() : "text";
                    }

                    if (this.is('select')) {
                        return 'select';
                    }
                    return null;    
                };

                // DESCCRIPTION
                //     This function checks the name of a given input.
                // INPUTS
                //      - inOptCheckIfExists
                //        This parameter is optionnal.
                //        If the parameter's value is true, then the function checks that the input's has a name.
                // OUTPUT
                //      If the given entry is OK, then the function returns the value true.
                //      Otherwize, the function returns the value false.

                var checkName = function(inOptCheckIfExists) {
                    var valid  = /^[a-z_][0-9a-z_]+$/i;
                    var exists = "undefined" !== typeof inOptCheckIfExists ? inOptCheckIfExists : false;
                    var name   = this.attr("name");

                    if (false === name || 'undefined' === typeof name) {
                        if (exists) {
                            throw "ERROR: Given entry does not have a name!";
                        } else {
                            return false;
                        }
                    }
           
                    if (! valid.test(name)) { return false; }
                    return true;
                };

                // DESCRIPTION
                //      The fonction returns the current value, or the default value,
                //      of a given form's input (or undefined is no value is set).
                // INPUT
                //      - inOptDefault
                //        Specify whether we must get the default value of the current value.
                //        If true: get the default value.
                //        If false: get the current value.
                // OUTPUT
                //      The function returns the value of the given form's entry.
                //      If the entry is not set, then the function returns undefined.
                //      Please note that it could be a single scalar or an array.
                //      Arrays may be returned for fields of type "select".

                var getValue = function(inOptDefault) {
                    var type = undefined;

                    // DESCRIPTION
                    //      This function returns the current value, or the default value, of a given
                    //      radio group. Please note the returned value is the one that is attributed to the
                    //      radio button that is checked (currently or by default).
                    // INPUT
                    //      - inEntry
                    //        JQuery element that represents the radio group.
                    //      - inDefault
                    //        Specify whether we must return the element's default value or not.
                    // OUTPUT
                    //      If a current value, or a default value, is set for the radio group, then the function returns it.
                    //      Otherwize, the function returns the value undefined.

                    var getRadio = function(inEntry, inDefault) {
                        var result = undefined;

                        inEntry.each(function(inIndex, inElement) {
                            var value = $(inElement).attr("value");
                            var state = inDefault ? __getDefaultValue($(inElement)) : $(inElement).prop("checked"); // undefined, true or false.

                            // By default, we consider that a radio button is not checked.
                            state = "undefined" === typeof state ? false : state; // In case of default value only.

                            if (state) {
                                result = value;
                                return; // Return from the anonymous function, but continue the loop.
                            }
                        });
                        return result;
                    } 

                    // DESCRIPTION
                    //      This function returns the current value, or the default value, of a given chckbox.
                    // INPUT
                    //      - inEntry
                    //        JQuery element that represents the checkbox.
                    //      - inDefault
                    //        Specify whether we must return the element's default value or not.                
                    // OUTPUT
                    //      If a current value, or a default value, is set for the checkbox, then the function returns it.
                    //      Otherwize, the function returns the value undefined.                

                    var getCheckBox = function(inEntry, inDefault) {
                        var state = false;

                        if (inDefault) {
                            return __getDefaultValue(inEntry); // undefined, true or false.
                        }

                        state = inEntry.prop("checked");
                        return state ? inEntry.val() : undefined;
                    }

                    inOptDefault = "undefined" === typeof inOptDefault ? false : (inOptDefault ? true : false);

                    type = getType.apply(this);

                    // Process special cases.
                    switch (type) {
                        case null:  {
                            throw sprintf("Unknown type of input '%s'", this.tagName);
                        };
                        case "radio":    return getRadio(this, inOptDefault);
                        case "checkbox": return getCheckBox(this, inOptDefault);
                    } 

                    // Process general case.
                    if (inOptDefault) {
                        return __getDefaultValue(this);
                    }

                    return __isValueEmpty(this.val()) ? undefined : this.val();    
                }; // End of function getValue().

                // DESCRIPTION
                //      This function injects a given value into a given form's input.
                // INPUTS
                //      - inValue
                //        Value to inject.
                //        Please note that it could be a single scalar or an array.
                //        Arrays are used to set multiple values for entries of type "select".
                //      - inWhere
                //        Specify if the value is the default value for the entry, or if it is
                //        the current value.
                //        Value "current": set the current value.
                //        Value "default": set the default value.
                //        Default value: "current".

                var setValue = function(inValue, inWhere) {

                    if (typeof inWhere === 'undefined') {
                        inWhere = 'current';
                    }

                    // DESCRIPTION
                    //      This function sets the value, or the default value, for a group of radio buttons.   
                    // INPUT
                    //      - inEntry
                    //        jQuery object that points to the checkbox.
                    //      - inValue
                    //        Value to set.
                    //        This value represents the value of the attribute "value" of a given radio button.
                    //        In other words: the value that is submitted if the radio button checked.
                    //      - inWhere
                    //        Specify if the value "inValue" is the default value for the entry, or if it is
                    //        the current value.
                    //        Value "current": set the current value.
                    //        Value "default": set the default value.
                    //        Please note that tha default value "true" means "checked".

                    var setRadio = function(inEntry, inValue, inWhere) {
                        var done = false;

                        inEntry.each(function(inIndex, inElement) {

                            if ("undefined" === typeof inValue) {
                                // Do not set the defalut value.
                                __setDefaultValue($(inElement), undefined);
                                done = true;
                                return; // Return from the anonymous function, but continue the loop. 
                            }

                            var value = $(inElement).attr("value");
                            
                            if ("current" == inWhere) {
                                if (value == inValue) {
                                    $(inElement).prop("checked", true);
                                    done = true;
                                    return; // Return from the anonymous function, but continue the loop.                           
                                }
                            } else {
                                (function() {
                                    var v = false;
                                    if (value == inValue) {
                                        v = true;
                                        done = true;
                                    }
                                    __setDefaultValue($(inElement), v);
                                })();
                            }
                        });

                        if (! done) {
                            throw sprintf("Can not find the radio entry with the specified value '%s'.", inValue);
                        }
                    }

                    // DESCRIPTION
                    //      This function checks or unchecks a checkbox.
                    // INPUT
                    //      - inEntry
                    //        jQuery object that points to the checkbox.
                    //      - inState
                    //        Boolean: true or false.
                    //        True: the checkbox is checked.
                    //        False: the checkbox is unchecked.
                    //      - inWhere
                    //        Specify if the value "inState" is the default value for the entry, or if it is
                    //        the current value.
                    // NOTE
                    //      You cannot change the value of a checkbox.
                    //      You can only checks its state.

                    var setCheckbox = function(inEntry, inState, inWhere) {

                        // /* DEBUG */ console.log(sprintf("Calling Method setCheckbox(<%j>, <%j>)", inState, inWhere));

                        if ("boolean" !== typeof inState) {
                            throw sprintf("checkboxes' values are boolean (true, false) only! For checkboxes, you set the state, not the value! Got \"%j\"", inState);
                        }

                        if ("current" == inWhere) {
                            inEntry.prop("checked", inState);
                        } else {
                            __setDefaultValue(inEntry, inState);
                        }
                    }

                    // DESCRIPTION
                    //      This function sets a value for all types of inputs except for "checkboxes" and "radios".
                    // INPUT
                    //      - inEntry
                    //        jQuery object that points to the checkbox.
                    //      - inValue
                    //        Value to set. It can be a string or an array.
                    //        Arrays are used to specify values for multi selects.
                    //      - inWhere
                    //        Specify if the value "inValue" is the default value for the entry, or if it is
                    //        the current value.

                    var setInput = function(inEntry, inValue, inWhere) {
                        if ("current" == inWhere) {
                            inEntry.val(inValue);
                        } else {
                            __setDefaultValue(inEntry, inValue);
                        }
                    }

                    var type = getType.apply(this);
                    switch (type) {
                        case null:        throw sprintf("Unknown type of input '%s'", this.tagName);
                        case "radio":     setRadio(this, inValue, inWhere); break;
                        case "checkbox":  setCheckbox(this, inValue, inWhere); break;
                        default:          setInput(this, inValue, inWhere);
                    }   
                }; // End of function setValue();

                // DESCRIPTION
                //      This function resets the current form's input to its default value.
                // OUTPUT
                //      It the input has a default value, then the function returns the value true.
                //      Otherwize, the function returns the value false.

                var reset = function() {
                    var type         = getType.apply(this);
                    var defaultValue = getValue.apply(this, [true]);

                    // /* DEBUG */ console.log(sprintf("Default value for type <%s> is <%j>.", type, defaultValue));

                    if ("undefined" === typeof defaultValue) {
                        return false;
                    }

                    // Warning: for checkboxes, we set the default __STATE__, not the default value!
                    //          The defaut state for a checkboxe may be:
                    //          o true
                    //          o false
                    //          o undefined (at this point in the code, this case is not possible)

                    setValue.apply(this, [defaultValue, "current"]);
                    return true;
                };

                // DESCRIPTION
                //      This function disables an input.

                var disable = function() {
                    this.prop("disabled", true);
                }

                // DESCRIPTION
                //      This function enables an input.

                var enable = function() {
                    this.prop("disabled", false);
                }

                // Sanity checks.
                var args = Array.prototype.slice.call(arguments); // Warning: to be tested on all browsers.
                if (0 == args.length) {
                    throw "Method xInput requires at least one argument: the name of the action to execute.";
                }
                var action = args.shift();

                type = getType.apply(this);
                if (('checkbox' != type) && (('setState' == action) || ('setDefaultState' == action))) {
                    throw "The methods setState() and setDefaultState() are only usable to set state for checkboxes.";
                    // However… you can still use the method setValue() to set the state of a checkbox.
                }

                switch(action) {
                    // Please note that the use of "apply" is mandatory.
                    // The function must execute within the JQuery function's environment.
                    case "getType": return getType.apply(this);
                    case "checkName": return checkName.apply(this, args);
                    case "getValue": return getValue.apply(this, [false]);
                    case "setState": // For checkboxes only.
                    case "setValue": return setValue.apply(this, (function() { args.push("current"); return args; })());
                    case "setDefaultState": // For checkboxes only.
                    case "setDefaultValue": return setValue.apply(this, (function() { args.push("default"); return args; })());
                    case "getDefault": return getValue.apply(this, [true]);
                    case "reset": return reset.apply(this);
                    case "disable": return disable.apply(this);
                    case "enable": return enable.apply(this);
                    default: throw sprintf("Unknown action \"%s\".", inAction);
                    
                }
            } // End of $.fn.xInput.

            // console.log('form.js: Initialization done.');

        })( jQuery );
    } // End of function init().



    // See:
    // http://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate
    // If you want to have a module execute code multiple times, then export a function, and call that function.

    if ('undefined' !== typeof process) {
        // Execute within nodeJs.
        module.exports = { init: init };
    } else {
        // Execute within a browser.
        init();
    }

})();




