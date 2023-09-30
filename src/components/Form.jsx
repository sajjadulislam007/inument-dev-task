//styles
import { useState, useEffect } from "react";
import Icons from "../icons";
import Input from "./Input";
import useFetch from "../Hooks/useFetch";

const Form = ({
  lname,
  setLName,
  fname,
  setFName,
  email,
  setEmail,
  phone,
  setPhone,
  role,
  setRole,
  password,
  setPassword,
  cPassword,
  setCPassword,
  setShowThankYou,
}) => {
  const [isValidFName, setIsValidFName] = useState(true);
  const [isValidLName, setIsValidLName] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidRole, setIsValidRole] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [url, setUrl] = useState("http://localhost:3000/users");
  const { postData, data, setData, isPanding, error } = useFetch(url, "POST");

  //functions
  //input changes
  const handleChange = (e) => {
    if (e.target.name === "fname") {
      const value = e.target.value;

      // Regular expression to match alphanumeric characters and hyphen
      const regex = /^[a-zA-Z0-9\-]*$/;

      // Check if the input matches the regex
      const isValidInput = regex.test(value);

      setFName(value);
      setIsValidFName(isValidInput);
    } else if (e.target.name === "lname") {
      const value = e.target.value;

      // Regular expression to match alphanumeric characters and hyphen
      const regex = /^[a-zA-Z0-9\-]*$/;

      // Check if the input matches the regex
      const isValidInput = regex.test(value);
      console.log("isValidInput", isValidInput);

      setLName(value);
      setIsValidLName(isValidInput);
    } else if (e.target.name === "email") {
      const value = e.target.value;

      // Regular expression to match a standard email format
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      // Check if the input matches the regex
      const isValidInput = regex.test(value);

      setEmail(value);
      setIsValidEmail(isValidInput);
    } else if (e.target.name === "phone") {
      const value = e.target.value;

      // Regular expression to match 11 or 13 digits, allowing only numbers and plus sign
      const regex = /^[0-9+]{11}$|^[0-9+]{13}$/;

      // Check if the input matches the regex
      const isValidInput = regex.test(value);

      setPhone(value);
      setIsValidPhone(isValidInput);
    } else if (e.target.name === "role") {
      const value = e.target.value;

      // Regular expression to match only letters (alphabetic characters)
      const letterRegex = /^[A-Za-z -]{0,50}$/;

      // Check if the input contains only letters
      const containsOnlyLetters = letterRegex.test(value);

      // Check if the input length is not more than 50 characters
      const isWithinLengthLimit = value.length <= 50;

      // Set the validity based on both conditions
      const isValidInput = containsOnlyLetters && isWithinLengthLimit;

      setRole(value);
      setIsValidRole(isValidInput);
    } else if (e.target.name === "password") {
      const value = e.target.value;
      setPassword(value);
      validatePassword(value, cPassword);
    } else if (e.target.name === "cpassword") {
      const value = e.target.value;
      setCPassword(value);
      validatePassword(password, value);
    }
  };

  const validatePassword = (pass, confirmPass) => {
    // Password validation regex
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    // Check if both passwords match and meet the criteria
    const isValidPassword = pass === confirmPass && passwordRegex.test(pass);

    setIsValidPassword(isValidPassword);
  };

  // Function to check if all validation criteria are met
  const isFormValid = () => {
    return (
      fname.trim() !== "" &&
      lname.trim() !== "" &&
      phone.trim() !== "" &&
      email.trim() !== "" &&
      role.trim() !== "" &&
      password.trim() !== "" &&
      isValidFName &&
      isValidLName &&
      isValidPhone &&
      isValidEmail &&
      isValidRole &&
      isValidPassword
    );
  };

  // Run isFormValid when the component mounts and whenever any input changes
  useEffect(() => {
    isFormValid(); // Call the function to perform initial validation
  }, [fname, lname, phone, email, role, password]);

  //submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      fname,
      lname,
      role,
      mobile: phone,
      email,
      password,
    };

    // Assuming formData holds the data you want to send
    const response = await postData(formData);

    if (!error) {
      console.log("Data successfully posted:", response);
    } else {
      console.error("Error posting data:", error);
    }

    setShowThankYou(true);
  };

  return (
    <div className="mainForm">
      <form onSubmit={handleSubmit}>
        <Input
          value={fname}
          type="text"
          name="fname"
          placeholder="Enter Your First Name"
          title={`${isValidFName ? "First Name" : "First name should only contain alpha numeric characters and hyphen (-)."} `}
          // title={`Full Name`}
          icon={Icons.circleUser}
          isValidateBool={isValidFName}
          action={handleChange}
        />
        <Input
          value={lname}
          type="text"
          name="lname"
          placeholder="Enter Your Last Name"
          title={`${isValidLName ? "Last Name" : "Last name should only contain alpha numeric characters and hyphen (-)."} `}
          // title={`Full Name`}
          icon={Icons.circleUser}
          isValidateBool={isValidLName}
          action={handleChange}
        />
        <Input
          value={role}
          type="text"
          name="role"
          placeholder="Enter User Role"
          title={`${isValidRole ? "User Role" : "User role only accepts letters and not more than 50m characters"}`}
          icon={Icons.circleUser}
          isValidateBool={isValidRole}
          action={handleChange}
        />
        <Input
          value={phone}
          type="text"
          name="phone"
          placeholder="Enter Mobile Number"
          title={`${isValidPhone ? "Mobile Number" : "For phone number 11 or 13 digits. Only numbers and plus (+) sign."} `}
          icon={Icons.phone}
          isValidateBool={isValidPhone}
          action={handleChange}
        />
        <Input
          value={email}
          type="email"
          name="email"
          placeholder="Enter Your Email"
          title={`${isValidEmail ? "Your Email" : "Please enter a valid email address"}`}
          icon={Icons.email}
          isValidateBool={isValidEmail}
          action={handleChange}
        />
        <Input
          value={password}
          type="password"
          name="password"
          placeholder="Enter Password"
          title={`${
            isValidPassword
              ? "Password"
              : "Passwords must match, have a minimum length of 6 characters, and contain at least one letter, one number, and one special character."
          }`}
          icon={Icons.lock}
          isValidateBool={isValidPassword}
          action={handleChange}
        />
        <Input
          value={cPassword}
          type="password"
          name="cpassword"
          placeholder="Confirm Your Password"
          title={`${
            isValidPassword
              ? "Confirm Password"
              : "Passwords must match, have a minimum length of 6 characters, and contain at least one letter, one number, and one special character."
          }`}
          icon={Icons.lock}
          isValidateBool={isValidPassword}
          action={handleChange}
        />

        <button className={`primaryBtn ${!isFormValid() ? "disabled" : ""}`} type="submit" onClick={handleSubmit} disabled={!isFormValid()}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
