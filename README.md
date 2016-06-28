# Introduction

Handling forms is one of the very basic tasks for all WEB site designers. There are many frameworks out there that simplify this task. However, for basic usages, a simple and straightforward approach using jQuery may be the best solution : everybody knows jQuery and jQuery’s API is very stable.

This library extends jQuery’s API’s in two ways :

* It homogenises the jQuery’s API used to interact with forms’ inputs (radio boxes, select…).
* It introduces useful concepts such as inputs’ default values.






# Installation

## Requirements

The requirements are listed into the file [<code>bower.json</code>](https://github.com/dbeurive/xforms/blob/master/bower.json).

## Installation for end users

If you only want to use the library, then the easiest way to install it is through Bower:

	bower install xform --production

## Installation for developers

If you want to get the examples, then you should get a copy of the GIT repository:

> Download the ZIP file: [https://github.com/dbeurive/xforms/archive/master.zip](https://github.com/dbeurive/xforms/archive/master.zip)
>
> Or clone the repository:
>
>	<code>git clone git@github.com:dbeurive/xforms.git</code>

Then you must install the dependencies:

	bower install

This command will install the dependencies listed into the file [<code>bower.json</code>](https://github.com/dbeurive/xforms/blob/master/bower.json).





# Complete examples

You can find an example here: https://github.com/dbeurive/xforms/blob/master/examples/example2.html

> Note : please note that the example is not installed if you follow the installation procedure that uses Bower.
> If you want to get the example, you should follow the procedure described in the section "Installation for developers".







# API

## Initialisation

Place the following HTML snipset within your HTML document:

```html
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/sprintf/dist/sprintf.min.js"></script>
<script src="bower_components/xform/dist/xinput.js"></script>
<script src="bower_components/xform/dist/xform.js"></script>
```

> Note: you may have to customise the paths to the JavaScript files listed above. That is: for example, you may have to change <code>"bower_components/jquery/dist/jquery.js"</code> by whatever path is relevant to your directory structure.

## Overview

| Method           | Overview
|------------------|------------------------------------------------------------------------------------------------------|
| setInputs        | Specify the names of the form's inputs.                                                              |
| getInputs        | Get the forms' inputs.                                                                               |
| setValues        | Set values for the form's inputs. This method sets _current_ or _default_ values.                    |
| getValues        | Get values from all the form's inputs.                                                               |
| reset            | Reset the values of all the form's inputs (assuming that you set default values)                     | 
| setValue         | Set a value for a single input (this method works for all types of inputs, including checkboxes)     |
| getValue         | Get the value of a single input (this method works for all types of inputs, including checkboxes)    |
| setState         | Set the state (checked or not) of a checkbox.                                                        |
| getState         | Get the state (checked or not) of a checkbox.                                                        |
| setDefaultValue  | Set a default value for an input (this method works for all types of inputs, including checkboxes)   |
| getDefaultValue  | Get the default value of an input (this method works for all types of inputs, including checkboxes)  |
| setDefaultState  | Set the default state for a checkbox.                                                                |
| getDefaultState  | Get the default state for a checkbox.                                                                |
| disableInput     | Disable an input.                                                                                    |
| enableInput      | Enable an input.                                                                                     |
| resetInput       | Reset the value of an input to its default value, if set (this method works for all types of inputs) |
| getElement       | Get the jQuery element associated to an input.                                                       |

Forms' inputs are identified by their _names_ (that is, the value of the attribute "name").

## Detailed API

* [setInputs(inArrayInputsNames)](https://github.com/dbeurive/xforms/blob/master/doc/setInputs.md)
* [getInputs(inOptType)](https://github.com/dbeurive/xforms/blob/master/doc/getInputs.md)
* [setValues()](https://github.com/dbeurive/xforms/blob/master/doc/setValues.md)
* [getValues()](https://github.com/dbeurive/xforms/blob/master/doc/getValues.md)
* [reset()](https://github.com/dbeurive/xforms/blob/master/doc/reset.md)
* [setValue(inName, inValue)](https://github.com/dbeurive/xforms/blob/master/doc/setValue.md)
* [getValue(inName)](https://github.com/dbeurive/xforms/blob/master/doc/getValue.md)
* [setState(inName, inState)](https://github.com/dbeurive/xforms/blob/master/doc/setState.md)
* [getState(inName)](https://github.com/dbeurive/xforms/blob/master/doc/getState.md)
* [setDefaultValue(inName, inValue)](https://github.com/dbeurive/xforms/blob/master/doc/setDefaultValue.md)
* [getDefaultValue(inName)](https://github.com/dbeurive/xforms/blob/master/doc/getDefaultValue.md)
* [setDefaultState(inName, inState)](https://github.com/dbeurive/xforms/blob/master/doc/setDefaultState.md)
* [getDefaultState(inName, inState)](https://github.com/dbeurive/xforms/blob/master/doc/getDefaultState.md)
* [disableInput(inName)](https://github.com/dbeurive/xforms/blob/master/doc/disableInput.md)
* [enableInput(inName)](https://github.com/dbeurive/xforms/blob/master/doc/enableInput.md)
* [resetInput(inName)](https://github.com/dbeurive/xforms/blob/master/doc/resetInput.md)
* [getElement(inName)](https://github.com/dbeurive/xforms/blob/master/doc/getElement.md)



