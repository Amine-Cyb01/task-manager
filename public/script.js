document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const list = document.getElementById('task-list');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = input.value.trim();
    if (task) {
      await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task }),
      });
      input.value = '';
      loadTasks();
    }
  });

  async function loadTasks() {
    const res = await fetch('/tasks');
    const tasks = await res.json();
    list.innerHTML = '';
    tasks.forEach((t, index) => {
      const li = document.createElement('li');
      li.textContent = t;
      const btn = document.createElement('button');
      btn.textContent = 'Supprimer';
      btn.addEventListener('click', async () => {
        await fetch(`/tasks/${index}`, { method: 'DELETE' });
        loadTasks();
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  loadTasks();
});
