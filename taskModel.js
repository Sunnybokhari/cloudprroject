class Task {
    constructor(id, userId, title, description, dueDate, priority, status, fileUrl, userEmail) {
        this.id = id;
        // this.userId = userId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status; 
        this.fileUrl = fileUrl; 
        this.userEmail = userEmail; 
    }
}


module.exports = Task;
