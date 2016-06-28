# Introduction

Handling forms is one of the very basic tasks for all WEB site designers. There are many frameworks out there that simplify this task. However, for basic usages, a simple and straightforward approach using jQuery may be the best solution : everybody knows jQuery and jQuery’s API is very stable.

This library extends jQuery’s API’s in two ways :

* It homogenises the jQuery’s API used to interact with forms’ inputs (radio boxes, select…).
* It introduces useful concepts such as inputs’ default values.






# Installation

## Installation for end user

If you only want to use the library, then the easiest way to install it is through Bower:

	bower install xform --production

## Installation for developers

If you want to get the examples, then you should get a copy of the GIT repository.

Then you must install the dependencies:

	bower install xform






# API

## setInputs(inArrayInputsNames)

### Description

This method initializes the list of inputs' names for the form.

**INPUT**

> **inArrayInputsNames**
> 
> Array that contains the names of the form's inputs.

**OUTPUT**

<code>this</code> (the jQuery element that represents the form)

### Example

HTML

```HTML
<form id="myForm">
	<input type="text" name="input_text"/>
	<input type="password" name="input_password"/>
</form>
```

JS

```JavaScript
var myForm = new XForm('myForm');
myForm.setInputs(["input_text", "input_password"]);
```

Please note that the "inputs' container" does not have to be a form's element (<code>&lt;form&gt;</code>).
It can be a <code>&lt;div&gt;</code> element as well.



<!-- ---------------------------------------------------------------------------------------------------------- -->



## getInputs([inOptType="both"])

### Description

This methods returns the form's inputs.

**INPUT**

> **inOptType**
>
> Specify the type of returned values. The value may be:
>
> * "<code>jquery</code>".
> * "<code>string</code>".
> * "<code>both</code>".
>
> The default value is "<code>both</code>".

**OUTPUT**

> Depending on the value of the parameter <code>inOptType</code>, the method returns an array or an object.
>
> * If the given value is "<code>jquery</code>", then methods returns an attay. The returned array contains jQuery elements.
> * If the given value is "<code>string</code>", then methods returns an attay. The returned array contains the names of the elements.
> * If the given value is "<code>both</code>", then the method returns an object that associates the inputs' names with their jQuery elements.
>    * keys: the inputs' names.
>    * values: the jQuery elements.

### Example

HTML

```HTML
<form id="myForm">
	<input type="text" name="input_text"/>
	<input type="password" name="input_password"/>
</form>
```

JS

```JavaScript
var myForm = new XForm('myForm');
myForm.setInputs(["input_text", "input_password"]);
var inputsBoth     = myForm.getInputs();         // => { input_text: <jQuery object>, input_password: <jQuery object>}
var inputsElements = myForm.getInputs("jquery"); // => [<jQuery object>, <jQuery object>]
var inputsNames    = myForm.getInputs("string"); // => ["input_text", "input_password"]
```


<!-- ---------------------------------------------------------------------------------------------------------- -->



## getElement(inName)

### Description

This method returns the jQuery element associated to a specified form's input.

**INPUT**

> **inName**
>
> Name of the form's input.

**OUTPUT**

> The method returns the input's jQuery element.

### Example

HTML

```HTML
<form id="myForm">
	<input type="text" name="input_text"/>
	<input type="password" name="input_password"/>
</form>
```

JS

```JavaScript
var myForm = new XForm('myForm');
myForm.setInputs(["input_text", "input_password"]);
var element = myForm.getInput("input_text");  // => <jQuery object>
```



<!-- ---------------------------------------------------------------------------------------------------------- -->



## setValue(inName, inValue)

### Description

This method sets an input's value.

**INPUT**

> **inName**
>
> Name of the input to set.
>
> **inValue**
>
> Input's value. Please note that:
>
> * For an "multi select", value must be an array (of values).
> * For a checkbox, value must be a boolean (<code>true</code>: checked or <code>false</code>: unchecked).

**OUTPUT**

<code>this</code> (the jQuery element that represents the form)

### Example

HTML

```HTML
<form id="myForm">
	<input type="text" name="input_text"/>
	<input type="password" name="input_password"/>
</form>
```

JS

```JavaScript
var myForm = new XForm('myForm');
myForm.setInputs(["input_text", "input_password"]);
myForm.setValue("input_text", "bla bla bla");
```



<!-- ---------------------------------------------------------------------------------------------------------- -->



## setState(inName, inState)

### Description

This method sets the state of a checkbox.

> Please note that you can also use the method <code>setValue</code> to set the state of a checkbox.

**INPUT**

> **inName**
>
> Name of the checkbox.
>
> **inState**
>
> Checkbox's state. Value can be <code>true</code> (checked) or <code>false</code> (unchecked).

**OUTPUT**

<code>this</code> (the jQuery element that represents the form)

### Example

```HTML
<form id="myForm">
	<input type="text" name="input_text"/>
	<input type="checkbox" name="input_checkbox" value="yes of course"/>&nbsp;Yes of course
</form>
```

JS

```JavaScript
var myForm = new XForm('myForm');
myForm.setInputs(["input_text", "input_checkbox"]);
myForm.setState("input_checkbox", true);

// Or (this also works):

myForm.setValue("input_checkbox", true);
```



<!-- ---------------------------------------------------------------------------------------------------------- -->



## getValue(inName)

### Description

This method returns the value of a specified form's input.

**INPUT**

> **inName**
>
> Name of the form's input.

**OUTPUT**

> The method returns the input's value.

### Example

HTML

```HTML
<form id="myForm">
	<input type="text" name="input_text"/>
	<input type="password" name="input_password"/>
</form>
```

JS

```JavaScript
var myForm = new XForm('myForm');
myForm.setInputs(["input_text", "input_password"]);
var value = myForm.getValue("input_text");
```



<!-- ---------------------------------------------------------------------------------------------------------- -->



## setValues: function(inValues, [InOptWhere="current"])

### Description

This method sets the form's values.

**INPUT**

> **inValues**
>
> Object that contains the values to set.
>
> * Key: name of the form's input.
> * Value: value of the form's input.
>
> **InOptWhere**
>
> Specify if the value is the *default* value for the entry, or if it is the *current* value.
>
> * Value "current": set the current value.
> * Value "default": set the default value.
>
> Default value: "current".    

**OUTPUT**

<code>this</code> (the jQuery element that represents the form)

### Example

HTML

```HTML
<form id="myForm">
	<input type="text" name="input_text"/>
	<input type="password" name="input_password"/>
</form>
```

JS

```JavaScript
var myForm = new XForm('myForm');
myForm.setInputs(["input_text", "input_password"]);

var values = {
	input_text: "bla bla bla",
	input_password: "secret"
};

myForm.setValues(values); // => Set the __CURRENT__ values.
myForm.setValues(values, "default"); // => Set the __DEFAULT__ values.
```



<!-- ---------------------------------------------------------------------------------------------------------- -->



## getValues()

### Description

This method returns an object that contains all the inputs' values.

**INPUT**

N/A

**OUTPUT**

> The method returns an object.
>
> * Object's properties are inputs' names.
> * Object's properties' values are inputs' values.

### Example

HTML

```HTML
<form id="myForm">
	<input type="text" name="input_text"/>
	<input type="password" name="input_password"/>
</form>
```

JS

```JavaScript
var myForm = new XForm('myForm');
myForm.setInputs(["input_text", "input_password"]);
myForm.getValues(); // => { input_text: "bla bla", input_password: "secret" }
```



<!-- ---------------------------------------------------------------------------------------------------------- -->



## setDefaultValue(inName, inValue)

### Description

This method sets the default value of a specified form's input.

> Please note that this method is usable on all types of inputs (including checkboxes).

**INPUT**

> **inName**
>
> Name of the form's field.
>
> **inValue**
>
> The default value. Please note that:
>
> * For an "multi select", value must be an array (of values).
> * For a checkbox, value must be a boolean (<code>true</code>: checked or <code>false</code>: unchecked).

**OUTPUT**

<code>this</code> (the jQuery element that represents the form)

### Example

HTML

```HTML
<form id="myForm">
	<input type="text" name="input_text"/>
	<input type="checkbox" name="input_checkbox" value="yes of course"/>&nbsp;Yes of course
</form>
```

JS

```JavaScript
var myForm = new XForm('myForm');
myForm.setInputs(["input_text", "input_checkbox"]);
myForm.setDefaultValue("input_text", "bla bla");
myForm.setDefaultValue("input_checkbox", true);
```



<!-- ---------------------------------------------------------------------------------------------------------- -->



## setDefaultState(inName, inState)

### Description

This method sets the default state of a specified checkbox.

> Please note that you can also use the method <code>setDefaultState</code> to set the state of a checkbox.

**INPUT**

> **inName**
> 
> Name of the form's input.
> 
> **inState**
>
> Input's state (<code>true</code>: checked or <code>false</code>: unchecked).

**OUTPUT**

<code>this</code> (the jQuery element that represents the form)

### Example

HTML

```HTML
<form id="myForm">
	<input type="text" name="input_text"/>
	<input type="checkbox" name="input_checkbox" value="yes of course"/>&nbsp;Yes of course
</form>
```

JS

```JavaScript
var myForm = new XForm('myForm');
myForm.setInputs(["input_text", "input_checkbox"]);
myForm.setDefaultValue("input_text", "bla bla");
myForm.setDefaultValue("input_checkbox", true);
```



<!-- ---------------------------------------------------------------------------------------------------------- -->



## getDefaultValue(inName)

### Description

This method returns the default value of a specified form's input.

**INPUT**

> **inName**
>
> Name of the form's input.

**OUTPUT**

The method returns the default value.

### Example

HTML

```HTML
<form id="myForm">
	<input type="text" name="input_text"/>
	<input type="checkbox" name="input_checkbox" value="yes of course"/>&nbsp;Yes of course
</form>
```

JS

```JavaScript
var myForm = new XForm('myForm');
myForm.setInputs(["input_text", "input_checkbox"]);
myForm.setDefaultValue("input_text", "bla bla");
myForm.setDefaultValue("input_checkbox", true);
var dv1 = myForm.getDefaultValue("input_text"); // => "bla bla"
var dv2 = myForm.getDefaultValue("input_checkbox"); // => true 
```



<!-- ---------------------------------------------------------------------------------------------------------- -->



## disableInput(inName)

### Description

This method disables an input specified by its name.

**INPUT**

> **inName**
>
> Name of the input to disable.

**OUTPUT**

<code>this</code> (the jQuery element that represents the form)

### Example

HTML

```HTML
<form id="myForm">
	<input type="text" name="input_text"/>
	<input type="checkbox" name="input_checkbox" value="yes of course"/>&nbsp;Yes of course
</form>
```

JS

```JavaScript
var myForm = new XForm('myForm');
myForm.setInputs(["input_text", "input_checkbox"]);
myForm.disableInput("input_text");
```



<!-- ---------------------------------------------------------------------------------------------------------- -->



## enableInput(inName)

### Description

This method enables an input specified by its name.

**INPUT**

> **inName**
>
> Name of the input to enable.

**OUTPUT**

<code>this</code> (the jQuery element that represents the form)

### Example

HTML

```HTML
<form id="myForm">
	<input type="text" name="input_text"/>
	<input type="checkbox" name="input_checkbox" value="yes of course"/>&nbsp;Yes of course
</form>
```

JS

```JavaScript
var myForm = new XForm('myForm');
myForm.setInputs(["input_text", "input_checkbox"]);
myForm.enableInput("input_text");
```



<!-- ---------------------------------------------------------------------------------------------------------- -->



## resetInput(inName)

### Description

This method resets a specified form's input.
The _current_ value of the input (which is printed) is set to the _default's_ (if set).

**INPUT**

> **inName**
>
> Name of the form's input.

**OUTPUT**

> If the input has been reset, then the method returns the value true.
> Otherwise, it returns the value false.

### Example

HTML

```HTML
<form id="myForm">
	<input type="text" name="input_text"/>
	<input type="checkbox" name="input_checkbox" value="yes of course"/>&nbsp;Yes of course
</form>
```

JS

```JavaScript
var myForm = new XForm('myForm');
myForm.setInputs(["input_text", "input_checkbox"]);
myForm.setDefaultValue("input_text", "bla bla");
myForm.setDefaultValue("input_checkbox", true);

// ...

myForm.resetInput("input_text");     // => The text "bla bla" will be injected into the text field.
myForm.resetInput("input_checkbox"); // => The checkbox will be checked. 
```



<!-- ---------------------------------------------------------------------------------------------------------- -->



## reset()

### Description

This methods resets all form's inputs.

**INPUT**

N/A

**OUTPUT**

> The method returns an objet that indicates whether the inputs have been reset or not.
> * Key: name of the form's input.
> * Value: if the form's input has been reset, then the value is true. Otherwise, it returns the value false.

### Example

HTML

```HTML
<form id="myForm">
	<input type="text" name="input_text"/>
	<input type="checkbox" name="input_checkbox" value="yes of course"/>&nbsp;Yes of course
</form>
```

JS

```JavaScript
var myForm = new XForm('myForm');
myForm.setInputs(["input_text", "input_checkbox"]);
myForm.setDefaultValue("input_text", "bla bla");
myForm.setDefaultValue("input_checkbox", true);

// ...

myForm.reset(); // => The text "bla bla" will be injected into the text field.
                // => The checkbox will be checked. 
```




