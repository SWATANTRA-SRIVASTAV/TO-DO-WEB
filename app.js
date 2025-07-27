document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load todos from localStorage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = '';

        // Helper function to generate random pastel color
        function getRandomPastelColor() {
            const hue = Math.floor(Math.random() * 360);
            return `hsl(${hue}, 70%, 80%)`;
        }

        todos.forEach((todo, index) => {
            const li = document.createElement('li');

            // Assign random color if not already assigned
            if (!todo.color) {
                todo.color = getRandomPastelColor();
            }

            // Set background color and desaturate if completed
            li.style.backgroundColor = todo.color;
            li.style.filter = todo.completed ? 'grayscale(70%) brightness(85%)' : 'none';

            // Create checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => {
                todos[index].completed = checkbox.checked;
                saveTodos();
                renderTodos();
            });

            // Create label for task text
            const label = document.createElement('span');
            label.textContent = todo.text;
            if (todo.completed) {
                label.classList.add('completed');
            }

            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Add slideUp animation before removing
                li.style.animation = 'slideUp 0.4s forwards';
                setTimeout(() => {
                    todos.splice(index, 1);
                    saveTodos();
                    renderTodos();
                }, 400);
            });

            li.appendChild(checkbox);
            li.appendChild(label);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text !== '') {
            todos.push({ text, completed: false });
            saveTodos();
            renderTodos();
            todoInput.value = '';
            todoInput.focus();
        }
    });

    renderTodos();
});
