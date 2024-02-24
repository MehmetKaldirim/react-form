import { useRef, useState } from "react";
export default function Login() {
  const [inputIsInvalid, setInputIsInvalid] = useState({
    email: false,
    password: false,
  });

  const email = useRef();
  const password = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    const emailIsInvalid = !enteredEmail.includes("@");
    const passwordIsInvalid = enteredPassword.length < 5;
    if (emailIsInvalid || passwordIsInvalid) {
      if (emailIsInvalid) {
        setInputIsInvalid((prev) => ({
          ...prev,
          email: true,
        }));
      }
      if (passwordIsInvalid) {
        setInputIsInvalid((prev) => ({ ...prev, password: true }));
      }
      return;
    }

    setInputIsInvalid({
      email: false,
      password: false,
    });

    console.log("Entered values: " + enteredEmail + " - " + enteredPassword);
    email.current.value = ""; //reset is not good in ref, we change the dom here so not recommended
    password.current.value = "";
    //event.target.reset(); //not work
  }

  return (
    <form>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
          <div className="control-error">
            {inputIsInvalid.email && <p>Please enter a valid email address</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
          <div className="control-error">
            {inputIsInvalid.password && (
              <p>Please enter at least 5 characters</p>
            )}
          </div>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button" onClick={handleSubmit}>
          Login
        </button>
      </p>
    </form>
  );
}
