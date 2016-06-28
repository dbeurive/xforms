# getValue(inName)

## Description

This method returns the value of a specified form's input.

### Input

> **inName**
>
> Name of the form's input.

### Output

> The method returns the input's value.

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
var value = myForm.getValue("input_text");
```
