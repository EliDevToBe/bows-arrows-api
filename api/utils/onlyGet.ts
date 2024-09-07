export function onlyGetMethodAllowed() {
    return (req, res, next) => {
        if (req.method != "GET") {
            res.status(405);
            res.json({
                oops: 'There is nothing here.',
                method: req.method,
                message: 'Method Not Allowed',
                at: req.headers.host + req.originalUrl
            })
            return
        }
        next();
    }
}