export const cacheMiddleWare = (duration) => {
    console.log("mise à 0")

    return (req, res, next) => {
        const cacheMap = new Map();

        const key = req.originalUrl || req.url;
        const cachedResponse = cacheMap.get(key);
        console.log(cacheMap);

        if (cachedResponse && Date.now() < cachedResponse.expiry) {
            console.log(`Cache hit for ${key}`);

            // Restaurer les en-têtes
            Object.entries(cachedResponse.headers).forEach(([name, value]) => {
                res.set(name, value);
            });

            // Envoyer la réponse en cache
            return res.status(cachedResponse.status).send(cachedResponse.data);
        }

        console.log(`Cache miss for ${key}`);

        // Capturer la réponse
        const originalJson = res.json;
        const originalSend = res.send;
        const originalEnd = res.end;

        let responseBody;
        let responseHeaders;
        let responseStatus;

        res.json = function (body) {
            responseBody = JSON.stringify(body);
            return originalJson.call(this, body);
        };

        res.send = function (body) {
            responseBody = body;
            return originalSend.call(this, body);
        };

        res.end = function (chunk, encoding) {
            if (chunk) responseBody = chunk;
            responseHeaders = res.getHeaders();
            responseStatus = res.statusCode;

            const responseData = {
                data: responseBody,
                headers: responseHeaders,
                status: responseStatus,
                expiry: Date.now() + duration * 1000
            };
            cacheMap.set(key, responseData);
            console.log(`Caching response for ${key}`);
            // console.log(responseData)

            // console.log(cacheMap)
            return originalEnd.call(this, chunk, encoding);
        };

        next();
    };
};
