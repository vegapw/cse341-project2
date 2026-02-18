module.exports = {
    ensureAuth: function(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(401).json('Unauthorized');
        }
    },
    ensureGuest: function(req, res, next){
        if (req.isAuthenticated()) {
            res.send('Already authenticated.');
        } else {
            return next();
        }
    }
}