import { useState } from 'react'
import listLogo from './assets/list-svgrepo-com.svg'

import './App.css'

function App() {
  const [hobi, setHobi] = useState('');
  const [todos, setTodos] = useState([]); 
  const [updateTodo, setUpdateTodo] = useState({});
  const [msg, setMsg] = useState("");

  const styleEror = {  border:' 1px solid rgba(250, 0, 0, 0.747)', boxShadow : '1px 1px 2px rgba(250, 0, 0, 0.4)' }
  const styleBener = {   border: '1px solid rgb(17, 59, 243)' }


  function generateId(){
    return Date.now();
  }

  function saveTodoHobi(event){
    event.preventDefault();

    if (!hobi) {
      return setMsg("Data Todo Tidak tersedia");
    }

    if(updateTodo.id){
      const newTodos = {
        ...updateTodo,
        hobi: hobi
      }

      const findIndexTodo = todos.findIndex((todo) => todo.id === newTodos.id)
     
      const cloneTodos = [...todos];

      cloneTodos[findIndexTodo] = newTodos
      setTodos(cloneTodos);
      setMsg("")
      
     
      return batalEditHandler()
    }

    setTodos([...todos, {
      id: generateId(),
      hobi:hobi,
      done: false
    }]);
    // console.log(todos);
    setHobi("")
    setMsg('')
  }

  function editTodo(todo){
    setHobi(todo.hobi)
    setUpdateTodo(todo)
// console.log(todo)

  }

  function removeTodo(id){
    
    const filterTodo = todos.filter((todo) => todo.id != id);
    // console.log(filterTodo)
    if( confirm('apakah yakin ingin di hapus?', ) == true){
      setTodos(filterTodo)
      if(updateTodo.id) batalEditHandler();
    }
    
  }

  function batalEditHandler(){
    setUpdateTodo('')
    setHobi('')
  }

  function checkedHandler(todo){
    const newTodo = {
      ...todo, 
      done: todo.done ? false : true
    }

    const findIndexTodo = todos.findIndex((todo) => todo.id === newTodo.id)
     
      const cloneTodos = [...todos];

      cloneTodos[findIndexTodo] = newTodo
      setTodos(cloneTodos);
      setMsg("")

      // console.log(cloneTodos);

      setTodos(cloneTodos);
      // console.log(todos)
      
     
      // return batalEditHandler()
  }




  return (
    <div className='container'>
      <div className="header">
        <h2 className='header-1'> <img src={listLogo} alt="icon-list" className='gambar-list' /> Todo List App</h2>
      </div>

      <hr style={{ width:'90%',margin: '10px auto' }} />
    
    <section className='main'>
      <form action="" className='form-input' onSubmit={saveTodoHobi}>
        <input style={msg ? styleEror : styleBener} type="text" placeholder='Masukan Hobbi Kamu....' value={hobi} onChange={function(event){
          setHobi(event.target.value)
        }}/>
        

        <button type='submit' className='btn-add'>{!updateTodo.id ? 'Tambah' : 'Edit'}</button>
      </form>
      {msg && <p className='msg-error'>Data tidak boleh kosong</p>}
      
    </section>
    <hr style={{ width:'90%',margin: '10px auto' }}/>

    <section className='list-todos'>
      <ul className='card-todo'>

        
        {todos.map(function(todo){
          return <li key={todo.id}> 
          <div className='checkbox-todo'>
          <input
                type="checkbox"
                checked={todo.done}
                onChange={checkedHandler.bind(this, todo)}
              />
          <span className= {!todo.done ? 'text-list-hobi' : 'text-list-done' }> {todo.hobi} </span>  
          </div>
          
           <div className='btn-group'>

            {updateTodo.id && updateTodo.id == todo.id ? 
             <button className='btn-batal-edit' onClick={batalEditHandler}>Batal</button>  
             :
             <button className='btn-edit' onClick={editTodo.bind(this, todo)}>Edit</button>  

            }
             <button className='btn-hapus' onClick={removeTodo.bind(this, todo.id)}>Hapus</button>  
            </div>      
          </li>
        })}
      </ul>
    </section>

    <section className='footer'>
      <p> Ilham Maulana | Copyright 2023</p>
    </section>
    </div>
  )
}

export default App
