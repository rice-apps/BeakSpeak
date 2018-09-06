## BeakSpeak - Solution Space and Technical Details

The purpose of this document is to outline the solution space and technical stack

## Technologies
+ MongoDB
    + the object-oriented database we are using
+ ExpressJS
    + the backend server
+ ReactNative
    + the mobile frontend framework
+ NodeJS
    + the JavaScript runtime environment

## Minimum Viable Product (MVP)
+ Secure Login and Logout
    + validate the user as a Rice student
    + protect the user's identity
+ Dashboard with Posts
    + scrolling list of all posts
+ New Post Creation
    + button that leads user to a new post creation form
+ Detailed Post View
    + each post from dashboard has its own viewing page
+ Comments and Votes
    + in each detailed post view, users should be able to add comments and vote
+ Moderation System
    + users should be able to report abusive posts

### *Frontend Philosophy*

The frontend should be a simple and elegant production. We should strive for all functionality to be intuitive. Every part of the app should follow a consistent design scheme. Furthermore, since the app will be handling a massive number of posts, the app should optimize how it handles and renders such quantities of data.

### *Backend Philosophy*

The backend should be adamant about who exaclty wants to use its resources. Thus, it uses sophisticated ID verification technology like JWT. Furthermore, the backend should be designed that each entity making a request should be thoroughly sniffed. Finally, the backend should be stateless - each identical request should have an identical response. The only data storage should happen in the database, not backend.