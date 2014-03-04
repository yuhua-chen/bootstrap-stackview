#Bootstrap-stackview
This is a plugin to display views like stack behavior, and support using bootstrap's data api.It's simple and easy to use.

##Usage

Your main view goes here:
``` html
<div class="stackview example1" data-toggle=".breadcrumb">
  <div class="view" data-title="Stack 1">
      ...
  </div>
  ...
</div> 
```

and the control button:
```html
<div class="btn-group">
  <button type="button" class="btn btn-default" data-target=".example1" data-action="pop">Pop</button>
  <button type="button" class="btn btn-default" data-target=".example1" data-action="push">Push</button>
</div>
```

the last breadcumb:
```html
<ol class="breadcrumb"></ol>
```

simple to init:
```javascript
$('.stackview').stackview()

//bind event
$.('stackview').on('action.cyh.stackview', function (e) { }
```

##Paraments
| name        | type           | description |
| ----------- |:--------------:| :-----------|
| interval    | number | The duration of animation to display view. |

##Events
| Event Type  | description |
| ----------- |:--------------:| :-----------|
| action.cyh.stackview  | This event fires immediately when the action instance method is invoked. |

