import React, { useState } from 'react';
import logo from '../img/logo.png';
import { signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Para redirigir al usuario después del inicio de sesión exitoso

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Resetear el error antes de intentar iniciar sesión

    try {
      // Iniciar sesión con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuario iniciado sesión:", userCredential.user);

      // Redirigir a la página de inicio
      navigate('/inicio');
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setError("Error al iniciar sesión: " + error.message);
    }
  };

  return (
 <div className="min-h-screen flex items-center justify-center">
  <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
    <div className="flex justify-center mb-8">
      <img src={logo} alt="Logo Glow" height={200} width={200} />
    </div>
    <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">Iniciar sesión</h1>

    {error && <p className="text-red-500 text-center">{error}</p>} {/* Mostrar error si existe */}

    <form onSubmit={handleLogin}>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Correo electrónico</label>
        <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300" 
        required 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} // Actualizar estado del email
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm text-gray-600">Contraseña</label>
        <input type="password" id="password" name="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300" 
        required 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        />
        <a href="#" className="block text-right text-xs text-purple-600 mt-2">¿Olvidaste tu contraseña?</a>
      </div>
      <button type="submit" className="w-32 bg-gradient-to-r from-purple-400 to-purple-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-800 mt-4 mb-6">Acceso</button>
    </form>
    <div className="text-center">
      <p className="text-sm">
      ¿No tienes una cuenta? <a href="/registro" className="text-purple-600">Regístrate ahora</a>
      </p>
    </div>
    <p className="text-xs text-gray-600 text-center mt-10">© 2023 WCS LAT</p>
  </div>
</div>
  )
}

export default Login