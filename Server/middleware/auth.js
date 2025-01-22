export const auth = (req, res, next) => {
    if(!req.session.Admin)
        return res.status(401).json('Prieiga negalima');

    next();
}