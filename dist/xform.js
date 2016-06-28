
// Initialize the module if we are running under node.
if ('undefined' !== typeof process) {
    module.exports = {};
    // Nothing to do.
}

// Sanity checks.
if ('undefined' === typeof jQuery) {
    throw "jQuery is not loaded! You must load it first.";
}
if ('undefined' === typeof $) {
    var $ = jQuery;
}
if ('undefined' === typeof sprintf) {
    throw "The 'sprintf()' function is not loaded! You must load it first! See https://github.com/alexei/sprintf.js.";
}
if ('undefined' === typeof jQuery.fn.xInput) {
    throw "The module 'xinput.js' is not loaded! You must load it first.";
}

if ("undefined" !== typeof XForm) {
    throw "XForm is already defined! You may have already loaded it. Or you may use another module with the same name.";
}

// DESCRIPTION
//      XForm constructor.
// INPUT
//      - inDomId
//        DOM ID of the form.

var XForm = function(inDomId) {
    if ("undefined" === typeof inDomId) {
        throw "Invalid value for parameter inDomId: value is undefined.";
    }
    this.id = inDomId;
};

XForm.prototype = {
    id: undefined,
    inputs: undefined,

    // DESCRIPTION
    //      This method checks that the form is ready to be used.
    // INPUT
    //      - inOptName
    //        This value is optional. It represents the name of a given entry.
    //        If given, then the method checks that this name is associated with an entry.

    __checks: function(inOptName) {
        if ('undefined' === typeof this.inputs) {
            throw sprintf("The formular which id is '%s' is not Initialized! Please set the list of inputs, using the method setInputs().", this.id);
        }
        if ("undefined" !== typeof inOptName) {
            if (! this.inputs.hasOwnProperty(inOptName)) {
                throw sprintf("This formular which id is '%s' does not have any input which name is '%s'.", this.id, inOptName);
            }
        }
    },

    // DESCRIPTION
    //      This method initializes the list of inputs' names for the form.  
    // INPUT
    //      - inArrayInputsNames
    //        Array that contains the names of the form's inputs.
    // OUTPUT
    //     this

    setInputs: function(inArrayInputsNames) {
        var list = {};

        for (var i=0; i<inArrayInputsNames.length; i++) {
            var name     = inArrayInputsNames[i];
            var selector = "#" + this.id + " " + "[name='" + name + "']";
            var element  = $(selector);

            if (0 == element.length) {
                throw sprintf("The form which id is '%s' does not have any input which name is '%s'.", this.id, name);
            }
            if (! element.xInput("checkName")) {
                throw sprintf("The input's name '%s', for the form which id is '%s', is not valid.", name, this.id);   
            }
            if (list.hasOwnProperty(name)) {
                throw sprintf("The given list of inputs' names contains duplicated names. Found that name '%s' is duplicated.", name);
            }

            list[name] = { jquery: element };
        }
        this.inputs = list;
        return this;
    }, 

    // DESCRIPTION
    //      This methods returns the form's inputs.
    // INPUT
    //      - inOptType
    //        Specify the type of returned values. It could be jQuery elements or names.
    //        If the given value is "jquery", then the returned list contains jQuery elements.
    //        If the given value is "string", then the returned list contains the names of the elements.
    //        If the given value is "both", then the method returns an object that associates the inputs' names with their jQuery elements.
    //          - keys: the inputs' names.
    //          - values: the jQuery elements.
    //        The default value is "both".
    // OUTPUT
    //      - If "inOptType = jquery", then the method returns a list that contains jQuery elements.
    //      - If "inOptType = string", then the method returns a list that contains the names of the elements.
    //      - if "inOptType = both", then the method returns an object that associates inputs' names with their jQuery elements.

    getInputs: function(inOptType) {

        if (typeof inOptType === 'undefined') {
            inOptType = 'both';
        } else {
            inOptType = inOptType.toLowerCase();
        }

        if ((inOptType != 'jquery') && (inOptType != 'string') && (inOptType != 'both')) {
            throw sprintf("Invalid value for optional argument 'inOptType'. Valid values are 'jquery', 'string' or 'both'. Given value: '%s'.", inOptType);
        }

        var list = inOptType == 'both' ? {} : [];
        
        for (var name in this.inputs) {

            if (! this.inputs.hasOwnProperty(name)) {
                continue;
            }

            if (inOptType == 'jquery') {
                list.push(this.inputs[name]['jquery']);
            } else if (inOptType == 'string') {
                list.push(name);
            } else {
                list[name] = this.inputs[name]['jquery']
            }
        }

        return list;
    },

    // DESCRIPTION
    //      This method returns an object that contains all the inputs' values.
    // OUTPUT
    //      The method returns an object.
    //      Object's properties are inputs' names.
    //      Object's properties' values are inputs' values.

    getValues: function() {
        var list = {};

        this.__checks();
        for (var name in this.inputs) {
            var element = undefined;
            var value   = undefined;

            if (! this.inputs.hasOwnProperty(name)) {
                continue;
            }

            element = this.inputs[name]['jquery'];
            value = element.xInput("getValue");
            list[name] = value;
        }

        return list;
    }, 

    // DESCRIPTION
    //      This method sets the form's values.
    // INPUT
    //      - inValues
    //        Object that contains the values to set.
    //        Key: name of the form's input.
    //        Value: value of the form's input.
    //      _ InOptWhere
    //        Specify if the value is the default value for the entry, or if it is
    //        the current value.
    //        Value "current": set the current value.
    //        Value "default": set the default value.
    //        Default value: "current".     
    // OUTPUT
    //      this

    setValues: function(inValues, InOptWhere) {

        if (typeof InOptWhere === 'undefined') {
            InOptWhere = 'current';
        }

        for (var name in inValues) {
            var element = undefined;

            if (! inValues.hasOwnProperty(name)) {
                continue;
            }

            // /* DEBUG */ console.log(sprintf("Set %s value for <%s>: <%j>", InOptWhere, name, inValues[name]));

            element = this.inputs[name]['jquery'];
            element.xInput('setValue', inValues[name], InOptWhere);
        }
        return this;
    },

    // DESCRIPTION
    //      This method sets an input's value.
    // INPUT
    //      - inName
    //        Name of the input to set.
    //      - inValue
    //        Input's value.
    // OUTPUT
    //      this
    // NOTE
    //      This method can be used for all types of inputs (including checkboxes).

    setValue: function(inName, inValue) {
        var element = undefined;

        this.__checks(inName);
        element = this.inputs[inName]['jquery'];
        element.xInput("setValue", inValue);
        return this;
    },

    // DESCRIPTION
    //      This method sets the state of a checkbox.
    // INPUT
    //      - inName
    //        Name of the checkbox.
    //      - inState
    //        Checkbox's state. Value can be "true" (checked) or false" (unchecked).
    // OUTPUT
    //      this
    // NOTE
    //      This method can be used for checkboxes only.

    setState: function(inName, inState) {
        var element = undefined;

        this.__checks(inName);
        element = this.inputs[inName]['jquery'];
        element.xInput("setState", inState);
        return this;          
    },

    // DESCRIPTION
    //      This method returns the value of a specified form's input.
    // INPUT
    //      - inName
    //        Name of the form's input.
    // OUTPUT
    //      The method returns the input's value.

    getValue: function(inName) {
        var element = undefined;

        this.__checks(inName);
        element = this.inputs[inName]['jquery'];
        return element.xInput("getValue");
    },

    // DESCRIPTION
    //      This method returns the jQuery element associated to a specified form's input.
    // INPUT
    //      - inName
    //        Name of the form's input.
    // OUTPUT
    //      The method returns the input's jQuery element.

    getElement: function(inName) {
        this.__checks(inName);
        return this.inputs[inName]['jquery'];
    },

    // DESCRIPTION
    //      This method sets the default value of a specified form's input.
    // INPUT
    //      - inName
    //        Name of the form's field.
    //      - inValue
    //        The default value.
    // OUTPUT
    //      this
    // NOTE
    //      This method is usable on all types of inputs (including checkboxes).

    setDefaultValue: function(inName, inValue) {
        var element = undefined;

        this.__checks(inName);
        element = this.inputs[inName]['jquery'];
        element.xInput("setDefaultValue", inValue);
        return this;
    },

    // DESCRIPTION
    //      This method sets the default state of a specified checkbox.
    // INPUT
    //      - inName
    //        Name of the form's input.
    //      - inState
    //        Input's state (checked or not).
    // OUTPUT
    //      this
    // NOTE
    //      This method is usable for checkboxes only.

    setDefaultState: function(inName, inState) {
        var element = undefined;

        this.__checks(inName);
        element = this.inputs[inName]['jquery'];
        element.xInput("setDefaultState", inState);
        return this;
    },

    // DESCRIPTION
    //      This method returns the default value of a specified form's input.
    // INPUT
    //      - inName
    //        Name of the form's input.

    getDefaultValue: function(inName) {
        var element = undefined;

        this.__checks(inName);
        element = this.inputs[inName]['jquery'];
        return element.xInput("getDefault");
    },

    // DESCRIPTION
    //      This method disables an input specified by its name.
    // INPUT
    //      - inName
    //        Name of the input to disable.
    // OUTPUT
    //      this

    disableInput: function(inName) {
        var element = undefined;

        this.__checks(inName);
        element = this.inputs[inName]['jquery'];

        if (0 == element.length) {
            element.xInput("disable");    
        } else {
            // These are radio boxes.
            element.each(function(inIndex) {
                $(this).xInput("disable");
            });
        }
        return this;
    },

    // DESCRIPTION
    //      This method enables an input specified by its name.
    // INPUT
    //      - inName
    //        Name of the input to enable.
    // OUTPUT
    //      this

    enableInput: function(inName) {
        var element = undefined;

        this.__checks(inName);
        element = this.inputs[inName]['jquery'];

        if (0 == element.length) {
            element.xInput("enable");    
        } else {
            // These are radio boxes.
            element.each(function(inIndex) {
                $(this).xInput("enable");
            });
        }
        return this;
    },

    // DESCRIPTION
    //      This method resets a specified form's input.
    //      The "current" value of the input (which is printed) is set to the default's (if set).
    // INPUT
    //      - inName
    //        Name of the form's input.
    // OUTPUT
    //      If the input has been reset, then the method returns the value true.
    //      Otherwise, it returns the value false.

    resetInput: function(inName) {
        var element = undefined;

        this.__checks(inName);

        element = this.inputs[inName]['jquery'];
        return element.xInput("reset");
    },

    // DESCRIPTION
    //      This methods resets all form's inputs.
    // OUTPUT
    //      The method returns an objet that indicates whether an input has been reset or not.
    //      Key: name of the form's input.
    //      Value: if the form's input has been reset, then the value is true.
    //             Otherwise, it returns the value false.

    reset: function() {
        this.__checks();
        var list = {};
        for (var name in this.inputs) {
            var element = undefined;

            if (! this.inputs.hasOwnProperty(name)) {
                continue;
            }

            element = this.inputs[name]['jquery'];
            list[name] = element.xInput("reset");
        }
        return list;
    }
}; // End of XForm.prototype.

if ('undefined' !== typeof process) {
    // Execute within nodeJs.
    module.exports = XForm;
    // module.exports.prototype  = XForm.prototype ;
} 



