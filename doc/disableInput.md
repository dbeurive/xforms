# disableInput(inName)

## Description

This method disables an input specified by its name.

### Input

> **inName**
>
> Name of the input to disable.

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
myForm.disableInput("input_text");
```