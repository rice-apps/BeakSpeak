# BeakSpeak Technical Document

### Team Lead - Noushin Quazi
### Developers - Thera Fu, 


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
### PostDetail

The PostDetail component is the major component of the post detail page, it takes
an post id as a parameter when users click on one of the posts from main post page,
fetchs the post and renders it along with a few utilities for user input, such as
comment, vote, report, etc.

*Methods*

```
_onRefresh()
```
Called when users drag down to refresh the page, this method indicates the refresh status
and re-fetches the psot and comment data from store. 

Returns:
    void
    
*Methods*

```
_renderItem()
```

A helper function for the FlatList posts display, renders an individual post item
in appropriate format.

Returns:
    void
    
*Methods*

```
_handleScroll()
```

A helper function for the FlatList scrolling action, used to help determine conditions
for dismiss keyboard. 

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

This object renders and displays an list of comments belonging to the post.

### PostData

PostData is a component for displaying individual posts, as a so called "smart" component, 
it works together with the Post component to provide the complete functionality of
a post. This component is mainly responsible for handling user votes and reacts, while
the Post component merely formats and displays data passed from thsi component.  

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

