# DevConnect APIs

### authRouter
- POST /signup
- POST /login
- POST /logout

### profileRouter
- GET /profile/view
- PATCH /profile/edit (Edit except for password)
- PATCH /profile/password


### connectionRequestRouter
- POST /request/send/interested/:userId (showing interest/sending request)
- POST /request/send/ignored/:userId (not showing interest)
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

### userRouter
- GET /user/connections
- GET /user/requests (received)
- GET /user/requests (sent)
- GET /user/feed - Gets you the profile of the other users on the platform


Status: ignored, interested, accepted, rejected
