# TrackStack

[Heroku link][heroku]

[heroku]: http://.herokuapp.com

## Minimum Viable Product
TrackStack is a clone of SoundCloud built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Follow other users
- [ ] Upload Tracks
- [ ] Play Tracks
- [ ] Create Playlists
- [ ] Like Tracks/Playlists
- [ ] View a feed of Tracks/Playlists/Reposts from Followees
- [ ] Comment on Tracks

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, User Follows (~1 day)
I will implement user authentication in Rails based on the practices
learned at App Academy. I will also create a Backbone User Model as well as
the associated Followers and Followees collections. By the end of this phase,
users will be able to follow other users and view their profiles. The most
important part of this phase will be pushing the app to Heroku and ensuring
that everything works before moving onto phase 2.

[Details][phase-one]

### Phase 2: Upload Tracks, Create Playlists (~2 days)
I plan to use a third party API for track uploads.  I will add API routes to serve track URLs as JSON, then add Backbone models and collections that fetch data from those routes.  For Playlists, I will migrate a "playlists" and "playlistings" join table. By the end of this
phase, users will be able upload tracks and create playlists.

[Details][phase-two]

### Phase 3: Liking Tracks and Playlists, Track Comments (~2 days)
I will create a database migration for a "likings" polymorphic join table
and a "comments" table. Users should be able to like both tracks and playlists.
 I will then add a "track/:id" route to show a track and its comments.  
 By the end of this phase, users will be able to view other user submitted
 tracks/playlists, like them, and comment on individual tracks.

[Details][phase-three]

### Phase 4: User Feeds (~1-2 days)
I'll start by adding a `feed` route that uses the `current_user`'s
`followees` association to serve a list of tracks ordered
chronologically. On the Backbone side, I'll make a `UserFeedShow` view whose `tracks`
collection fetches from the new route.

[Details][phase-four]

### Phase 5: Main Feed, Sidebar Composite Views (~2 days)
I will add the main page that the user will see after logging in.  This feed
will consist of all new tracks/playlists created by the user's followees.
I will also use the associations mentioned previously to create composite views
 to be used in the side bar.

### Phase 5: Audio Playback, CSS (~2 days)
Finally, I will use native HTML5 audio for track playback and add CSS to best replicate
 the SoundCloud look and feel.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Play counter for tracks
- [ ] Search by title/tags/genre
- [ ] Infinite scroll
- [ ] Reposting
- [ ] Notifications (likes, followings, reposts)
- [ ] Reblogging
- [ ] Private Messages
- [ ] Facebook Authentication

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
