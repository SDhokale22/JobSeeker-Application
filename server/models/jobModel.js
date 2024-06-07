import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, "Please provide job title"],
        minLength: [3, "title must contain atleast 3 character"],
    },
    description:{
        type:String,
        required: [true, "Please provide job descriptin"],
    },
    category:{
        type:String,
        required: [true, "Job category is required"],
    },
    country:{
        type:String,
        required: [true, "Job country is required"],
    },
    city:{
        type:String,
        required: [true, "Job city is required"],
    },
    location:{
        type:String,
        required: [true, "Job location is required"],
        minLength: [10, "job description must contain atleast 10 character"],
    },
    fixedSalary:{
        type:Number,
        minLength: [4, "fixed salary must contain at least 4 digit"],
        maxLength: [9, "fixed salary cannot exceed 9 digits"],
    },
    salaryFrom:{
        type:Number,
        minLength: [4, "salary from must contain at least 4 digit"],
        maxLength: [9, "salary from cannot exceed 9 digits"],
    },
    salaryTo:{
        type:Number,
        minLength: [4, "salary To must contain at least 4 digit"],
        maxLength: [9, "salary To cannot exceed 9 digits"],
    },
    expired:{
        type:Boolean,
        default: false,
    },
    jobPostedOn:{
        type:Date,
        default: Date.now,
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

export const Job = mongoose.model("Job", jobSchema);