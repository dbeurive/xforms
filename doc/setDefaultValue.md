# setDefaultValue(inName, inValue)

## Description

This method sets the default value of a specified form's input.

> Please note that this method is usable on all types of inputs (including checkboxes).

### Input

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

### Output

<code>this</code> (the jQuery element that represents the form)

## Example

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
