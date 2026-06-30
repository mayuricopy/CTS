use("college_nosql");

db.createCollection("feedback");

db.feedback.insertMany([
{
student_id:1,
course_code:"CS101",
semester:"2022-ODD",
rating:5,
comments:"Excellent teaching. Highly recommended.",
tags:["challenging","well-structured","good-examples"],
submitted_at:new Date("2022-11-30T10:15:00Z"),
attachments:[{filename:"notes.pdf",size_kb:240}]
},
{
student_id:2,
course_code:"CS101",
semester:"2022-ODD",
rating:4,
comments:"Very informative course.",
tags:["challenging","interactive"],
submitted_at:new Date("2022-11-28T09:30:00Z"),
attachments:[{filename:"assignment.pdf",size_kb:180}]
},
{
student_id:5,
course_code:"CS101",
semester:"2022-EVEN",
rating:2,
comments:"Need more practical sessions.",
tags:["difficult","fast-paced"],
submitted_at:new Date("2022-12-02T14:00:00Z"),
attachments:[{filename:"feedback.docx",size_kb:75}]
},
{
student_id:3,
course_code:"CS102",
semester:"2021-EVEN",
rating:3,
comments:"Good content.",
tags:["database","interesting"],
submitted_at:new Date("2021-12-15T10:00:00Z"),
attachments:[{filename:"db.pdf",size_kb:120}]
},
{
student_id:8,
course_code:"CS102",
semester:"2022-ODD",
rating:5,
comments:"Loved the labs.",
tags:["hands-on","challenging"],
submitted_at:new Date("2022-11-29T11:00:00Z"),
attachments:[{filename:"labs.zip",size_kb:350}]
},
{
student_id:4,
course_code:"CS103",
semester:"2023-ODD",
rating:4,
comments:"Object-oriented concepts explained well.",
tags:["oop","coding"],
submitted_at:new Date("2023-11-20T12:00:00Z"),
attachments:[{filename:"oop.pdf",size_kb:200}]
},
{
student_id:6,
course_code:"EC101",
semester:"2021-EVEN",
rating:1,
comments:"Too difficult.",
tags:["challenging","theory"],
submitted_at:new Date("2021-11-25T15:00:00Z"),
attachments:[{filename:"ec.docx",size_kb:60}]
},
{
student_id:7,
course_code:"ME101",
semester:"2023-ODD",
rating:5,
comments:"Excellent faculty.",
tags:["mechanical","practical"],
submitted_at:new Date("2023-11-26T13:00:00Z"),
attachments:[{filename:"thermo.pdf",size_kb:210}]
},
{
student_id:2,
course_code:"CS103",
semester:"2022-ODD",
rating:4,
comments:"Good examples.",
tags:["coding","examples"],
submitted_at:new Date("2022-11-18T16:00:00Z"),
attachments:[{filename:"code.zip",size_kb:140}]
},
{
student_id:1,
course_code:"EC101",
semester:"2022-ODD",
rating:3,
comments:"Average experience.",
tags:["electronics","circuits"],
submitted_at:new Date("2022-11-22T09:00:00Z")
}
]);

db.feedback.countDocuments();

db.feedback.find({ rating: 5 });

db.feedback.find({
    course_code: "CS101",
    tags: "challenging"
});

db.feedback.find(
    {},
    {
        student_id: 1,
        course_code: 1,
        rating: 1,
        _id: 0
    }
);

db.feedback.updateMany(
    {
        rating: { $lt: 3 }
    },
    {
        $set: {
            needs_review: true
        }
    }
);

db.feedback.updateMany(
    {
        needs_review: true
    },
    {
        $push: {
            tags: "reviewed"
        }
    }
);

db.feedback.deleteMany({
    semester: "2021-EVEN"
});

db.feedback.aggregate([
    {
        $match: {
            semester: "2022-ODD"
        }
    },
    {
        $group: {
            _id: "$course_code",
            avg_rating: { $avg: "$rating" },
            feedback_count: { $sum: 1 }
        }
    },
    {
        $sort: {
            avg_rating: -1
        }
    }
]);

db.feedback.aggregate([
    {
        $match: {
            semester: "2022-ODD"
        }
    },
    {
        $group: {
            _id: "$course_code",
            avg_rating: { $avg: "$rating" },
            feedback_count: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            course_code: "$_id",
            average_rating: {
                $round: ["$avg_rating", 1]
            },
            feedback_count: 1
        }
    },
    {
        $sort: {
            average_rating: -1
        }
    }
]);

db.feedback.aggregate([
    {
        $unwind: "$tags"
    },
    {
        $group: {
            _id: "$tags",
            tag_count: {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            tag_count: -1
        }
    }
]);

db.feedback.createIndex({
    course_code: 1
});

db.feedback.find({
    course_code: "CS101"
}).explain("executionStats");