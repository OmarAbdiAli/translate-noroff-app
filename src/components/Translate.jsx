import React from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { apiPostTranslationsRequest } from "../api/Index";
import { getAuth, setSessionTranslations } from "../storage/Session";

export default function Translate() {
  const [value, setValue] = useState('');
  const [imageSequence, setImageSequence] = useState([]);
  const auth = getAuth();
  if (!auth) { return <Navigate to="/Login" />; }

  const handleChange = (event) => {
    const regExp = /[^A-Za-z\s]/g;
    setValue(event.target.value.replaceAll(regExp, "")); // Trim input from invalid characters
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const regExp = /[^A-Za-z]/g;
    const input = value.replaceAll(regExp, "");
    if(input < 1) {
      alert('Please enter a word before submitting.');
      return;
    }

    const tempArray = [];
    for (let index = 0; index < input.length; index++) {
      tempArray.push(input[index]);
    }

    setImageSequence(tempArray);
    apiPostTranslationsRequest(getAuth().id, input, tempArray);
    setSessionTranslations(input, tempArray);
  }

  return (
    <div className="page translate">
      <form onSubmit={handleSubmit}>
        <label>English</label>
        <input value={value} onChange={handleChange} placeholder="Hello..." />
        <label>American Sign-Language</label>
        <div>
          {imageSequence.map((char, index) => {
            return <img
              src={`American_SignLanguage_A-Z/${char.toUpperCase()}.png`}
              alt={char.toUpperCase()}
              key={index}
              className="sign-language"
            />
          })}
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
