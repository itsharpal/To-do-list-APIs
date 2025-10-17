import express from 'express';
import { createNewTask, deleteTask, getTask, updateTask } from '../controllers/task.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route('/todos').post(isAuthenticated, createNewTask);
router.route('/todos/:id').post(isAuthenticated, updateTask);
router.route('/todos/:id').delete(isAuthenticated, deleteTask);
router.route('/todos').get(isAuthenticated, getTask);

export default router;