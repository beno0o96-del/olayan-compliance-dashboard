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
    
    // Welcome Toast
    setTimeout(() => {
        showToast('👋 Welcome to Tasks Management');
    }, 500);
});

// Load Employees from LocalStorage (shared with Admin)
function loadEmployees() {
    const storedEmployees = localStorage.getItem('admin_employees');
    if (storedEmployees && JSON.parse(storedEmployees).length > 0) {
        employees = JSON.parse(storedEmployees);
    } else {
        // Dummy Employees for Demo
        employees = [
            { name: "Ahmed Al-Fahad", position: "Manager" },
            { name: "Sarah Smith", position: "Supervisor" },
            { name: "Mohammed Ali", position: "Staff" }
        ];
    }
    populateEmployeeSelect();
}

// Populate Select Dropdown
function populateEmployeeSelect() {
    const select = document.getElementById('taskAssignee');
    if (!select) return;
    
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
    let loaded = [];
    if (storedTasks) {
        try {
            loaded = JSON.parse(storedTasks);
        } catch(e) { console.error("Error parsing tasks", e); }
    }

    if (loaded.length > 0) {
        tasks = loaded;
    } else {
        // Sample Data if empty
        tasks = [
            {
                id: '1',
                title: 'Review Safety Protocols',
                desc: 'Check the new fire safety regulations and update the branch guide.',
                assignee: 'Mohammed Ali',
                priority: 'high',
                dueDate: '2025-02-15',
                status: 'pending'
            },
            {
                id: '2',
                title: 'Staff Training L1',
                desc: 'Complete Level 1 training for new hires in Riyadh branch.',
                assignee: 'Sarah Smith',
                priority: 'medium',
                dueDate: '2025-02-20',
                status: 'inprogress'
            },
            {
                id: '3',
                title: 'Inventory Audit',
                desc: 'Monthly check of stock levels.',
                assignee: 'Ahmed Al-Fahad',
                priority: 'low',
                dueDate: '2025-02-10',
                status: 'completed'
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
    Object.values(columns).forEach(col => { if(col) col.innerHTML = ''; });

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
    div.className = 'task-card priority-' + (task.priority ? task.priority.toLowerCase() : 'medium');
    div.draggable = true;
    div.dataset.id = task.id;
    div.ondragstart = drag;

    div.innerHTML = `
        <div class="task-priority"></div>
        <div class="task-content">
            <div class="task-title">${task.title}</div>
            <div class="task-desc">${task.desc || ''}</div>
            <div class="task-meta">
                <div class="task-assignee">
                    <div class="assignee-avatar">${getInitials(task.assignee)}</div>
                    <span>${task.assignee || 'Unassigned'}</span>
                </div>
                <div class="task-date">📅 ${task.dueDate || 'N/A'}</div>
            </div>
        </div>
        
        <div class="task-actions-overlay" style="position: absolute; top: 10px; right: 10px; opacity: 0; transition: opacity 0.2s; display: flex; gap: 5px;">
             <button onclick="editTask('${task.id}')" title="Edit" style="background: rgba(0,0,0,0.5); border: none; border-radius: 4px; color: #fff; cursor: pointer; padding: 6px; backdrop-filter: blur(4px);">✏️</button>
             <button onclick="deleteTask('${task.id}')" title="Delete" style="background: rgba(239, 68, 68, 0.8); border: none; border-radius: 4px; color: #fff; cursor: pointer; padding: 6px; backdrop-filter: blur(4px);">🗑️</button>
        </div>
    `;
    
    // Add hover effect for actions
    div.onmouseenter = () => div.querySelector('.task-actions-overlay').style.opacity = '1';
    div.onmouseleave = () => div.querySelector('.task-actions-overlay').style.opacity = '0';

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
        if(task) {
            document.getElementById('taskId').value = task.id;
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDesc').value = task.desc;
            document.getElementById('taskAssignee').value = task.assignee;
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskDueDate').value = task.dueDate;
            if(title) {
                title.setAttribute('data-en', 'Edit Task');
                title.setAttribute('data-ar', 'تعديل المهمة');
                title.textContent = document.body.classList.contains('ar') ? 'تعديل المهمة' : 'Edit Task';
            }
        }
    } else {
        form.reset();
        document.getElementById('taskId').value = '';
        if(title) {
            title.setAttribute('data-en', 'Add New Task');
            title.setAttribute('data-ar', 'إضافة مهمة جديدة');
            title.textContent = document.body.classList.contains('ar') ? 'إضافة مهمة جديدة' : 'Add New Task';
        }
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
            showToast('Task updated successfully');
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
        showToast('New task added');
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
        showToast('Task deleted');
    }
}

// Drag and Drop
function allowDrop(ev) {
    ev.preventDefault();
    ev.currentTarget.classList.add('drag-over');
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.dataset.id);
    ev.target.classList.add('dragging');
}

function drop(ev, newStatus) {
    ev.preventDefault();
    ev.currentTarget.classList.remove('drag-over');
    const id = ev.dataTransfer.getData("text");
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex > -1) {
        // Only update if status changed
        if (tasks[taskIndex].status !== newStatus) {
            tasks[taskIndex].status = newStatus;
            saveTasks();
            renderTasks();
            showToast(`Task moved to ${newStatus}`);
        }
    }
}

// Toast Notification
function showToast(message) {
    // Remove existing toast
    const existing = document.getElementById('task-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'task-toast';
    toast.textContent = message;
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%) translateY(100px)',
        backgroundColor: '#3b82f6',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '50px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        zIndex: '3000',
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        fontWeight: 'bold',
        fontSize: '0.95rem'
    });

    document.body.appendChild(toast);

    // Animate In
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    // Remove after 3s
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function updateCounts() {
    const counts = {
        pending: tasks.filter(t => t.status === 'pending').length,
        inprogress: tasks.filter(t => t.status === 'inprogress').length,
        completed: tasks.filter(t => t.status === 'completed').length
    };

    const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if(el) el.textContent = val;
    };

    setTxt('count-pending', counts.pending);
    setTxt('count-inprogress', counts.inprogress);
    setTxt('count-completed', counts.completed);
}
