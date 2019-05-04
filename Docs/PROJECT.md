# BeakSpeak Technical Document

### Team Lead - Noushin Quazi
### Developers - Thera Fu, Franklin Zhang, Yifan Yang, Gai Sawant, Parker Graham, Alice Wong


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

## General

### Data flow
The data flow refers to how the app handles and renders data sent from the
server. It uses a *Service* to read data from the server. Once it has read data,
for examples a list of posts, then the app houses the data in a global *Store*
where all the parts of the app can access it. The app maintains updated data by
periodically polling the server, for now every minute. This can be CPU intensive
so future iterations may explore smarter ways to keep data up-to-date. Some
alternatives are implementing web sockets. 

The app also writes data to the server through a *Service*. One design challenge
is how to quickly display data after it has been written to the server. We found
that waiting for a server response introduces latency in a lot of
places, such as commenting, reacting, and voting. On the other hand, immediately displaying data, like a newly submitted post,
is risky if the server actually fails to write the post to the database; this is
because if the app shows a post that is not actually in the database, then the
user will be confused and even frustrated at the prospect of redoing their work.

To this end, we decided the best way is to indeed immediately display new data
but indicate to the user if the post has not been processed yet by the server.
This will also give the user a chance to resubmit the post. This is the best
solution because it offers transparency and control to the user in a reasonable
fashion while offloading liability from the app.

### Auth flow
We must authenticate users through Rice IDP for two reasons: 
1. to ensure only the Rice community has access
2. to ensure legal liability for extreme cases where law enforcement needs to be
   involved

Every time the user opens the app, they are prompted to login through the Rice
IDP (same portal used for canvas). After that, the app receives a ticket
from IDP that has the user information encrypted in it, like netids, and sends
to the backend server. 

When the backend server receives the ticket, it validates
the ticket against CAS, the authentication server used by Rice, and decrypts the
netid contained. To ensure security and anonymity to the highest degree
possible, the netid is salted and hashed. If the resulting id is in the
database, then the user already exists and the ticket is returned to the app.
Otherwise, the server creates a new user before returning the ticket.

Once the app receives the ticket, it stores it in a *Store*, specifically the
*UserStore*, and subsequent requests to the server carry the ticket as a header.

The server also checks if the user has been banned; if they are banned, then it
returns a 401 error. Users can also be promoted to admins by toggling the admin
flag in the database.

#### Security protocols
Periodically, the salt and secret will need to be changed for security purposes.
When that happens, current users may experience difficulties because the new
salt will create a different hashed username from what is in the database. To
streamline the transition, it is recommended to force users to re-login. After
they have logged in, check if the user exists; if yes, check if their current
hashed username is the old one according to the old salt. If also yes, then
update the username to consist of the new salt.

The values for the salts and secrets, including the new and old, must never be made public.
THIS INCLUDES COMMITTING TO GITHUB. The secrecy entails only sharing the salt
and secret with developers on the team and the president. 

## Components

Components are the building blocks of the app. If the app can be conceptualized
as a set of screens, then components are the elements on the screens. The most
significant components for this project deal with posts and comments. Components
may also be dedicated to more functional roles, such as a report button or a
navigation header.

### PostDetail

The PostDetail component is the major component of the post detail page, it takes
a post id as a parameter when users click on one of the posts from main post page,
fetchs the post from the global post store and renders it along with a few utilities for user input, such as
comment, vote, report, etc. A notable difference from the main page is that it
shows the full list of comments, whereas the main page shows only the top 3.

*Methods*

```
_onRefresh()
```
Called when users drag down to refresh the page, this method indicates the refresh status
and re-fetches the post and comment data from store. 

Returns:
    void
    
```
_renderItem()
```

A helper function for the FlatList posts display, renders an individual post item
in appropriate format.

Returns:
    void
    
```
_handleScroll()
```

A helper function for the FlatList scrolling action, used to help determine conditions
for dismissing keyboard. 

Returns:
    void

#### PostDetailFooter   

This object includes a string as input field, and submits an input string as 
user comment when user presses submit.

*Methods*

```
onSubmit()
```

Submits the string in input field as user comment.

Returns:
    void
    
#### Comments   

This object renders and displays a list of comments belonging to the post.

### PostData

PostData is a component for displaying individual posts, as a so-called "smart" component. 
It works together with the Post component to provide the complete functionality of
a post. This component is mainly responsible for handling user votes and reacts, while
the Post component merely formats and displays data passed from this component.  

*Methods*

```
updateReact()
```

Increment react count up by 1

Returns:
    void
    

```
upvoteScore()
```

Increment vote count up by 1

Returns:
    void
    

```
downvoteScore()
```

Decrement vote count down by 1

Returns:
    void

### Post

A pure component for displaying individual posts as well as all related components and functions.

#### PostFooter   

A sub-component for Post responsible for displaying current reacts of the post, 
while the actual user react function is handled by PostData component.

#### PostHeader   

A sub-component for Post responsible for displaying title of the post.

#### PostVotes   

A sub-component for Post responsible for displaying current votes of the post and voting buttons, 
the actual voting function is handled by PostData component.

#### PostBody   

A sub-component for Post responsible for displaying body of the post.

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

This parser takes the first names from CSV and queries the names for count information using census data. It allows results to be saved as JSON.

*Methods*

```
fetch_firstnames_data(firstnames_list, start, end)
```

Iterates over `firstnames_list` and queries each name against prefetched census data. 
<br/>`start` and `end` describe the start and end years (inclusive) of census data to query from.<br/>

Returns:
    <br/>A list of dictionaries. Each dictionary is in the form of `{'NAME': STRING, 'COUNT': VALUE}`.<br/>

## Services

### DatabaseService

Includes all functions that handle the interaction between front-end and the database. 

*Methods*

```
getPost(id)
```
Finds a specific post according to its `id`.

Returns:
<br> The post as a JSON object, including its `id`, `title`, `body`, `comments`, `userVote`, `userReact`, and `reactCounts`.
<br> Prints an error if the request fails. 

```
getPosts()
```
Returns all posts in the database, in the same format as above. 
<br> Prints an error if the request fails. 

```
sendNewPost(title, body, id)
```
Sends a new post with its `title`, `body`, `id` to the database when a user creates a new Post.

Returns:
<br> A list of posts if the request succeeds.
<br> Prints an error if the request fails. 

```
sendReport(type, reason, id)
```
Sends report data to the database for further censorship(?) when a user reports an unfriendly post. <br>
`id` is the id of the post being reported, and `type` and `reason` describes why they think the 
post needs to be reported.

Returns:
<br> `true` if report is successfully sent, `false` if it fails.
<br> Prints an error if the request fails. 

```
sendNewComment(postid, body, comment_id)
```
Posts a comment under a post. <br> 
`postid` specifies which post the comment goes under. <br> 

Returns:
<br> The posted comment.
<br> Prints an error if the request fails. 

```
updateReact(postid, reaction)
```
Updates the reacts on a post. <br>
`postid` specifies which post the react is on. <br>
`reaction` is the new react to the post. It should be one of 'angry', 'funny', 'love', 'sad', and 'wow'.

Returns the result if successfully received. Prints an error if the request fails.
 
```
updateVotes(id, vote)
```
Updates the vote for a user on a post, when the user votes for the first time, or changes an earlier vote to another.<br>
`id` specifies which post the vote is on. <br>
`vote` is the new vote. 1 represents an upvote, and -1 represents a downvote. 

Returns the result if successfully received. Prints an error if the request fails. 

```
updateVotesOnComment(commentid, postid, vote)
```
Updates the vote for a user on a comment. <br>
`commentid` specifies which comment the vote is on. <br>
`postid` specifies which post the vote is on. <br>
`vote` is the new vote. 1 represents an upvote, and -1 represents a downvote. 

Returns the result if successfully received. Prints an error if the request fails. 

