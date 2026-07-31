
import { useState } from 'react'
import './App.css'
import penIcon from "./assets/vector.svg"
import trashIcon from "./assets/vectorcc.svg"

function App() {
  //States
  const [tasklist, SetTasklist] = useState([
    { id: 1, description: "Revisar HTML" },
    { id: 2, description: "Revisar CSS" },
    { id: 3, description: "Revisar Reactjs" },
    { id: 5, description: "Revisar React Native" },
    { id: 6, description: "Revisar React Native" },
    { id: 6, description: "Revisar React Native" },
    { id: 6, description: "Revisar React Native" },
    
  ])
  //Effects
  //funções

  return (
    <>
      <header className='header-section'>

        <h1 className='header-section__title'>
          React List
        </h1>
      </header>
      <main className='body-section'>

        <form className='cad-task'>
          <input
            className='card-task__entry'
            type="text"
            placeholder='adicione uma tarefa' />
          <button className='car-task__btn-confirm' >Adicionar</button>
        </form>

        <section className='cardlist'>

          {
            tasklist.map((t) => {
              return (
                <article className='cardtask' key={t.id}>

                  <p className='cardtask__task-text'>{t.description}</p>
                  <div className='cardtask__icon-box'>
                    <div className='cardlist__icon'>
                      <img src={penIcon}
                        className='cardList__edit-icon' alt="" />
                    </div>
                    <div className='cardlist__icon'>
                      <img src={trashIcon} className='cardList__delet-icon' alt="" />
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
  )
}

export default App
