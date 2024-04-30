const express = require('express');
const path = require('path');

const application_root = __dirname;
const app = express();

app.use(express.static(path.join(application_root, "public")))

app.listen(process.env.PORT || 2424);