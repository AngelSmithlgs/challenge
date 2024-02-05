import React, { useState } from 'react';
import UserLogin from '../user/Login';
import './home.css';

function Home() {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setLoginOpen(false);
  };

  return (
    <div className="home-container">
      <h1>Bienvenido a Tu Plataforma de Desarrollo Optimizado</h1>
      <p>
        Como parte integral de nuestro equipo, te invitamos a explorar cómo podemos juntos mejorar y automatizar tus tareas diarias para potenciar la eficiencia y perfeccionar el flujo de trabajo en la empresa. Descubre las siguientes herramientas diseñadas para ti:
      </p>
      <ul>
        <li>Automatización inteligente de tareas repetitivas para liberar tu tiempo y potenciar tu creatividad.</li>
        <li>Inteligencia artificial integrada para ofrecerte soluciones eficientes y optimizar tus procesos de desarrollo.</li>
        <li>Asistentes virtuales personalizados que te guiarán en la planificación y ejecución de proyectos.</li>
      </ul>
      <p>
        Sumérgete en la plataforma y descubre cómo estas herramientas están diseñadas para potenciar tu experiencia diaria en el desarrollo de software.
      </p>
      <div>
        {isLoginOpen && (
          <div className="login-container">
            <UserLogin />
            <button className="close-btn" onClick={handleCloseLogin}>
              &times;
            </button>
          </div>
        )}
        <button className="btn btn-primary" onClick={handleLoginClick}>
          ¡INICIA SESIÓN PARA COMENZAR!
        </button>
      </div>
    </div>
  );
}

export default Home;
