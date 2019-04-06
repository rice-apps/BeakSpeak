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

## Services

### DatabaseService

Includes all functions that handle the interactions between front end and the database. 

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
postComment(postid, comment)
```
Posts a comment under a post. <br> 
`postid` specifies which post the comment goes under. <br> 
`comment` is a comment object. It should include the `id` and `body` of the comment to create.

Returns:
<br> The posted comment.
<br> Prints an error if the request fails. 

```
updateReact(postid, reaction)
```
Updates the reacts on a post. <br>
`postid` specifies which post the react is on. <br>
`reaction` is the new react to the post. It should be one of 'angry', 'funny', 'love', 'sad', and 'wow'.

Prints an error if the request fails.
 
```
updateVotes(id, vote)
```
Updates the vote for a user on a post, when the user votes for the first time, or changes an earlier vote to another.<br>
`id` specifies which post the vote is on. <br>
`vote` is the new vote. 1 represents an upvote, and -1 represents a downvote. 

Prints an error if the request fails. 

```
updateVotesOnComment(commentid, postid, vote)
```
Updates the vote for a user on a comment. <br>
`commentid` specifies which comment the vote is on. <br>
`postid` specifies which post the vote is on. <br>
`vote` is the new vote. 1 represents an upvote, and -1 represents a downvote. 

Prints an error if the request fails. 

