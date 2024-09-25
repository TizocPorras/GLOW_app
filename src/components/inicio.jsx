import React from 'react'
import logo from '../img/logo.png';
import { FaHome, FaBoxOpen, FaRegCalendarAlt, FaSignOutAlt, FaBell, FaUser  } from 'react-icons/fa';

function Inicio() {
  
  return (
    <div>
      
     <div className="flex flex-col h-screen bg-gray-100">
  {/* Barra de navegación superior */}
  <div className="bg-white text-white shadow w-full p-2 flex items-center justify-between">
    <div className="flex items-center">
      <div className="flex items-center"> {/* Mostrado en todos los dispositivos */}
      <img src={logo} alt="Logo Glow" height={50} width={50} />
        <h2 className="font-bold text-xl text-gray-500">GLOW</h2>
      </div>
      <div className="md:hidden flex items-center"> {/* Se muestra solo en dispositivos pequeños */}
        <button id="menuBtn">
        <FaHome className="inline mr-2 text-red-500" size={25} /> {/* Ícono de menú */}
        </button>
      </div>
    </div>
    {/* Ícono de Notificación y Perfil */}
    <div className="space-x-5">
      <button> 
      <FaBell className="inline mr-1 text-gray-500" size={25} />
      </button>
      {/* Botón de Perfil */}
      <button>
      <FaUser className="inline mr-1 text-gray-500" size={25}  />
      </button>
    </div>
  </div>
  {/* Contenido principal */}
  <div className="flex-1 flex flex-wrap">
    {/* Barra lateral de navegación (oculta en dispositivos pequeños) */}
    <div className="p-2 bg-white w-full md:w-60 flex flex-col md:flex hidden" id="sideNav">
    <nav>
      <a
        className="flex items-center text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-100 hover:text-black"
        href>
        <FaHome className="inline mr-2" size={25} />
        <span className="ml-1">Inicio</span>
      </a>
      <a
        className="flex items-center text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-100 hover:text-black"
        href="/inventario">
        <FaBoxOpen className="inline mr-2" size={25} />
        <span className="ml-1">Inventario</span>
      </a>
      <a
        className="flex items-center text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-100 hover:text-black"
        href="/calendario">
        <FaRegCalendarAlt className="inline mr-2" size={25} />
        <span className="ml-1">Calendario</span>
      </a>
    </nav>
      {/* Ítem de Cerrar Sesión */}
      <a className="flex items-center text-gray-500 py-2.5 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-100 hover:text-black mt-auto" 
      href="/">
        <FaSignOutAlt className="inline mr-2" size={25} />
        <span className="ml-1">Cerrar sesión</span>
      </a>
      {/* Señalador de ubicación */}
      <div className="bg-gradient-to-r from-purple-300 to-purple-500 h-px mt-2" />
      {/* Copyright al final de la navegación lateral */}

    </div>
    {/* Área de contenido principal */}
    <div className="flex-1 p-4 w-full md:w-1/2">
      {/* Campo de búsqueda */}
      {/* <div className="relative max-w-md w-full">
        <div className="absolute top-1 left-2 inline-flex items-center p-2">
          <i className="fas fa-search text-gray-400" />
        </div>
        <input className="w-full h-10 pl-10 pr-4 py-1 text-base placeholder-gray-500 border rounded-full focus:shadow-outline" type="search" placeholder="Buscar..." />
      </div> */}
      {/* Contenedor de Gráficas */}
      <div className="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
        {/* Primer contenedor */}
        {/* Sección 1 - Gráfica de Usuarios */}
        {/* <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
          <h2 className="text-gray-500 text-lg font-semibold pb-1">Usuarios</h2> */}
          {/* <div className="my-1" /> Espacio de separación */}
          {/* <div className="bg-gradient-to-r from-purple-300 to-purple-500 h-px mb-6" /> Línea con gradiente */}
          {/* <div className="chart-container" style={{position: 'relative', height: 150, width: '100%'}}> */}
            {/* El canvas para la gráfica */}
            {/* <canvas id="usersChart" />
          </div>
        </div> */}
        {/* Segundo contenedor */}
        {/* Sección 2 - Gráfica de Comercios */}
        {/* <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
          <h2 className="text-gray-500 text-lg font-semibold pb-1">Comercios</h2> */}
          {/* <div className="my-1" /> Espacio de separación */}
          {/* <div className="bg-gradient-to-r from-purple-300 to-purple-500 h-px mb-6" /> Línea con gradiente */}
          {/* <div className="chart-container" style={{position: 'relative', height: 150, width: '100%'}}> */}
            {/* El canvas para la gráfica */}
            {/* <canvas id="commercesChart" />
          </div>
        </div> */}
      </div>
      {/* Tercer contenedor debajo de los dos anteriores */}
      {/* Sección 3 - Tabla de Autorizaciones Pendientes */}
      <div className="mt-8 bg-white p-4 shadow rounded-lg">
        <h2 className="text-gray-500 text-lg font-semibold pb-4">Citas Pendientes</h2>
        <div className="my-1" /> {/* Espacio de separación */}
        <div className="bg-gradient-to-r from-purple-300 to-purple-500 h-px mb-6" /> {/* Línea con gradiente */}
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="text-sm leading-normal">
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Nombre</th>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Fecha</th>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Lugar</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-grey-lighter">
              <td className="py-2 px-4 border-b border-grey-light">Juan Pérez</td>
              <td className="py-2 px-4 border-b border-grey-light">13/08/2024</td>
              <td className="py-2 px-4 border-b border-grey-light">Parque</td>
            </tr>
            {/* Añade más filas aquí como la anterior para cada autorización pendiente */}
            <tr className="hover:bg-grey-lighter">
            <td className="py-2 px-4 border-b border-grey-light">Juan Pérez</td>
              <td className="py-2 px-4 border-b border-grey-light">13/08/2024</td>
              <td className="py-2 px-4 border-b border-grey-light">Parque</td>
            </tr>
            <tr className="hover:bg-grey-lighter">
            <td className="py-2 px-4 border-b border-grey-light">Juan Pérez</td>
              <td className="py-2 px-4 border-b border-grey-light">13/08/2024</td>
              <td className="py-2 px-4 border-b border-grey-light">Parque</td>
            </tr>
            <tr className="hover:bg-grey-lighter">
            <td className="py-2 px-4 border-b border-grey-light">Juan Pérez</td>
              <td className="py-2 px-4 border-b border-grey-light">13/08/2024</td>
              <td className="py-2 px-4 border-b border-grey-light">Parque</td>
            </tr>
            <tr className="hover:bg-grey-lighter">
            <td className="py-2 px-4 border-b border-grey-light">Juan Pérez</td>
              <td className="py-2 px-4 border-b border-grey-light">13/08/2024</td>
              <td className="py-2 px-4 border-b border-grey-light">Parque</td>
            </tr>
          </tbody>
        </table>
        {/* Botón "Ver más" para la tabla de Autorizaciones Pendientes */}
        <div className="text-right mt-4">
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded">
            Ver más
          </button>
        </div>
      </div>
      {/* Cuarto contenedor */}
      {/* Sección 4 - Tabla de Transacciones */}
      <div className="mt-8 bg-white p-4 shadow rounded-lg">
        <div className="bg-white p-4 rounded-md mt-4">
          <h2 className="text-gray-500 text-lg font-semibold pb-4">Inventario</h2>
          <div className="my-1" /> {/* Espacio de separación */}
          <div className="bg-gradient-to-r from-purple-300 to-purple-500 h-px mb-6" /> {/* Línea con gradiente */}
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="text-sm leading-normal">
                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Nombre</th>
                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Fecha</th>
                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-grey-lighter">
                <td className="py-2 px-4 border-b border-grey-light">Carlos Sánchez</td>
                <td className="py-2 px-4 border-b border-grey-light">27/07/2023</td>
                <td className="py-2 px-4 border-b border-grey-light text-right">$1500</td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-2 px-4 border-b border-grey-light">Pedro Hernández</td>
                <td className="py-2 px-4 border-b border-grey-light">02/08/2023</td>
                <td className="py-2 px-4 border-b border-grey-light text-right">$1950</td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-2 px-4 border-b border-grey-light">Sara Ramírez</td>
                <td className="py-2 px-4 border-b border-grey-light">03/08/2023</td>
                <td className="py-2 px-4 border-b border-grey-light text-right">$1850</td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-2 px-4 border-b border-grey-light">Daniel Torres</td>
                <td className="py-2 px-4 border-b border-grey-light">04/08/2023</td>
                <td className="py-2 px-4 border-b border-grey-light text-right">$2300</td>
              </tr>
            </tbody>
          </table>
          {/* Botón "Ver más" para la tabla de Transacciones */}
          <div className="text-right mt-4">
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"  href="/inventario" >
            Ver más
          </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Script para las gráficas */}


    </div>
  )
}

export default Inicio
