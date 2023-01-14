import React, {useState, useEffect} from "react";



//create your first component
const Home = () => {

	
	const [tarea,setTarea] = useState("");
	const [list,setList] = useState([]);


	/*const listItems = list.map((item) =>
	<li key={item.toString()}>
	{item}
  </li>
	);*/

	const DeleteItems = (indexItem) => {
		setList((prevState) =>
		  prevState.filter((listItems, index) => index !== indexItem)
		);
	  };

	function enviarDatos(e) {
		e.preventDefault()
		setList([...list, tarea]);
		setTarea("")
	}
	console.log(list);

	function crearUsuario(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/svuf`,{method: 'POST', headers: {
			'Content-Type': 'application/json'},
			body: JSON.stringify([])
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(data))
	}

	function obtenerLista(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/svuf`,{method: 'GET', headers: {
			'Content-Type': 'application/json'}
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(data))
	}

	function actualizar(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/svuf`,{method: 'PUT', headers: {
			'Content-Type': 'application/json'},
			body: JSON.stringify([list])
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(data))
	}

	function borrarLista(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/svuf`,{method: 'DELETE', headers: {
			'Content-Type': 'application/json'}
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(data))
	}

	useEffect (()=>{
		crearUsuario();
		obtenerLista()
	},[])

	useEffect (()=>{
		actualizar()
	},[list.length])

	return (
		<>
		<div className="card container d-flex mt-3">
  			<div className="card-body">
  				<input type="text" className="input m-1 w-75" value={tarea} id="exampleInput" aria-describedby="inputHelp" onChange={(e)=>{setTarea(e.target.value)}} placeholder="No hay tareas, añadir tareas"/>
				<button type="submit" className="btn btn-primary btn-sm" onChange={(e)=>{setList(e.target.value)}} onClick={enviarDatos}>Agregar</button>
  			</div>
			<div className="to-do-list d-flex">
			  <ul>{list.map((item, index) => (
        <li key={index}>
          {item}
          <button className="btn" onClick={() => DeleteItems(index)}>
            <i className="fas fa-trash-alt" />
          </button>
        </li>
      ))}</ul>
			</div>
			<button type="submit" className="btn btn-danger btn-sm" onClick={borrarLista}>Delete list</button>
		</div>
		
		</>
	);
};

export default Home;
