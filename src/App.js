import { useState } from "react";

function App() {

  const [calc, setCalc] = useState("");
  const [result, setResult]= useState("");

  const ops= ['/', '+', '*', '-', '.'];

  const updateCalc = (value) => {


    //can't add duplicator operators or operators without entrying a number
    if (
      ops.includes(value) && calc === '' ||
      ops.includes(value) && ops.includes(calc.slice(-1))
    ){
      return;
    }

    setCalc(calc + value);

    if(!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  }

  const createDigits = () => {
    const digits = [];

    for(let i =1; i<=9; i++){
      digits.push(
        <button onClick={()=> updateCalc(i.toString())} key={i}>{i}</button>
      )
    }

    return digits;
  }

  const calculate = () => {
    setCalc(eval(calc).toString());
  }

  const deleteLast = () => {

    //if there is nothing to delete, return
    if( calc === ''){
      return;
    }

    

    //removes the last value that was entered
    const value = calc.slice(0,-1);

    if (ops.includes(value.slice(-1))) {
      setResult(eval(value.toString().slice(0,-1)));  
    }
    else{
      setResult(eval(value.toString()));  
    }

    setCalc(value);
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ''} { calc || "0"}
        </div>

        <div className="operators">
          <button onClick={()=> updateCalc('/')}>/</button>
          <button onClick={()=> updateCalc('*')}>*</button>
          <button onClick={()=> updateCalc('-')}>-</button>
          <button onClick={()=> updateCalc('+')}>+</button>

          <button onClick={deleteLast}>DEL</button>
        </div> 

        <div className="digits">
          { createDigits() }
          <button onClick={()=> updateCalc('0')}>0</button>
          <button onClick={()=> updateCalc('.')}>.</button>

          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}



export default App;
