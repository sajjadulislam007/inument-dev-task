import React, { useRef, useState, useEffect } from "react";
import useDeleteData from "../../Hooks/useDelete"; // Import the custom hook
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import Card from "../Card";
import CardContainer from "../CardContainer";
import Modal from "../Modal";
import Form from "../Form";
import ThankYou from "../ThankYou";

const Home = () => {
  const [showUserModal, setshowUserModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState(null);

  const [url, setUrl] = useState("http://localhost:3000/users");

  // useDelete State & Local Data
  const [localData, setLocalData] = useState(null); // Local state for your data
  const { deleteData, isLoading, error: deleteError } = useDeleteData();

  //form states
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const userModalPopupRef = useRef(null);

  const handleCloseUserModal = (e) => {
    if (userModalPopupRef.current && !userModalPopupRef.current.contains(e.target)) {
      setshowUserModal(false);
      setShowThankYou(false);
    }
  };

  useEffect(() => {
    // Fetch your initial data when the component mounts
    // Set it to the 'setLocalData' state
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(res.statusText);
        }
        const jsonData = await response.json();
        setIsLoadingData(false);
        setLocalData(jsonData);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err.name === "AbortError") {
          console.log("the fetch was aborted form home component");
        } else {
          isLoadingData(false);
          setError("Could not fetch the data");
        }
      }
    };

    fetchData();
  }, []);

  //handle deleting User Items
  const handleDelete = async (id) => {
    try {
      await deleteData(url, id); // Replace 'posts' with your resource
      // Update local state by filtering out the deleted item
      setLocalData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };

  const handleClearInputsData = () => {
    setFName("");
    setLName("");
    setEmail("");
    setPhone("");
    setRole("");
    setPassword("");
    setCPassword("");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseUserModal);
    return () => {
      document.removeEventListener("mousedown", handleCloseUserModal);
    };
  }, [handleCloseUserModal]);

  return (
    <div className="home">
      <div className="content-block">
        <div className="holder">
          <div className="title--block in-view" data-scroll="">
            <div className="title--block__title">
              <h2 className="section--title">User List</h2>
              {/* <small>{data && `There are total ${data.length} users`}</small> */}
              <small>{localData && `There are total ${localData.length} users`}</small>
            </div>
            {console.log("localData:", localData)}
            <div className="title--block__cta">
              <button
                className="primaryBtn"
                onClick={() => {
                  setshowUserModal(true);
                  handleClearInputsData();
                }}
              >
                <svg viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                New User
              </button>
            </div>
          </div>
          {showUserModal && (
            <Modal userModalPopupRef={userModalPopupRef}>
              <div className="modal--header">
                <h2 className="modal--header__title">{!showThankYou ? "Add New User" : "Thank You!"}</h2>
                <div
                  className="cross_sign"
                  onClick={() => {
                    setshowUserModal(false);
                    setShowThankYou(false);
                  }}
                >
                  <span className="bar bar1"></span>
                  <span className="bar bar2"></span>
                </div>
              </div>
              <div className="modal--content">
                {!showThankYou && showUserModal ? (
                  <Form
                    fname={fname}
                    lname={lname}
                    email={email}
                    phone={phone}
                    role={role}
                    password={password}
                    cPassword={cPassword}
                    setFName={setFName}
                    setLName={setLName}
                    setEmail={setEmail}
                    setPhone={setPhone}
                    setRole={setRole}
                    setPassword={setPassword}
                    setCPassword={setCPassword}
                    setShowThankYou={setShowThankYou}
                  />
                ) : (
                  <ThankYou setShowThankYou={setShowThankYou} setshowUserModal={setshowUserModal} />
                )}
              </div>
            </Modal>
          )}
          <CardContainer>
            {isLoadingData && <Loading />}
            {error && <ErrorMessage message={error} />}
            {localData &&
              localData.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  fname={item.fname}
                  lname={item.lname}
                  role={item.role}
                  mobile={item.mobile}
                  email={item.email}
                  password={item.password}
                  handleDelete={handleDelete}
                />
              ))}
          </CardContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
