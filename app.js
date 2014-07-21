(function () {
    var application_root = __dirname,
        express = require('express'),
        path = require('path'),
        app = express();

    app.configure(function() {
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);
        app.use(express.static(path.join(application_root, "public")));
    });

    app.listen(process.env.PORT || 2424);
}).call(this);