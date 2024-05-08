import {useState} from 'react';
import './index.css';

function App() {
  const [valueInput, setValueInput] = useState('')
  const [error, setError] = useState('')

  return (
    <div className="App">
        <p>Chat with me</p>
      <div className='input-container'>
        <input 
          value={valueInput}
          type='text' 
          placeholder='Hello there!' 
          onChange={(e) => setValueInput(e.target.value)}
        />
        {!error && <button>Send</button>}
        {error && <button>Clear</button>}
      </div>
      {error && <p className='error-message'>{error}</p>}
      <div className='search-result'>
        <div key={''}>
          <p className='answer'></p>

        </div>
      </div>
    </div>
  );
}

export default App;
