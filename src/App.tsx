//import { useState } from 'react'
import {Rootlayout}  from './layouts/rootLayout'
import {listUsers} from './data/index'
function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    <Rootlayout users={listUsers}>

    </Rootlayout>
    </>
  )
}

export default App
