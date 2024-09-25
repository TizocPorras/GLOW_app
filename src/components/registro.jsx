import React, { useState } from 'react';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

function Registro() {

  //variables constantes para crear un usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();//Variable para redirigir a login

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");//validar que las contraseñas coinciden
      return;
    }

    try {
      // Registrar el usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado:", userCredential.user);

      // Mostrar mensaje de éxito
      setSuccessMessage("Usuario registrado con éxito. Redirigiendo a la página de inicio de sesión...");

      // Redirigir a la página de login después de 3 segundos
      setTimeout(() => {
        navigate('/'); // Redirige a /login
      }, 3000);

    } catch (error) {
      console.error("Error al registrar:", error.message);
      setError("Error al registrar: " + error.message);//Error de registro
    }
  };

  return (
    <div>

<div>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Iniciar sesión - Mi aplicación</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
  <div className="min-h-screen flex items-center justify-center">
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center mb-8">
      <img src={logo} alt="Logo Glow" height={150} width={150} />
      </div>
      <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">Registro</h1>
      {error && <p className="text-red-500 text-center">{error}</p>} {/* Mostrar error */}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>} {/* Mostrar mensaje de éxito */}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block mb-2 text-sm text-gray-600">Nombre y apellido</label>
          <input type="text" id="nombre" name="nombre" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required />
        </div>
        <div className="mb-4">
          <label htmlFor="apellido" className="block mb-2 text-sm text-gray-600">Nombre de Usuario</label>
          <input type="text" id="usuario" name="usuario" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300" 
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Correo electrónico</label>
          <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm text-gray-600">Contraseña</label>
          <input type="password" id="password" name="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm text-gray-600">Repetir contraseña</label>
          <input type="password" id="confirmPassword" name="confirmPassword" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required />
        </div>
        <button type="submit" className="w-32 bg-gradient-to-r  from-purple-400 to-purple-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2">Registro</button>
      </form>
      <div className="text-center">
        <p className="text-sm">¿Ya tienes una cuenta? <a href="/" className="text-purple-600">Inicia sesión</a></p>
      </div>
      <p className="text-xs text-gray-600 text-center mt-8">© 2023 WCS LAT</p>
    </div>
  </div>
</div>

      
    </div>
  );
}

export default Registro
