import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

export const createNewTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                message: "Both fields are required",
                success: false
            })
        }

        const userId = req.id;

        const task = await Task.create({
            title,
            description,
            creator: userId
        })

        return res.status(201).json({
            message: 'Task created successfully',
            task,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const updateTask = async (req, res) => {
    const { title, description } = req.body;
    const taskId = req.params.id;
    const updatedData = { title, description };

    let task = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });
    if (!task) {
        return res.status(404).json({
            message: "No task exist with this ID",
            success: false
        })
    }

    return res.status(200).json({
        message: "Task information updated.",
        task,
        success: true
    });
}

export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        await Task.deleteOne({ _id: taskId });

        return res.status(200).json({
            message: "Task deleted successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getTask = async (req, res) => {
    try {
        const userId = req.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const { title, description } = req.query;

        // Sorting criteria
        const sortField = req.query.sortBy || "createdAt";
        const sortOrder = req.query.order === "desc" ? -1 : 1;

        let filter = { creator: userId };
        if (title) {
            filter.title = { $regex: title, $options: "i" };
        }
        if (description) {
            filter.description = { $regex: description, $options: "i" };
        }

        const total = await Task.countDocuments(filter);
        const tasks = await Task.find(filter)
            .sort({ [sortField]: sortOrder })
            .skip((page - 1) * limit)
            .limit(limit)

        res.status(200).json({
            tasks, 
            page,
            limit,
            total,
            sortOrder,
            sortField,
        })
    } catch (error) {
        console.log(error);
    }
}