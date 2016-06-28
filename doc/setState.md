# setState(inName, inState)

## Description

This method sets the state of a checkbox.

> Please note that you can also use the method <code>setValue</code> to set the state of a checkbox.

### Input

> **inName**
>
> Name of the checkbox.
>
> **inState**
>
> Checkbox's state. Value can be <code>true</code> (checked) or <code>false</code> (unchecked).

### Output

<code>this</code> (the jQuery element that represents the form)

## Example

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
