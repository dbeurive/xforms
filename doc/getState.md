# getState(inName)

## Description

This method returns the state of a checkbox.

> Note: to get the state of a checkbox you can also use the method <code>getValue()</code>.

### Input

> **inName**
>
> Name of the checkbox.

### Output

> The method returns the state of the checkbox. The returned value may be:
>
> * <code>true</code>: the checkbox is checked.
> * <code>false</code>: the checkbox is not checked.

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
var state = myForm.getState("input_checkbox");
```

