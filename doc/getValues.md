# getValues()

## Description

This method returns an object that contains all the inputs' values.

### Input

N/A

### Output

> The method returns an object.
>
> * Object's properties are inputs' names.
> * Object's properties' values are inputs' values.

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
myForm.getValues(); // => { input_text: "bla bla", input_password: "secret" }
```
