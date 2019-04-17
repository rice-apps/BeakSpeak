# BeakSpeak Technical Document

### Team Lead - Noushin Quazi
### Developers - <ADD YOUR NAME>


# Goal

BeakSpeak aims to be an anonymous social platform for the Rice community. It has
three ends:
+ 1. channel unspoken thoughts
+ 2. no burden of identity
+ 3. build a unique culture 

# Software

Stack
+ 1. React Native + Expo
+ 2. ExpressJS
+ 3. MongoDB

## React Native
## Expo
## ExpressJS
## MongoDB

# Project Structure

## Components

### Reports

If a user comes across a post or comment on BeakSpeak that does 
not adhere to the community guidelines, the user can press the flag 
icon, which shows a form that allows the user to file a report. The 
form contains two fields: a mandatory “type of violation” field and 
an optional field to give more description. Once the user is done 
and clicks “Report this post!”, the form gets sent to the backend, 
along with relevant information such as the corresponding post/comment id. 
There is boolean logic implemented so that the report icon only shows for 
comments on the post detail screen and not on the main screen. There are 
different reports for posts and comments, which is reflected in the database.

In the back-end, the files relating to reports are post-report.js, comment-report.js, 
and report-controller.js. report.js defines the general structure of what type of 
information will be stored. report-controller.js contains methods that create a 
post/comment report and allow admins to get all reports and review a report.

In the front-end, Components/Report.js defines the fundamental structure
of reports. The creation of the report through a report form is based on the 
creation of a new post on the main screen. There are two different types of
reports: post reports and comment reports, as defined by two different classes.
Each class contains a submitReport and render function.

*Methods: Back-End*
```
router.post('/posts', function (req, res) {...})
```

Creates a post report by searching for the relevant post based on the post
ID and creating a new PostReport as defined by post-report.js.
    
```
router.post('/comments', function (req, res) {...})
```

Creates a comment report by searching for the relevant comment based on the
comment ID and creating a new CommentReport as defined by comment-report.js.

```
router.get('/', function (req, res) {...})
```

Theoretically allows users granted admin access to get all reports.
Will likely need to be updated for PostReport and CommentReport
(currently just Report).

```
router.put('/', function (req, res) {...})
```

Theoretically allows users granted admin access to review reports.
Will likely need to be updated for PostReport and CommentReport
(currently just Report).

*Methods: Front-End*
```
ReportOptions = {fields: {TellUsMore: {...}, TypeOfViolation: {...}}}
```
The report options customizes and creates different fields in the report form. 
There are currently two fields: Type of Violation (which is required for the
user to fill out in order to submit the form) and Tell Us More. 

```
submitReport = async() => {...};
```
Validates the submission then sends it to the database. Within the
body, there is also a check to ensure that the submission is 
valid and that certain fields of the report form are filled 
out (in this case, Type of Violation). Once the input values
are received in the back-end, the form is cleared and the parent
modal is closed (i.e. the modal showing the report form is closed).
The same process is found in both NewPostReport and NewCommentReport.


### Template <PUT NAME OF COMPONENT HERE>

High level description

*Methods*

```
method name (arguments)
```

method description (Use <br><br/> to wrap newlines)

Returns:
    description

### Example Object    

This parser takes the first names from  CSV and queries the names for count information using census data. It allows results to be saved as JSON.

*Methods*

```
fetch_firstnames_data(firstnames_list, start, end)
```

Iterates over `firstnames_list` and queries each name against prefetched census data. 
<br/>`start` and `end` describe the start and end years (inclusive) of census data to query from.<br/>

Returns:
    <br/>A list of dictionaries. Each dictionary is in the form of `{'NAME': STRING, 'COUNT': VALUE}`.<br/>

