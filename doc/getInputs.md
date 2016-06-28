# getInputs([inOptType="both"])

## Description

This methods returns the form's inputs.

### Input

> **inOptType**
>
> Specify the type of returned values. The value may be:
>
> * "<code>jquery</code>".
> * "<code>string</code>".
> * "<code>both</code>".
>
> The default value is "<code>both</code>".

### Output

> Depending on the value of the parameter <code>inOptType</code>, the method returns an array or an object.
>
> * If the given value is "<code>jquery</code>", then methods returns an attay. The returned array contains jQuery elements.
> * If the given value is "<code>string</code>", then methods returns an attay. The returned array contains the names of the elements.
> * If the given value is "<code>both</code>", then the method returns an object that associates the inputs' names with their jQuery elements.
>    * keys: the inputs' names.
>    * values: the jQuery elements.

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
var inputsBoth     = myForm.getInputs();         // => { input_text: <jQuery object>, input_password: <jQuery object>}
var inputsElements = myForm.getInputs("jquery"); // => [<jQuery object>, <jQuery object>]
var inputsNames    = myForm.getInputs("string"); // => ["input_text", "input_password"]
```