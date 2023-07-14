import logo from "./logo.svg";
import { useState, useEffect, useCallback} from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phone, setPhone] = useState();
  const [selectedGender, setSelectedGender] = useState("male");
  const genderOptions = ["male", "female", "other"];
  const [password, setPassword] = useState("");

  const validateForm = () => {
      validateEmail(email);
      validatePassword(password);
      validatePhone(phone);
  };

  const validateEmail = (email) => {
    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let res = emailRegex.test(email);
    console.log("res", res);
    setEmailError(!res? "enter a valid email": "");
  };

  const validatePhone = (phone) => {
    if (typeof phone !== "number") {
      setPhoneError("not a number");
    }
    if (`${phone}`.split("").length !== 10) {
      setPhoneError("phone number should be 10 digits");
    } else {
      setPhoneError("");
    }
  };

  const validatePassword = (pword) => {
    // if(pword.length < 6){
    //     setPasswordError("password be atleast 6 digits");
    // }
    let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    let res = passwordRegex.test(pword);
    if (!res) {
      setPasswordError(
        "password should have 1 upper case, 1 lower case, 1 number, 1 special characte"
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="container">
      <input
        className="email inputField"
        type="text"
        id="email"
        placeholder="Email"
        value={email}
        onBlur={() => validateEmail(email)}
        onChange={(e) => {
          setEmail(e.target.value);
          if(emailError){
          validateEmail(e.target.value);
        }}}
        style={{borderColor: emailError? "red": "#000"}}
      />
      <label className="redlabel" htmlFor="email">{emailError}</label>
      <br />
      <input
        type="number"
        placeholder="Phone"
        className="phone inputField"
        value={phone}
        id="phone"
        onBlur={() => validatePhone(phone)}
        onChange={(e) => {
          setPhone(e.target.value);
          if(phoneError){

          validatePhone(e.target.value);
        }}}
        style={{borderColor: phoneError? "red": "#000"}}

      />
      <label className="redlabel" htmlFor="phone">
        {phoneError}
      </label>
      <br />
      <select
        value={selectedGender}
        style={{borderColor: "#000"}}
        className="gender inputField"
        onChange={(e) => setSelectedGender(e.target.value)}
      >
        {genderOptions.map((gender) => (
          <option value={gender}>{gender}</option>
        ))}
      </select>
      <input
        type="password"
        placeholder="Password"
        className="password inputField"
        value={password}
        style={{borderColor: passwordError? "red": "#000"}}

        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => validatePassword(password)}
        onChange={(e) => {

          setPassword(e.target.value);
          console.log("password", e.target.value);
          if(passwordError){

          validatePassword(e.target.value);
        }}}
      />
      <label className="redlabel" htmlFor="password">{passwordError}</label>
      <br />

      <button onClick={() => validateForm()}>Submit</button>
    </div>
  );
}

export default App;
