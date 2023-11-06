"use client";

import React, { useState } from "react";

function Input(index: number, input: string, setInput: (value: string, index: number) => void) {
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value, index)}/>
    </div>
  );
}

export default function Test(){
    const [inputs, setInputs] = useState(new Array<string>());
    
    function Inputs() {
      function handleAdd() {
        const tempInputs = [...inputs];
        tempInputs.push("");
        setInputs(tempInputs);
      }
      function handleChange(value: string, index: number) {
        const tempInputs = [...inputs];
        tempInputs[index] = value;
        setInputs(tempInputs);
      }
    
      return (
        <div>
          <button onClick={handleAdd}>Add</button>
          <ul>
            {inputs.map((input, index) => Input(index, input, handleChange))}
          </ul>
        </div>
      );
    }

    return (
        <div>
            <Inputs/>
        </div>
    )

}
