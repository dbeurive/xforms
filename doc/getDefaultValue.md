# getDefaultValue(inName)

## Description

This method returns the default value of a specified form's input.

### Input

> **inName**
>
> Name of the form's input.

### Output

The method returns the default value.

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
var dv1 = myForm.getDefaultValue("input_text"); // => "bla bla"
var dv2 = myForm.getDefaultValue("input_checkbox"); // => true 
```
