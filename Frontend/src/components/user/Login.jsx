import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import SmartLogo from '../../assets/img/smartup.jpg';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Lógica de inicio de sesión, por ejemplo, verificar credenciales
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');

    // Ejemplo simple de verificación (reemplazar con tu lógica real)
    if (loginInput.value === 'user' && passwordInput.value === '1234') {
      // Después de un inicio de sesión exitoso, redirigir a la vista de usuario
      navigate('/user');
    } else {
      // Mostrar mensaje de error o realizar otras acciones según sea necesario
      console.log('Credenciales incorrectas');
    }
  };

  return (
    <div className="form-container fadeInDown">
      <div className="form-content" id="formContent">
        <div className="fadeIn first">
          <img src={SmartLogo} alt="User Icon" id="icon" />
        </div>
        <form onSubmit={handleLogin}>
          <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" />
          <input type="text" id="password" className="fadeIn third" name="login" placeholder="password" />
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>
        <div className="form-footer" id="formFooter">
          <a className="underlineHover" href="#">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
