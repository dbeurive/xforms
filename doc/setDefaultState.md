# setDefaultState(inName, inState)

## Description

This method sets the default state of a specified checkbox.

> Please note that you can also use the method <code>setDefaultState</code> to set the state of a checkbox.

### Input

> **inName**
> 
> Name of the form's input.
> 
> **inState**
>
> Input's state (<code>true</code>: checked or <code>false</code>: unchecked).

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