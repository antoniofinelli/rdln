import Navbar from './components/navbar'
import Additemform from './addItemForm/additemform'
import Itemviewer from './components/itemviewer'

export default function Seller(props) {
    return (
        <div>
            <Navbar/>
            <h1>Seller Page</h1>
            <Additemform />
            <Itemviewer private = {true}/>
        </div>

    )
  }