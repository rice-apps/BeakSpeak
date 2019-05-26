# BeakSpeak V2

After getting feedback from this Spring, we have put together a feature set that
has been curated by the users. In general, the problem that BeakSpeak currently
has is limited functionality. For example, users can submit text posts but not other
media such as images. In response to this problem, the user-requested feature
set is: 

+ Images
+ Nested communication
+ Personalization
+ Queries

## Images

A picture can communicate a thousand words. Additionally, there are certain
aspects of Rice culture that cannot be sufficiently communicated through text
alone, such as memes. Thus, implementing an image upload mechanism is important.
Some challenges are moderation and performance.

### Moderation

When it comes to moderation, the difference between text and images is the
extent of damage; a particularly graphic picture will deal more damage to the
user than a graphic text description. That means pictures require more immediate
moderation than is currently provided by our current system of moderation.

Our current system of moderation involves two admins cycling through the reports
twice a week. This is not immediate enough for pictures. We would require the
process to be somewhat automated, which would come in the way of sophisticated
image classification.

### Performance

Once posts can include images, that leads to the problem of loading images in an
efficient manner. Every time the app refreshes, it will be refetching image
data, and if this image data is exponential in number than that leads to long
loading times and heavy demand on the server. Thus, we would have to design a
clever way to store image data such as caching.

## Nested communication

Currently, users can create posts and comment on posts-- but what if users want
to reference a comment inside a conversation? Nested conversations are a pretty
common structure when it comes to online conversation. This app would benefit
from implementing such a structure because it would increase longevity of
conversations and in turn generate more content for the user. Allowing replies
would be a good start. Giving each post and comment a tag that can be referenced
is also another way to achieve the goal of nested communication.

## Personalization

Users want to feel more connected to their content. This creates a sense of
attachment to the app, which is great for user retention. It is easy to get
users to install the app but what keeps users coming back to the app is new
content and a sense of accomplishment on the platform. One thing users have
requested is a way to save posts that they like and see their own posts. This
can be accomplished by adding a couple screens for each goal, but that can
clutter the app. The following query feature can also answer this question

## Queries

Probably the most complex requested feature, queries will give the user even
more control over the content they want. Queries can search through posts,
comments, and if configured correctly can pull up a list of the user's own
content or of the content they have saved.

## Recommended Roadmap

+ Images 
    1. Edit database post schema to include images
    2. Edit backend to accept images when creating a post
    3. Implement image upload on frontend
    4. Implement an efficient strategy such as caching
    5. Repeat for comments
+ Nested communication
    1. Edit database comment schema to allow a list of replies
    2. Add an endpoint to the backend that adds replies to a comment
    3. Implement reply mechanism on the frontend
    4. Decide what level of nesting is appropriate
+ Personalization
    1. Start with a page that shows the users own posts and comments
    2. Display random icons each time the user posts or comments
    3. Evolve feature in a variety of ways, such as adding a filter to show only
       the user's posts or posts they have liked
    4. This feature can be done many ways
+ Queries
    1. Create a search bar that matches on titles of posts
    2. Evolve feature to search for keywords
    3. If you give posts and comments a tag, allow querying on the tag

## Tips

+ Nested communication would require changes to the backend and frontend
    + Thus should be tackled with one or two devs who are comfortable with the
      MongoDB, Mongoose, and setting up endpoints in ExpressJS
+ Personalization has multiple levels of complexity
    + one level of personalization is simply returning the posts created by the
      user OR displaying a randomly generated user icon
    + Number of devs may change, but there are certainly frontend-only tasks
      that this goal will provide
+ Queries will be sophisticated frontend work
    + Will require knowledge of Mobx and how the frontend services work
+ First task to onboard devs
    + Can always do an example app that incorporates React Native, Mobx,
        ExpressJS, and MongoDB
        + Will take up a long time
    + Start with a relatively easy frontend task that still furthers the project
        + Generate and display a random icon for each user
        + Create a screen that only shows the user's posts and comments
    + Migrate to the backend
        + Explanation of this complex system will not stick
        + Example app - grades database
            + Devs create their own student and grade schemas and collections
            + Devs create a simple express app that connects to the database
            + Devs set up endpoints that do various operation on the database,
              such as fetching all grades, updating grades, reporting
              statistics.
              
## Meta-development

### Documentation

Devs should document components, screens, and services that
they create inside PROJECT.md. Additionlly, devs should comment new functions
that they implement. Make this a requirement in pull requests. This project is decently big to
where that is a must.

### Database

One task at the beginning of the year is to migrate the currently running app to
a production database. Development can still happen on the sandbox databases
provided by mlab, but the production code should connect to a resilient
database that has recovery options. 
