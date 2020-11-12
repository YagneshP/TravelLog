const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./middleware");
const dotenv = require("dotenv");
const logs = require("./api/logs");
const app = express();
dotenv.config();
//connection to database
mongoose.connect(process.env.DATABASE_URL, 
	{
		useNewUrlParser: true,
		useUnifiedTopology:true
	}).catch(error => console.log(error))
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors({
	origin:process.env.CORS_ORIGIN
}));

app.get("/", (req,res)=>{
	res.json({
		message:"Hello there!"
	})
})
app.use("/api/logs", logs);
app.use(middleware.notFound);
app.use(middleware.errorHandler);


 const port = process.env.PORT || 8002;


app.listen(port,()=>{
	console.log(`Server is listening on ${port}`);
	
} );