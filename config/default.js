const path = require('path');


module.exports = {
    server: {
        port: 8888
    },
    root: {
        templates: path.join(process.cwd() + '/templates')
    },
    mongoURI: "mongodb://alexBliznec:zapomnil1@ds229771.mlab.com:29771/koa-app",
    session: {
        opts: {
            signed:false
        }
    }
}