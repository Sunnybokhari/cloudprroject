const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./passport-setup'); 
const firestore = require('./firestore'); 
const Task = require('./taskModel'); 
const multer = require('multer');
const { uploadToGCS } = require('./storage');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, 
    },
});

const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
}));


app.use(express.json()); 

app.use(session({ 
    secret: 'secret', 
    resave: false, 
    saveUninitialized: true 
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:3000/home');
});

app.get('/protected', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Hello, ${req.user.displayName}`);
    } else {
        res.send('You must be logged in to view this page');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




app.post('/task', upload.single('file'), async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('You need to log in');
    }

    let fileUrl = ''; 

    if (req.file) {
        try {
            fileUrl = await uploadToGCS(req.file); 
        } catch (error) {
            return res.status(500).send(`Error uploading file: ${error}`);
        }
    }

    const userEmail = req.user.email; 

    const newTask = new Task(
        null, 
        req.user.id, 
        req.body.title,
        req.body.description,
        req.body.dueDate,
        req.body.priority,
        'pending',
        fileUrl, 
        userEmail

    );

    try {
        const docRef = await firestore.collection('tasks').add(Object.assign({}, newTask));
        res.status(201).send({ taskId: docRef.id });
    } catch (error) {
        res.status(500).send(error.message);
    }
});



app.get('/tasks', async (req, res) => {
        if (!req.isAuthenticated()) {
        return res.status(401).send('You need to log in');
    }
    try {
        const tasksSnapshot = await firestore.collection('tasks').get();
        let tasksData = [];
        tasksSnapshot.forEach(doc => {
            let task = doc.data();
            task.id = doc.id; 
            tasksData.push(task);
        });
        res.send(tasksData);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send(error.message);
    }
});

app.put('/task/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('You need to log in');
    }

    const taskId = req.params.id;
    const updatedData = req.body;

    try {
        await firestore.collection('tasks').doc(taskId).update(updatedData);
        res.send(`Task with ID: ${taskId} has been updated`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/task-delete/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('You need to log in');
    }

    const taskId = req.params.id;

    try {
        await firestore.collection('tasks').doc(taskId).delete();
        res.send(`Task with ID: ${taskId} has been deleted`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
