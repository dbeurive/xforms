# reset()

## Description

This methods resets all form's inputs.

### Input

N/A

### Output

> The method returns an objet that indicates whether the inputs have been reset or not.
> * Key: name of the form's input.
> * Value: if the form's input has been reset, then the value is true. Otherwise, it returns the value false.

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

// ...

myForm.reset(); // => The text "bla bla" will be injected into the text field.
                // => The checkbox will be checked. 
```
