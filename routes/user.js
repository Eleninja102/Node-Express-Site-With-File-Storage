const express = require("express");
const fs = require("node:fs");
const { json } = require("stream/consumers");

const router = express.Router();

router.get("/", (req, res) => {
  //console.log(req)
  const jsonData = fs.readFileSync("favoriteFoodData.txt", (err) => {
    if (err) {
      console.log(err);
    }
  });
  const obj = {firstName: req.query.firstname, lastName: req.query.lastname, favoriteFood: req.query.favoritefood};
  let tableData;
  try {
	tableData = JSON.parse(jsonData)
	tableData.push(obj)

  } catch (error) {
	tableData = [obj]
  }

  console.log(tableData)

  
  fs.writeFileSync("favoriteFoodData.txt", JSON.stringify(tableData), (err) => {
    if (err) {
      console.error(err);
    }
  });

  	//res.send(`<script>alert("your alert message");</script>`)
	res.redirect('back');
	//res.json({success: true})
	//res.send("Response Recorded")
	//res.end()
});

module.exports = router;
