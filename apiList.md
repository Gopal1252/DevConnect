# DevConnect APIs

### authRouter
- POST /signup
- POST /login
- POST /logout

### profileRouter 
- GET /profile/view
- PATCH /profile/edit (Edit except for password)
- PATCH /profile/password (update Password api)


### connectionRequestRouter
- POST /request/send/interested/:userId (showing interest/sending request)
- POST /request/send/ignored/:userId (ignoring the profile)
- POST /request/send/:status/:userId (making the above two statuses dynamic)

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId
- POST /request/review/:status/:requestId (m)

### userRouter
- GET /user/connections
- GET /user/requests (received)
- GET /user/requests (sent)
- GET /user/feed - Gets you the profile of the other users on the platform


Status: ignored, interested, accepted, rejected
