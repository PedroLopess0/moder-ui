import React, { useState } from 'react';
import './App.css';

function App() {
  const [isNightMode, setIsNightMode] = useState(true);
  const [activeTab, setActiveTab] = useState('moon');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Meditação Zen', status: 'Em andamento', time: '22:00', completed: false },
    { id: 2, title: 'Hora de dormir', status: 'A fazer', time: '23:00', completed: false }
  ]);

  const obterDataAtual = () => {
    const data = new Date();
    const opcoes = { day: 'numeric', month: 'long', year: 'numeric' };
    const dataFormatada = data.toLocaleDateString('pt-BR', opcoes);
    return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTaskName = (e, id, currentTitle) => {
    e.stopPropagation();
    const newTitle = prompt("Digite o novo nome da atividade:", currentTitle);
    if (newTitle && newTitle.trim() !== "") {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, title: newTitle } : task
      ));
    }
  };

  const addTask = () => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const time = prompt("Digite o horário (ex: 21:30):");

    if (time === null) return;

    if (!timeRegex.test(time)) {
      alert("Horário inválido! Use o formato HH:MM (ex: 09:15 ou 22:00)");
      return;
    }

    const title = prompt("Digite o nome da atividade:") || "Nova Atividade";

    const newTask = {
      id: Date.now(),
      title: title,
      status: 'A fazer',
      time: time,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className={`container ${!isNightMode ? 'light-theme' : ''}`}>
      <div className="mobile-screen">
        <header className="header">
          <div className="header-top">
            <h1 className="greeting">{isNightMode ? 'Boa noite' : 'Bom dia'}</h1>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={isNightMode} 
                onChange={() => setIsNightMode(!isNightMode)} 
              />
              <span className="slider round"></span>
            </label>
          </div>
          <p className="date">{obterDataAtual()}</p>
        </header>

        <div className="hero-illustration">
          <div className={isNightMode ? "moon" : "sun"}></div>
          <div className="mountains">
            <div className="mountain mountain-1"></div>
            <div className="mountain mountain-2"></div>
          </div>
        </div>

        <section className="programmation">
          <div className="section-header">
            <h2>Programação</h2>
            <button className="add-btn" onClick={addTask}>+</button>
          </div>

          <div className="task-list">
            {tasks.map(task => (
              <div 
                key={task.id} 
                className={`task ${task.completed ? 'completed' : 'item-active'}`}
                onClick={() => toggleTask(task.id)}
              >
                <div className="icon-placeholder"></div>
                <div className="task-info">
                  <h3 onClick={(e) => editTaskName(e, task.id, task.title)} className="editable-title">
                    {task.title}
                  </h3>
                  <p>{task.completed ? 'Concluído' : task.status}</p>
                </div>
                <span className="time">{task.time}</span>
              </div>
            ))}
          </div>
        </section>

        <nav className="bottom-nav">
          <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
            <div className="nav-icon-box"></div>
            {activeTab === 'home' && <div className="dot"></div>}
          </div>
          <div className={`nav-item ${activeTab === 'moon' ? 'active' : ''}`} onClick={() => setActiveTab('moon')}>
            <div className="nav-icon-box"></div>
            {activeTab === 'moon' && <div className="dot"></div>}
          </div>
          <div className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <div className="nav-icon-box"></div>
            {activeTab === 'profile' && <div className="dot"></div>}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;