"use client"
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export default function Password() {
  const [password,setPassword] = useState("generating ...")
  const [length,setlength] = useState(8)
  const [number,setnumber] = useState(false)
  const [char,setChar] = useState(false)

  function lengthchange(e: ChangeEvent<HTMLInputElement>) {
    const newLength = parseInt(e.target.value, 10);
    setlength(newLength);
  }
  function copyToClipboard() {
    navigator.clipboard.writeText(password).then(function() {
       alert('Copying to clipboard was successful!');
    }, function(err) {
       console.error('Could not copy text: ', err);
    });
   }
   
  useEffect(()=>{
    let alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    let characters = alpha;
    if (number){
      characters +="1234567890"
    }
    if(char){
      characters += "!@#$%^&*()";
    }
    for (let index = 0; index < length; index++) {
        let random = Math.floor(Math.random() * characters.length);
         password += characters.charAt(random)
    }
    setPassword(password)
  },[length,number,char,setPassword])

  return (
      <div className="w-1/2 h-screen mx-auto bg-black overflow-hidden">
          <div className="w-1/2 h-1/2 flex flex-col bg-white m-auto mt-[25%] p-4 rounded-lg shadow-md">
              <div className="mb-4">
                  <label htmlFor="password" className="text-gray-700 font-semibold">
                      Password
                  </label>
                  <input
                      type="text"
                      placeholder="Enter password"
                      value={password}
                      className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <button onClick={copyToClipboard} className="w-auto px-4 py-2 mt-2 rounded-md bg-blue-800 text-white hover:bg-blue-700 focus:outline-none">
                      Copy
                  </button>
              </div>
              <div className="flex flex-col space-x-4">
                  <input
                      type="range"
                      placeholder="length"
                      maxLength={100}
                      value={length}
                      onChange={lengthchange}
                      className=" border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <label htmlFor="length" className="text-gray-700 font-semibold">
                      Length {length}
                  </label>
                  <div className="flex items-center space-x-2">
                      <input type="checkbox" onClick={()=>{setnumber(!number)}} name="number" id="number" className="form-checkbox" />
                      <label htmlFor="number" className="text-gray-700">
                          Include Numbers
                      </label>
                  </div>
                  <div className="flex items-center space-x-2">
                      <input type="checkbox" onClick={()=>{setChar(!char)}} name="char" id="char" className="form-checkbox" />
                      <label htmlFor="char" className="text-gray-700">
                          Include Special Characters
                      </label>
                  </div>
              </div>
          </div>
         
      </div>
  );
}
