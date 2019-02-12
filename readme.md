# Simple Countdown JS Library (With Google Web Designer Component)

Hi friends, You can add Coundown in any webpage, banner, hybrid-application, with this library in few simple steps.


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

- You can add Coundown in Websites, Web Application, Banner etc.
- You can format countdown time using D-H-M-S format.
- You are able to count only days with this lib.
- Also i have attached GWD Component for add countdown in html banners.

## Getting Started

These instructions will help you to use the library in your 'Project'. Also help you to add countdown in GWD(Google Web Designer) tool.

## How to use

### Add Library
```
<script src="coundown.js"></script>//add Script

<countdown-timer data-time="" data-format="" data-string="" data-expire="" ></countdown-timer>
//copy tag and paste in body tag
```

### Initialize Library
> For initialize library add target date or data-format with D-H-M-S.
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="js/coundown.js"></script>
    <title>Title</title>
</head>
<body>
   <countdown-timer data-time="Feb 24, 2019 23:59:59" data-format="D-H-M-S" data-string="D-H-M-S" data-expire="LIVE" ></countdown-timer>
</body>
</html>
```


### Options

| Attribute  | Format | Example | Description |
| ----  | :---:  | :---:  |  ---  |
| data-time | MM DD, YYYY HH:MM:SS   | Feb 24, 2020 23:59:59  | Add target date here  |
| data-format | D-H-M-S  | D-H-M-S  |  D-DAY, H-HOURS, M-MINUTES, S-SECONDS   |
| data-string | D-H-M-S  | DAYS-HOURS-MINUTES-SECONDS  |  Add string to a particular fields for d,h,m,s   |
| data-expire | String  | Expire,Live,Out Date | The attribute add text after target date completed |

### Apply format

> For apply format in countdown:-

```
   <countdown-timer data-time="Feb 24, 2019 23:59:59" data-format="D-M-S" data-string="D-H-M-S" data-expire="LIVE" ></countdown-timer>
   // This will show only left day, minutes or seconds and not showing hour.
```



## Authors

* **Gaurav Rathore**  - [Gaurav Rathore](https://github.com/gaurav9643/)



