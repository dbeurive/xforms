# setValues(inValues, [InOptWhere="current"])

## Description

This method sets the form's values.

### Input

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

var values = {
	input_text: "bla bla bla",
	input_password: "secret"
};

myForm.setValues(values); // => Set the __CURRENT__ values.
myForm.setValues(values, "default"); // => Set the __DEFAULT__ values.
```
