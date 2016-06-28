# getDefaultState(inName)

## Description

This method returns the default state of a checkbox.

### Input

> **inName**
> 
> Name of the checkbox.

### Output

> The method returns the default state of the checkbox (true: checked, false: unchecked).

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
var state = getDefaultState(input_checkbox);
```

