import logo from '../img/logo.png';
import { FaPencilAlt, FaTrashAlt  } from 'react-icons/fa';
import React, { useState } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc  } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, } from 'react';

function Inventario() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    producto: '',
    cantidad: '',
    marca: '',
    color: '',
    tamaño: '',
  });

  const popuphandler = (isOpen) => {
    setIsModalOpen(isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = async (id) => {
    const updatedData = { /* nuevos valores del formulario */ };
    await updateProducto(id, updatedData);
  };
  

  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await addProducto(formData); // Llama a la función de agregar producto
  //     console.log('Producto añadido:', formData);
  //     // Resetea el formulario
  //     setFormData({ producto: '', cantidad: '', marca: '', color: '', tamaño: '' });
  //     popuphandler(false); // Cierra el modal después de guardar
  //   } catch (error) {
  //     console.error('Error al añadir producto:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      // await addProducto(formData); // Añade el producto
      // console.log('Producto añadido:', formData);

       // Convertir cantidad a número
  const formDataConNumeros = {
    ...formData,
    cantidad: Number(formData.cantidad), // Convierte el valor de cantidad a número
  };

  try {
    await addProducto(formDataConNumeros); // Añade el producto con la cantidad como número
    console.log('Producto añadido:', formDataConNumeros);
    
    // Vuelve a obtener los productos después de añadir
    const productosObtenidos = await fetchProductos();
    setProductos(productosObtenidos);

    // Resetea el formulario
    setFormData({ producto: '', cantidad: '', marca: '', color: '', tamaño: '' });
    popuphandler(false); // Cierra el modal después de guardar
  } catch (error) {
    console.error('Error al añadir producto:', error);
  }
      
    //   // Vuelve a obtener los productos después de añadir
    //   const productosObtenidos = await fetchProductos();
    //   setProductos(productosObtenidos);
  
    //   // Resetea el formulario
    //   setFormData({ producto: '', cantidad: '', marca: '', color: '', tamaño: '' });
    //   popuphandler(false); // Cierra el modal después de guardar
    // } catch (error) {
    //   console.error('Error al añadir producto:', error);
    
  };

  // const handleDelete = async (id) => {
  //   await deleteProducto(id);
  // };

  const handleDelete = async (id) => {
    try {
      await deleteProducto(id); // Elimina el producto
      console.log("Producto eliminado con éxito");
  
      // Vuelve a obtener los productos después de eliminar
      const productosObtenidos = await fetchProductos();
      setProductos(productosObtenidos);
    } catch (error) {
      console.error("Error eliminando el producto: ", error);
    }
  };
  
  

  useEffect(() => {
    const obtenerProductos = async () => {
      const productos = await fetchProductos();
      console.log(productos); // Aquí deberías actualizar el estado con la lista de productos
    };
    obtenerProductos();
  }, []);

  const addProducto = async (producto) => {
    try {
      await addDoc(collection(db, 'productos'), producto);
      console.log("Producto añadido con éxito");
    } catch (error) {
      console.error("Error añadiendo el producto: ", error);
    }
  };

  const fetchProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      const productosArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return productosArray;
    } catch (error) {
      console.error("Error obteniendo los productos: ", error);
    }
  };


const updateProducto = async (id, updatedData) => {
  try {
    const productoRef = doc(db, 'productos', id);
    await updateDoc(productoRef, updatedData);
    console.log("Producto actualizado con éxito");
  } catch (error) {
    console.error("Error actualizando el producto: ", error);
  }
};

const deleteProducto = async (id) => {
  try {
    await deleteDoc(doc(db, 'productos', id));
    console.log("Producto eliminado con éxito");
  } catch (error) {
    console.error("Error eliminando el producto: ", error);
  }
};
const [productos, setProductos] = useState([]);

useEffect(() => {
  const obtenerProductos = async () => {
    const productosObtenidos = await fetchProductos();
    setProductos(productosObtenidos);
  };
  obtenerProductos();
}, []);


  return (

    <div>
  <div className="sm:px-6 w-full">
    <div className="px-4 md:px-10 py-4 md:py-7">
      <div className="flex items-center justify-between">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo Glow" height={50} width={50} />
          <p tabIndex={0} className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800" style={{ marginLeft: '10px' }}>Inventario</p>
        </div>
        <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
          <p>Buscar por:</p>
          <select aria-label="select" className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
            <option className="text-sm text-indigo-800">Latest</option>
            <option className="text-sm text-indigo-800">Oldest</option>
          </select>
        </div>
      </div>
    </div>

    <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
      <div className="sm:flex items-center justify-between">
        <div className="flex items-center">
          <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-purple-800" href="/inicio">
            <div className="py-2 px-8 bg-indigo-100 text-purple-700 rounded-full">
              <p>Inicio</p>
            </div>
          </a>
        </div>
        <div>
          <button 
            onClick={() => popuphandler(true)} 
            className="focus:ring-2 focus:ring-offset-2 from-purple-400 to-purple-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-purple-700 hover:bg-purple-600 focus:outline-none rounded"
          >
            <p className="text-sm font-medium leading-none text-white">Añadir Producto</p>
          </button>

          {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {/* Campos para agregar nuevos productos */}
                <div className="w-full">
                  <div className="mb-4">
                    <label htmlFor="producto" className="block text-sm font-medium text-gray-700">Producto</label>
                    <input
                      type="text"
                      id="producto"
                      name="producto"
                      value={formData.producto}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">Cantidad</label>
                    <input
                      type="number"
                      id="cantidad"
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="marca" className="block text-sm font-medium text-gray-700">Marca</label>
                    <input
                      type="text"
                      id="marca"
                      name="marca"
                      value={formData.marca}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="tamaño" className="block text-sm font-medium text-gray-700">Tamaño</label>
                    <input
                      type="text"
                      id="tamaño"
                      name="tamaño"
                      value={formData.tamaño}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => popuphandler(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
)}

        </div>
      </div>

      <div className="mt-7 overflow-x-auto">
  <table className="w-full whitespace-nowrap">
    {/* Encabezados de la tabla */}
    <thead>
      <tr className="focus:outline-none h-16 border border-gray-100 rounded">
        <th className="pl-5 text-left">
          <p className="text-base font-medium leading-none text-gray-700">Producto</p>
        </th>
        <th className="pl-24 text-left">
          <p className="text-base font-medium leading-none text-gray-700">Cantidad</p>
        </th>
        <th className="pl-5 text-left">
          <p className="text-base font-medium leading-none text-gray-700">Marca</p>
        </th>
        <th className="pl-5 text-left">
          <p className="text-base font-medium leading-none text-gray-700">Color</p>
        </th>
        <th className="pl-5 text-left">
          <p className="text-base font-medium leading-none text-gray-700">Tamaño</p>
        </th>
        <th className="pl-48 text-left">
          <p className="text-base font-medium leading-none text-gray-700">Acciones</p>
        </th>
      </tr>
    </thead>
    {/* Cuerpo de la tabla */}
    <tbody>
      {productos.map((producto) => (
        <tr key={producto.id} className="focus:outline-none h-16 border border-gray-100 rounded">
          <td className="pl-5">
            <div className="flex items-center">
              <p className="text-base font-medium leading-none text-gray-700 mr-2">{producto.producto}</p>
            </div>
          </td>
          <td className="pl-24">
            <div className="flex items-center">
              <p className="text-sm leading-none text-gray-600 ml-2">{producto.cantidad}</p>
            </div>
          </td>
          <td className="pl-5">
            <div className="flex items-center">
              <p className="text-sm leading-none text-gray-600 ml-2">{producto.marca}</p>
            </div>
          </td>
          <td className="pl-5">
            <div className="flex items-center">
              <p className="text-sm leading-none text-gray-600 ml-2">{producto.color}</p>
            </div>
          </td>
          <td className="pl-5">
            <div className="flex items-center">
              <p className="text-sm leading-none text-gray-600 ml-2">{producto.tamaño}</p> {/* Se muestra tamaño */}
            </div>
          </td>
          <td className="pl-5">
  <div className="relative px-5 pt-2 flex items-center">
    {/* Botón dinámico según la cantidad */}
    {producto.cantidad < 15 ? (
      <button 
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2">
        Comprar más
      </button>
    ) : (
      <button 
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2">
        Suficientes
      </button>
    )}

    <button 
      onClick={() => handleUpdate(producto.id)} 
      className="focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
    >
      <FaPencilAlt className="inline mr-2" size={20} /> Editar
    </button>

    <button 
      onClick={() => handleDelete(producto.id)} 
      className="focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
    >
      <FaTrashAlt className="inline mr-2" size={20} /> Eliminar
    </button>
  </div>
</td>

        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  </div>
  <style dangerouslySetInnerHTML={{ __html: ".checkbox:checked + .check-icon { display: flex; }" }} />
</div>

    
//     <div>
      
//       <div>
//   <div className="sm:px-6 w-full">
//     {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
//     <div className="px-4 md:px-10 py-4 md:py-7">
//       <div className="flex items-center justify-between">
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//       <img src={logo} alt="Logo Glow" height={50} width={50} />
//       <p tabIndex={0} className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800" style={{ marginLeft: '10px' }}>Inventario</p>
//       </div>
//         <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
//           <p>Buscar por:</p>
//           <select aria-label="select" className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
//             <option className="text-sm text-indigo-800">Latest</option>
//             <option className="text-sm text-indigo-800">Oldest</option>
//             <option className="text-sm text-indigo-800">Latest</option>
//           </select>
//         </div>
//       </div>
//     </div>
//     <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
//       <div className="sm:flex items-center justify-between">
//         <div className="flex items-center">
//         <a className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-purple-800" href="/inicio">
//             <div className="py-2 px-8 bg-indigo-100 text-purple-700 rounded-full">
//               <p>Inicio</p>
//             </div>
//           </a>
//         </div>
//         <div>
//       <button 
//         onClick={() => popuphandler(true)} 
//         className="focus:ring-2 focus:ring-offset-2 from-purple-400 to-purple-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-purple-700 hover:bg-purple-600 focus:outline-none rounded"
//       >
//         <p className="text-sm font-medium leading-none text-white">Añadir Producto</p>
//       </button>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
//         <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
//           <form onSubmit={handleSubmit}>
//             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//               <div className="sm:flex sm:items-start">
//                 <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">Añadir Producto</h3>
//                   <div className="mt-2">
//                     <div className="mb-4">
//                       <label htmlFor="field1" className="block text-sm font-medium text-gray-700">Producto</label>
//                       <input 
//                         type="text" 
//                         id="field1" 
//                         name="field1" 
//                         value={formData.field1} 
//                         onChange={handleChange} 
//                         className="mt-1 block w-full shadow-sm xl:text-3xl border-gray-300 rounded-md" 
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="field2" className="block text-sm font-medium text-gray-700">Color</label>
//                       <input 
//                         type="text" 
//                         id="field2" 
//                         name="field2" 
//                         value={formData.field2} 
//                         onChange={handleChange} 
//                         className="mt-1 block w-full shadow-sm xl:text-3xl border-gray-300 rounded-md" 
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="field3" className="block text-sm font-medium text-gray-700">Cantidad</label>
//                       <input 
//                         type="number" 
//                         id="field3" 
//                         name="field3" 
//                         value={formData.field3} 
//                         onChange={handleChange} 
//                         className="mt-1 block w-full shadow-sm xl:text-3xl border-gray-300 rounded-md" 
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="field4" className="block text-sm font-medium text-gray-700">Marca</label>
//                       <input 
//                         type="text" 
//                         id="field4" 
//                         name="field4" 
//                         value={formData.field4} 
//                         onChange={handleChange} 
//                         className="mt-1 block w-full shadow-sm xl:text-3xl border-gray-300 rounded-md" 
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="field5" className="block text-sm font-medium text-gray-700 ">Tamaño</label>
//                       <input 
//                         type="text" 
//                         id="field5" 
//                         name="field5" 
//                         value={formData.field5} 
//                         onChange={handleChange} 
//                         className="mt-1 block w-full shadow-sm xl:text-3xl  border-red-600 rounded-md" 
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//               <button 
//                 type="button" 
//                 onClick={() => popuphandler(false)} 
//                 className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//               >
//                 Cancelar
//               </button>
//               <button 
//                 type="submit" 
//                 className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
//               >
//                 Guardar
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       )}
//     </div>
  
//       </div>
//       <div className="mt-7 overflow-x-auto">
//         <table className="w-full whitespace-nowrap">
//           <tbody>
//             <tr tabIndex={0} className="focus:outline-none h-16 border border-gray-100 rounded">
//               <td>
//               </td>
//               <td className>
//                 <div className="flex items-center pl-5">
//                   <p className="text-base font-medium leading-none text-gray-700 mr-2">Producto</p>
//                 </div>
//               </td>
//               <td className="pl-24">
//                 <div className="flex items-center">
//                   <p className="text-sm leading-none text-gray-600 ml-2">Color</p>
//                 </div>
//               </td>
//               <td className="pl-5">
//                 <div className="flex items-center">
//                   <p className="text-sm leading-none text-gray-600 ml-2">Cantidad</p>
//                 </div>
//               </td>
//               <td className="pl-5">
//                 <div className="flex items-center">
//                   <p className="text-sm leading-none text-gray-600 ml-2">Marca</p>
//                 </div>
//               </td>
//               <td className="pl-5">
//                 <div className="flex items-center">
//                   <p className="text-sm leading-none text-gray-600 ml-2">Tamaño</p>
//                 </div>
//               </td>
              
//             </tr>
//             <tr className="h-3" />
//             <tr tabIndex={0} className="focus:outline-none  h-16 border border-gray-100 rounded">
//             <td>
//               </td>
//               <td className>
//                 <div className="flex items-center pl-5">
//                   <p className="text-base font-medium leading-none text-gray-700 mr-2">Globos</p>
//                 </div>
//               </td>
//               <td className="pl-24">
//                 <div className="flex items-center">
//                   <p className="text-sm leading-none text-gray-600 ml-2">Azul</p>
//                 </div>
//               </td>
//               <td className="pl-5">
//                 <div className="flex items-center">
//                   <p className="text-sm leading-none text-gray-600 ml-2">20</p>
//                 </div>
//               </td>
//               <td className="pl-5">
//                 <div className="flex items-center">
//                   <p className="text-sm leading-none text-gray-600 ml-2">Marca Payaso</p>
//                 </div>
//               </td>
//               <td className="pl-5">
//                 <div className="flex items-center">
//                   <p className="text-sm leading-none text-gray-600 ml-2">Tamaño 12</p>
//                 </div>
//               </td>
//               <td className="pl-5">
//                 <button className="py-3 px-3 text-sm focus:outline-none leading-none text-green-700 bg-green-100 rounded">Suficientes</button>
//               </td>
//               <td className="pl-4">
              
//               </td>
//               <td>
//                 <div className="relative px-5 pt-2">
//                 <button 
//                 className="focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
//                   <FaPencilAlt className="inline mr-2" size={20} />
//                   </button>

//                   <button 
//                 className="focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
//               <FaBook className="inline mr-2" size={20} />
//                 </button>
//                   <button 
//                 className="focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
//                   <FaTrashAlt  className="inline mr-2" size={20} />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//             <tr className="h-3" />
//             <tr tabIndex={0} className="focus:outline-none focus:text-indigo-600 h-16 border border-gray-100 rounded">
//             <td>
//               </td>
//               <td className>
//                 <div className="flex items-center pl-5">
//                   <p className="text-base font-medium leading-none text-gray-700 mr-2">Globos</p>
//                 </div>
//               </td>
//               <td className="pl-24">
//                 <div className="flex items-center">
//                   <p className="text-sm leading-none text-gray-600 ml-2">Azul</p>
//                 </div>
//               </td>
//               <td className="pl-5">
//                 <div className="flex items-center">
//                   <p className="text-sm leading-none text-gray-600 ml-2">20</p>
//                 </div>
//               </td>
//               <td className="pl-5">
//                 <div className="flex items-center">
//                   <p className="text-sm leading-none text-gray-600 ml-2">Marca Payaso</p>
//                 </div>
//               </td>
//               <td className="pl-5">
//                 <div className="flex items-center">
//                   <p className="text-sm leading-none text-gray-600 ml-2">Tamaño 12</p>
//                 </div>
//               </td>
//               <td className="pl-5">
//                 <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">Comprar mas</button>
//               </td>
//               <td className="pl-4">
              
//               </td>
//               <td>
//                 <div className="relative px-5 pt-2">
//                 <button 
//                 className="focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
//                   <FaPencilAlt className="inline mr-2" size={20} />
//                   </button>

//                   <button 
//                 className="focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
//               <FaBook className="inline mr-2" size={20} />
//                 </button>
//                   <button 
//                 className="focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
//                   <FaTrashAlt  className="inline mr-2" size={20} />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
//   <style dangerouslySetInnerHTML={{__html: ".checkbox:checked + .check-icon {\n  display: flex;\n}\n" }} />
// </div>


//     </div>
  )
}

export default Inventario
