# Simple Countdown JS Library (With Google Web Designer Component)

Hi friends, You can add any forms(login,registration,contact us) to your website using the js library in few simple steps. Also you can connect your forms with server using the XMLHttpRequest. Also i'll guide you to connect your form with google excel sheet to store your form data.


## Table of contents
<!--ts-->
   * [Features](#features)
   * [Getting Started](#getting-started)
   * [Add Library](#add-library)
   * [Initialize Library](#initailize-library)
   * [Options](#options)
   * [Add Custom Form Fields](#add-custom-form-fields)
   * [Fields:Array[Object] Properties or Value](#fieldsarrayobject-properties-or-value)
   * [Integrate with Google Sheet](#integrate-with-google-sheet)
   * [Demo](http://mydevspace.ga/FormBuilderLibrary/Example/)
<!--te-->

## Features

- You can add forms like:- Registration, Login, Contact Us etc.
- Connect your form with Rest Api using XMLHttpRequest.
- Also you can connect your form with @Google Sheet

## Getting Started

These instructions will help you to use the library in your 'Web Projects'. Also help you to connect your forms with backed or googel sheet.

## How to use

### Add Library
```
<script src="lib.js"></script>
```

### Initialize Library

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="js/lib.js"></script>
    <title>Title</title>
</head>
<body>
    <div id="formBuilder"></div>
    <script>
      new FormBuilder({
          selector:'formBuilder'
      });
    </script>
</body>
</html>
```


### Options

| Name  | Type | Default | Description |
| ----  | :---:  | :---:  |  ---  |
| selector | String  | -   | Set id of your div element  |
| formClass | String  | form-builder  | You can add custom class in form tag  |
| wrapperClass | String  | wrapper-form-builder  | You can add custom class in wrapper of form |
| apiUrl | String  | http://dummy.restapiexample.com/api/v1/create  | Set your api url for make xmlhttprequest  |
| customFields | Boolean  | false  | Enable or Disable Custom Fields "Set true to use custom form fields in your form otherwise form will generate default form fields" |
| btnText | String  | Save  | Change submit button text  |
| fields | Array(Object)  | First Name, Last Name, Email  | Here you can pass your array object to make your custom fields |
| method | String  | GET  | Method should be GET or POST  |
| customCSS | Boolean  | true  | Enable or Disable Custom CSS   |
| success | Function  | -  | This is success callback with response data  |
| error | Function  | -  | This is error callback with error StatusText  |
| notification | Boolean  | true  | Enable or Disable Notification(Alert)  |
| preloader | Boolean  | true  |  Enable or Disable Preloader  |

### Add Custom Form Fields

> For add custom fields you need to pass array object to 'fields' or set customFields to false for example:-

```
    new FormBuilder({
        selector:'formBuilder',
        customFields:true,
        fields: [
          {type:'text',placeholder:'Name',required:true,fieldName:'name',label:'Name'},
          {type:'text',placeholder:'Salary',required:true,fieldName:'salary',label:'Salary'},
          {type:'text',placeholder:'age',required:true,fieldName:'age',label:'Age'}
          ],
    });
```

## Fields:Array[Object] Properties or Value
| Propertie  | Type | Description | 
| ----  | ---  | ---  |  
| type | String  | Input type attribute(text,email,radio,checkbox)  | 
| placeholder | String  | Placeholder for input  | 
| required | boolean  | Make field mandatory |
| fieldName | String  | add name attribute  |
| label | String  | Label for form fields  | 


## Integrate with Google Sheet
> For integrate your form with google sheet follow below steps:-

1. [Go google sheet](https://docs.google.com/spreadsheets/u/0/)
    -![go to google sheet](http://mydevspace.ga/FormBuilderLibrary/Steps/1.PNG)
2. Sign-in with your google account. 
3. Blank - Start a new spreadsheet
    -![Add blank sheet](http://mydevspace.ga/FormBuilderLibrary/Steps/2.PNG)
4. Update sheet name or add fields name which you want to add in your form.
    -![Add fields or update sheet name](http://mydevspace.ga/FormBuilderLibrary/Steps/3.PNG)
5. Now go to Tool->Script editor and update project name in left top corner.
     -![go to script editor](http://mydevspace.ga/FormBuilderLibrary/Steps/4.png)
6.  Remove all code from Code.gs and paste below code in code.gs
    ```
        // original from: http://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/
        // original gist: https://gist.github.com/willpatera/ee41ae374d3c9839c2d6 

        function doGet(e){
        return handleResponse(e);
        }

        //  Enter sheet name where data is to be written below
                var SHEET_NAME = "Sheet1";

        var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service

        function handleResponse(e) {
        // shortly after my original solution Google announced the LockService[1]
        // this prevents concurrent access overwritting data
        // [1] http://googleappsdeveloper.blogspot.co.uk/2011/10/concurrency-and-google-apps-script.html
        // we want a public lock, one that locks for all invocations
        var lock = LockService.getPublicLock();
        lock.waitLock(30000);  // wait 30 seconds before conceding defeat.
        
        try {
            // next set where we write the data - you could write to multiple/alternate destinations
            var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
            var sheet = doc.getSheetByName(SHEET_NAME);
            
            // we'll assume header is in row 1 but you can override with header_row in GET/POST data
            var headRow = e.parameter.header_row || 1;
            var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
            var nextRow = sheet.getLastRow()+1; // get next row
            var row = []; 
            // loop through the header columns
            for (i in headers){
            if (headers[i] == "Timestamp"){ // special case if you include a 'Timestamp' column
                row.push(new Date());
            } else { // else use header name to get data
                row.push(e.parameter[headers[i]]);
            }
            }
            // more efficient to set values as [][] array than individually
            sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
            // return json success results
            return ContentService
                .createTextOutput(JSON.stringify({"result":"success", "row": nextRow}))
                .setMimeType(ContentService.MimeType.JSON);
        } catch(e){
            // if error return this
            return ContentService
                .createTextOutput(JSON.stringify({"result":"error", "error": e}))
                .setMimeType(ContentService.MimeType.JSON);
        } finally { //release lock
            lock.releaseLock();
        }
        }

        function setup() {
            var doc = SpreadsheetApp.getActiveSpreadsheet();
            SCRIPT_PROP.setProperty("key", doc.getId());
        }
    ```
    -![Paste code in code.gs](http://mydevspace.ga/FormBuilderLibrary/Steps/5.png)
7.  Now publish your code using Publish tab go :- Publish->Deploy as web app or click on deploy with mendetory details.
    -![Deploy app](http://mydevspace.ga/FormBuilderLibrary/Steps/6.PNG)
8.  After successfully deploy you will get api url like this:--
     -![Get URL](http://mydevspace.ga/FormBuilderLibrary/Steps/7.PNG)
9.
> Now you need to just implement js library and pass your google sheet api url in 'apiUrl' property.
```
    new FormBuilder({
        selector:'formBuilder',
        customFields:false,
        method:'GET',
        fields: [
        {type:'text',placeholder:'Name',required:true,fieldName:'Name',label:'Name'},
        {type:'text',placeholder:'Email',required:true,fieldName:'Email',label:'Email'},
        {type:'text',placeholder:'Phone',required:true,fieldName:'Phone',label:'Phone'}
        ],
        btnText:'Save Form',
        customCSS:false,
        apiUrl:'https://script.google.com/macros/s/AKfycbz2Mw1I6YpTNKy1j8V8wvcxh0b7KuSPsd6ynbwXTCHxRIq5CDmDM/exec',
        success:function(response,ele){
            console.log('Success Callback:',response);
        },
        error:function(error,ele){
            console.log('Error Callback:',error);
        },
    });
```


## Authors

* **Gaurav Rathore**  - [Gaurav Rathore](https://github.com/gaurav9643/)



