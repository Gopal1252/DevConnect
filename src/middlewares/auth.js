const adminAuth = (req, res, next) => {
    console.log("Admin auth in getting checked");
    const token = "xyz";
    const isAdminAuthorized = (token === "xyz");
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized Request");
    }
    else{
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("User auth in getting checked");
    const token = "xyz";
    const isUserAuthorized = (token === "xyz");
    if(!isUserAuthorized){
        res.status(401).send("Unauthorized Request");
    }
    else{
        next();
    }
};

module.exports = {
    adminAuth,
    userAuth
};