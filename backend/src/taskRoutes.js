const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  uploadTaskDocuments,
} = require('../controllers/taskController');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const taskDir = path.join(__dirname, '../uploads/tasks', req.params.id);
    fs.mkdirSync(taskDir, { recursive: true });
    cb(null, taskDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

router.use(authMiddleware);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/documents', upload.array('files', 3), uploadTaskDocuments);

module.exports = router;
