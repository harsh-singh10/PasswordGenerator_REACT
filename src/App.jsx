import { useCallback, useEffect, useState,useRef } from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numberAllow,setnumberAllow] = useState(false);
  const [charAllow , setcharAllow ] = useState(false);
  const [ password , setpassword  ] = useState("")
  
  const passwordGenerator = useCallback( ()=>{

    let pass ="";
    let str ="QWERTYUIOPLKJHGFDSAZXCVBNMmnbvcxzasdfghjklpoiuytrewq";
    if(numberAllow) str += "1234567890";
    if(charAllow) str += "!@#$%^&*(){}";

    for (let i = 0; i < length; i++) {
      let char =Math.floor( Math.random() * str.length + 1)

      pass += str.charAt(char)
      
    }
    setpassword(pass)

  } , [length, numberAllow, charAllow,setpassword] ) 

const passRef = useRef(null);

const copytoclip = useCallback(()=>{
  passRef.current?.select()
  window.navigator.clipboard.writeText(password)
} , [password])

  useEffect(()=>{ passwordGenerator() } , [length,numberAllow,charAllow,passwordGenerator])

  return (
    <>
    <div className=' w-full max-w-md  mx-auto shadow-md rounded-lg  px-4 py-3 mx-3 bg-gray-700  text-orange-500' >
    <h2 className=' text-center  text-4xl  text-white mb-4'> 
    Password Generator</h2>
    <div className=' flex shadow  rounded-lg overflow-hidden  mb-4'>
      <input type="text" 
      value={password}
      className=' outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref={passRef}
      /> 

      <button onClick={ copytoclip } className='flex items-center gap-x-1 bg-yellow-400 text-black p-3'>Copy</button>

    </div>

    <div className='flex text-sn  gap-x-2'>

      <div className='flex items-center gap-x-1' >
        <input 
        type="range" 
        min={6}
        max={50}
        value={length}
        className=' cursor-pointer'
        onChange={(e)=>{setlength(e.target.value)}}
        />
        <label> length: {length} </label>

      </div>

      <div className=' flex items-center gap-x-1'>
        <input type="checkbox"
          defaultChecked={numberAllow}
          id='numberInput'
          onChange={() =>{
            setnumberAllow((prev) => !prev)
          }}
        />
        <label htmlFor="numverInput">Number</label>
      </div>
      <div className=' flex items-center gap-x-1'>
        <input type="checkbox"
          defaultChecked={charAllow}
          id='charInput'
          onChange={() =>{
            setcharAllow((prev) => !prev)
          }}
        />
        <label htmlFor="charInput">Character</label>
      </div>

    </div>

    </div>


    </>
  )
}

export default App
