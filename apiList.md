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
- POST /request/send/:status/:userId (status can either be interested/ignored) {to show interest(send)/ignore a request}

- POST /request/review/:status/:requestId (status can either be accepted/rejected) {to accept/reject a request}

### userRouter
- GET /user/requests/received (received)
- GET /user/requests/sent (sent but haven't been accepted)
- GET /user/connections (get all the connections)
- GET /user/feed - Gets you the profile of the other users on the platform


Status: ignored, interested, accepted, rejected
