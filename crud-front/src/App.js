import { useState } from 'react';
import './App.css';
import Table from './component/Table';
import Update from './component/Update';

function App() {
  const [ updateData, setUpdateData ] = useState();

  return (
    <div className="container">
      <Table/>
      {/* <Update/> */}
    </div>
  );
}

export default App;
