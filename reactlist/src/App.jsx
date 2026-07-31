
import { useEffect, useState } from 'react'
import './App.css'
import penIcon from "./assets/vector.svg"
import trashIcon from "./assets/vectorcc.svg"
import axios from 'axios';

function App() {
  //States
  const [tasklist, SetTasklist] = useState([])
  const [taskValue, SetTaskValue] = useState("")
  const[editMode, setEditMode]= useState(false)
  const[idToEdit, setIdToEdit]= useState(0)



  //funções
//crud- Post Get Put/Patch delete
//Get- buscar todas as tarefas 
const getTasks = async () =>{
try{
  const APIReturn = await axios.get("http://localhost:3000/taskpoint")
 const APIData =  await APIReturn.data
 // atualizar o state
 SetTasklist(APIData)
}catch(error){
  console.log(error);
}
};
//Get{id}-buscar uma tarefa por id
const getTaskById = (id) =>{
 alert(`função getTasksById em desenvolvimento ${id}`)
};
// Post- cadastrar uma tarefa
const postTask  = async (e) =>{
  e.preventDefault() //evitar/captora o evento
  //valida o state/fomulario
   if(taskValue.trim().length== 0){
    alert("preencher o campo valor");
    return false;
   }
   //passou pela validacao, vamos cadastrar
   try{
    const APIReturn = await axios.post("http://localhost:3000/taskpoint",{
      descricao : taskValue,
    });
    SetTaskValue("");//limpar o campo do formulario
    getTasks();
   }catch(error){
console.log(error);
alert("Error ao cadastro os dados");
   }
  };
//Put - atualoizar uma tarefa
const putTask = (item) =>{
setEditMode(true)
setIdToEdit(item.id)
  SetTaskValue(item.descricao)
   
};
const confirmPutTask =  async(e) =>{
  setEditMode(false)
  e.preventDefault()
  if(taskValue.trim().length ==0){
    alert("preencha o texto da tarefa")
    return false
  }

 try {
  const APIReturn = await axios.put(`http://localhost:3000/taskpoint/${idToEdit}`, {descricao: taskValue}
  );
  // limpa o formulário
  setIdToEdit(0);
  SetTaskValue("");
  getTasks();
  alert("A tarefa foi editada")
 } catch (error) {
  alert("errou ao editar")
  console.log(error);
 }
 
};
//Delete- apagar uma tarefa
const deleteTask = async (id) =>{
  // perguntar ao usuaripo se quer excluir?
  const querExcluir = confirm("Atenção: quer realmente excluir op registro?")
  if(!querExcluir) return false;
   try {
    const APIReturn = await axios.delete(`http://localhost:3000/taskpoint/${id}`)
    getTasks();
    alert("tarefa excuida com sucesso")
   } catch (error) {
    console.log(error);
    alert("erro ao  escluir");
   }
   
};

  //Effects e ciclo de vida do componente 
  //onMount - quando o componente for montado

  useEffect(() => {
    //carregar os dados quando o componente for montado !

    getTasks()
  }, []);
//jsx
  return (
    <>
      <header className='header-section'>

        <h1 className='header-section__title'>
          React List
        </h1>
      </header>
      <main className='body-section'>
{/*formulario do cadastro da tarefa - cadastra ou editar */}
        <form className='cad-task' onSubmit={editMode ? confirmPutTask : postTask}>
          <input
            className='card-task__entry'
            type="text"
            placeholder='adicione uma tarefa'
            //recebe o valor do state
            value={taskValue}
            onChange={(e) => {
              // atualiza o valor da statrg
              SetTaskValue(e.target.value)
            }} />
            <p>{taskValue}</p>
            <p>{editMode ? "true":"false"}</p>
          <button className='car-task__btn-confirm' >Adicionar</button>
          {editMode && (
          <button  
          className='car-task__btn-confirm'
          type='button'
          onClick={() => {
            SetTaskValue("")
            setIdToEdit(0)
            setEditMode(false)
          }}
           >
            Cancelar
            </button>
)}
        </form>

        <section className='cardlist'>

          {
            tasklist.map((t) => {
              return (
                <article className='cardtask' key={t.id}>

                  <p className='cardtask__task-text'>{t.descricao}</p>
                  <div className='cardtask__icon-box'>
                    <div className='cardlist__icon'>
                      <img src={penIcon}
                        className='cardList__edit-icon'
                         alt="imagem de um lápis. Função de editar a tarefa  "
                       onClick={() => {
                        //variavel "t" Eo Item/objtivo completo
                        putTask(t)
                        }}/>
                    </div>
                    <div className='cardlist__icon'>
                      <img 
                      src={trashIcon} 
                      className='cardList__delet-icon'
                       alt="imagem de um lápis. Função de excluir a tarefa  "
                       onClick={() => {
                        
                        deleteTask(t.id)
                       }} />
                    </div>
                  </div>

                </article>
              );
            })
          }


        </section>
      </main>
      <footer className='footer-list'>
        <p className='footer-list__right-text'>2026, React List - todos os direitos reservados</p>
      </footer>
    </>
  );
}

export default App
