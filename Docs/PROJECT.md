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

