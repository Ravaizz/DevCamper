const mongoose = require('mongoose');
const Course = require('../models/course.model');
const Bootcamp = require('../models/bootcamp.model');

exports.create = async function (req, res, next) {

    try {
        const bootcamp = await Bootcamp.findOne({ _id: req.params.id });
        if (!bootcamp) return next(new Error());
        let course = new Course({
            title: req.body.title,
            weeks: req.body.weeks,
            bootcamp: req.params.id,
            user:req.userId.user._id
        });
        course = await course.save();
        res.json(course);

    } catch (error) { next(error) }
};




exports.read_all = async function (req, res, next) {
    res.send(res.advancedQuery);
};


exports.read = async function (req, res, next) {
    await Course.findById(req.params.courseid).where({ bootcamp_id: req.params.id })
        .populate("bootcamp")
        .then((course) => {
            if (course.bootcamp._id != req.params.id) {
                return next(err)
            };
            res.send(course);
        }).catch(next);



};

exports.update = async function (req, res, next) {
    try {
        const bootcamp = await Bootcamp.findOne({ _id: req.params.id });
        let course = await Course.findById(req.params.courseid);
        if (!course || !bootcamp) {
            return next(new Error());
        }

        if(course.user.valueOf() !== req.userId.user._id) {
            return next(new Error())
         }
        course = await Course.findByIdAndUpdate(req.params.courseid, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json(course);
    }
    catch (error) { next(error) }
};



exports.delete = async function (req, res, next) {
    try {
        const bootcamp = await Bootcamp.findOne({ _id: req.params.id });
        if (!bootcamp) return next(new Error());

        const course = await Course.findById(req.params.courseid);

        if (!course || course.bootcamp != req.params.id) {
            return next(new Error());
        }
        
        if(course.user.valueOf() !== req.userId.user._id) {
            return next(new Error())
         }
        
        await course.remove();

        res.status(200).json({
            success: true,
        });
    }
    catch (error) { next(error) }


};
