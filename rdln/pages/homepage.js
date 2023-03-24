import Itemviewer from './components/itemviewer'
import Navbar from './components/navbar'

export default function Homepage() {
    return (
      <div>
        <Navbar />
        <h1 className='mx-5 mt-5 border-b border-black'>Items For Sale:</h1>
        <Itemviewer private = {false}/>
      </div>
    )
  }
  