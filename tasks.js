// Tasks Management Logic

// State
let tasks = [];
let employees = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();
    loadTasks();
    setupDragAndDrop();
    updateCounts();
});

// Load Employees from LocalStorage (shared with Admin)
function loadEmployees() {
    const storedEmployees = localStorage.getItem('admin_employees');
    if (storedEmployees) {
        employees = JSON.parse(storedEmployees);
    }
    populateEmployeeSelect();
}

// Populate Select Dropdown
function populateEmployeeSelect() {
    const select = document.getElementById('taskAssignee');
    // Keep first option (Select Employee...)
    select.innerHTML = select.options[0].outerHTML;
    
    employees.forEach(emp => {
        const option = document.createElement('option');
        option.value = emp.name; // Using name for simplicity, ideally ID
        option.textContent = `${emp.name} (${emp.position})`;
        select.appendChild(option);
    });
}

// Load Tasks from LocalStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('admin_tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    } else {
        // Sample Data if empty
        tasks = [
            {
                id: '1',
                title: 'Review Safety Protocols',
                desc: 'Check the new fire safety regulations and update the branch guide.',
                assignee: 'محمد علي',
                priority: 'high',
                dueDate: '2025-02-15',
                status: 'pending'
            },
            {
                id: '2',
                title: 'Staff Training L1',
                desc: 'Complete Level 1 training for new hires in Riyadh branch.',
                assignee: 'فهد السالم',
                priority: 'medium',
                dueDate: '2025-02-20',
                status: 'inprogress'
            }
        ];
        saveTasks();
    }
    renderTasks();
}

// Save Tasks
function saveTasks() {
    localStorage.setItem('admin_tasks', JSON.stringify(tasks));
    updateCounts();
}

// Render Tasks to Columns
function renderTasks() {
    const columns = {
        pending: document.getElementById('col-pending'),
        inprogress: document.getElementById('col-inprogress'),
        completed: document.getElementById('col-completed')
    };

    // Clear columns
    Object.values(columns).forEach(col => col.innerHTML = '');

    tasks.forEach(task => {
        const card = createTaskCard(task);
        if (columns[task.status]) {
            columns[task.status].appendChild(card);
        }
    });
}

// Create HTML for Task Card
function createTaskCard(task) {
    const div = document.createElement('div');
    div.className = 'task-card';
    div.draggable = true;
    div.dataset.id = task.id;
    div.ondragstart = drag;

    const priorityLabels = { high: 'High', medium: 'Medium', low: 'Low' };
    const priorityAr = { high: 'عالية', medium: 'متوسطة', low: 'منخفضة' };
    
    // Check current lang for display, but here we render mixed or just English/Arabic
    // Better to use data attributes for translation if possible, but JS dynamic rendering is tricky with static translation script.
    // We will assume the page might reload on lang switch or we just render text. 
    // Let's use simple text for now or try to use the data-en/data-ar pattern if the app.js handles it dynamically.
    // app.js usually handles static content. For dynamic content, we might need a helper.
    // I'll just put English for now or dual.

    div.innerHTML = `
        <div class="task-actions">
            <button class="btn-icon" onclick="editTask('${task.id}')">✏️</button>
            <button class="btn-icon" onclick="deleteTask('${task.id}')">🗑️</button>
        </div>
        <span class="task-tag priority-${task.priority}">
            ${priorityLabels[task.priority]}
        </span>
        <div class="task-title">${task.title}</div>
        <div style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 10px;">${task.desc}</div>
        <div class="task-meta">
            <div class="task-assignee">
                <div class="task-avatar">${getInitials(task.assignee)}</div>
                <span>${task.assignee || 'Unassigned'}</span>
            </div>
            <div>📅 ${task.dueDate}</div>
        </div>
    `;
    return div;
}

function getInitials(name) {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
}

// Modal Functions
function openTaskModal(taskId = null) {
    const modal = document.getElementById('taskModal');
    const form = document.getElementById('taskForm');
    const title = document.getElementById('modalTitle');
    
    if (taskId) {
        const task = tasks.find(t => t.id === taskId);
        document.getElementById('taskId').value = task.id;
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDesc').value = task.desc;
        document.getElementById('taskAssignee').value = task.assignee;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskDueDate').value = task.dueDate;
        title.setAttribute('data-en', 'Edit Task');
        title.setAttribute('data-ar', 'تعديل المهمة');
        title.textContent = 'Edit Task'; // Fallback
    } else {
        form.reset();
        document.getElementById('taskId').value = '';
        title.setAttribute('data-en', 'Add New Task');
        title.setAttribute('data-ar', 'إضافة مهمة جديدة');
        title.textContent = 'Add New Task';
    }
    
    modal.style.display = 'flex';
}

function closeTaskModal() {
    document.getElementById('taskModal').style.display = 'none';
}

function handleTaskSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('taskId').value;
    const title = document.getElementById('taskTitle').value;
    const desc = document.getElementById('taskDesc').value;
    const assignee = document.getElementById('taskAssignee').value;
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDueDate').value;

    if (id) {
        // Edit
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex > -1) {
            tasks[taskIndex] = { ...tasks[taskIndex], title, desc, assignee, priority, dueDate };
        }
    } else {
        // Add
        const newTask = {
            id: Date.now().toString(),
            title,
            desc,
            assignee,
            priority,
            dueDate,
            status: 'pending' // Default to pending
        };
        tasks.push(newTask);
    }

    saveTasks();
    renderTasks();
    closeTaskModal();
}

function editTask(id) {
    openTaskModal(id);
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

// Drag and Drop
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.dataset.id);
}

function drop(ev, newStatus) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex > -1) {
        tasks[taskIndex].status = newStatus;
        saveTasks();
        renderTasks();
    }
}

function setupDragAndDrop() {
    // Already handled via inline HTML attributes (ondrop, ondragover, ondragstart)
    // but we could add listeners here if we wanted to separate logic.
}

function updateCounts() {
    const counts = {
        pending: tasks.filter(t => t.status === 'pending').length,
        inprogress: tasks.filter(t => t.status === 'inprogress').length,
        completed: tasks.filter(t => t.status === 'completed').length
    };

    document.getElementById('count-pending').textContent = counts.pending;
    document.getElementById('count-inprogress').textContent = counts.inprogress;
    document.getElementById('count-completed').textContent = counts.completed;
}
