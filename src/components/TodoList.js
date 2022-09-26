import React, { useEffect, useState } from 'react'

const getLocalData = () =>{
  const list = localStorage.getItem("CrudOperation")
  if (list){
    return JSON.parse(list)
  }
  else{
    return []
  }
}

export default function TodoList() {

  const [input, setInput ] = useState("")
  const [items, setItems ] = useState(getLocalData())
  const [isEditItem, setIsEditItem ] = useState("")
  const [toggleButton, setToggleButton ] = useState(false)

  const addItems = () =>{
    if(!input ){
      alert("Please fill the input")
    }
    else if ( input && toggleButton ) {
      setItems(
        items.map((element)=>{ 
          if (element.id == isEditItem) { 
            return {...element, name:input }
          }
          return element
        })
      )
      setInput("")
      setIsEditItem(null)
      setToggleButton(false)
    }
    else{
      const newInputData = {
        id: new Date().getTime().toString(),
        name: input,
      }
      setItems([...items, newInputData ])
      setInput("")
    }
  }

  const deleteItems = (index) =>{
    const updateItems = items.filter((element)=>{
      return element.id !== index
    })
    setItems(updateItems)
  }

  const editItems = (index) =>{
    const editItemId = items.find((element)=>{
      return element.id == index
    })
    setInput(editItemId.name)
    setIsEditItem(index)
    setToggleButton(true)
  }

  useEffect(() =>{
    localStorage.setItem("CrudOperation", JSON.stringify(items) )
  }, [items] )

  





  return (
    <> 
    
    <div className="section">
      <div className="body mt-10 text-center">
        
        <input type="text"
         placeholder='Enter Text' 
          
         value={input} 
         onChange={(event) => setInput(event.target.value) } 
         className=" py-2 px-12 border-2 border-blue border-solid" 
        />
        {
          toggleButton ? (<button className="bg-blue-600 py-2 px-8 text-white ml-2" 
          onClick={addItems} >UPDATE</button> ) :
           (<button className="bg-blue-600 py-2 px-8 text-white ml-2" 
           onClick={addItems} >CREATE</button> )
        }
        
       
      
      </div>

      <div className="showitems  mt-[80px] ">
        
          {
            items.map((e) =>{
              return(
                <div className="eachitem  w-[400px] mt-5 flex justify-around" key={e.id} > 
                <h3>{e.name} </h3>
                <div className="btns ">
                  <button onClick={() => editItems(e.id) }
                   className="bg-blue-600 py-2 px-8 text-white "  >UPDATE</button>
                  <button onClick={() => deleteItems(e.id)}
                   className="bg-blue-600 py-2 px-8 text-white ml-6" 
                  >Delete</button>
                </div>
              </div>
              )
            })
          }
            
             
            
          
        
      </div>

    </div>
    
    
    
    
    
    </>
  )
}
