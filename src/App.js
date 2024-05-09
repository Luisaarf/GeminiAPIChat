import {useState} from 'react';
import './index.css';

function App() {
  const [valueInput, setValueInput] = useState('')
  const [error, setError] = useState('')
  const [chatHistory, setChatHistory] = useState([])

  const getResponse = async (message) => {
    if (!valueInput){
      setError('Please enter a message');
      return; 
    }
    try{

      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: valueInput
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch('http://localhost:8000/gemini', options);
      const data = await response.text();
      console.log('data:', data)
      setChatHistory( oldChatHistory => [...oldChatHistory, 
        {role: 'user', parts: [{text : valueInput} ] }, 
        {role: 'model', parts: [{text : data} ]} 
      ])
      setValueInput('')

    }catch(error){
      console.error('error:', error)
      setError('Something went wrong :( Please try again later.')
    }
  }

  const clear = () => {
    setValueInput('')
    setError('')
    setChatHistory([])
  }

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
        {!error && <button onClick={getResponse}>Send</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p className='error-message'>{error}</p>}
      <div className='search-result'>
        {chatHistory.map((chatItem, _index) => {
          {console.log('chatItem:', chatItem)
            console.log('chatItem.role:', chatItem.role)
            console.log('chatItem.parts[0].text:', chatItem.parts[0].text)
          }
          return (
          <div key={_index}>
            <p className='answer'>{chatItem.role} : {chatItem.parts[0].text}</p>
          </div> )
        })}
      </div>
    </div>
  );
}

export default App;
