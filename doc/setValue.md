# setValue(inName, inValue)

## Description

This method sets an input's value.

### Input

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

### Output

<code>this</code> (the jQuery element that represents the form)

## Example

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