# resetInput(inName)

## Description

This method resets a specified form's input.
The _current_ value of the input (which is printed) is set to the _default's_ (if set).

### Input

> **inName**
>
> Name of the form's input.

### Output

> If the input has been reset, then the method returns the value true.
> Otherwise, it returns the value false.

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

myForm.resetInput("input_text");     // => The text "bla bla" will be injected into the text field.
myForm.resetInput("input_checkbox"); // => The checkbox will be checked. 
```
