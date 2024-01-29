const express = require("express");
const app = express();
const cors = require("cors");
const port = 9000;
const staticFolders = ["/assets"];
app.use(cors());
staticFolders.forEach((folder) => {
  app.use(folder, express.static(`.${folder}`));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
