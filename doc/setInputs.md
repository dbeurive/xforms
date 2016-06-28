# setInputs(inArrayInputsNames)

## Description

This method initializes the list of inputs' names for the form.

### Input

> **inArrayInputsNames**
> 
> Array that contains the names of the form's inputs.

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
```

Please note that the "inputs' container" does not have to be a form's element (<code>&lt;form&gt;</code>).
It can be a <code>&lt;div&gt;</code> element as well.