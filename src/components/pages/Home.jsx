import React, { useRef, useState, useEffect } from "react";
import Card from "../Card";
import CardContainer from "../CardContainer";
import Modal from "../Modal";
import Form from "../Form";
import ThankYou from "../ThankYou";
import useFetch from "../../Hooks/useFetch";

const Home = () => {
  const [showUserModal, setshowUserModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const [url, setUrl] = useState("http://localhost:3000/users");
  const { data, inPending, error } = useFetch(url);

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
    }
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
            <div className="title--block__title slide-up">
              <h2 className="section--title">Careers</h2>
            </div>

            <div className="title--block__cta slide-up">
              <button
                className="primaryBtn"
                onClick={() => {
                  setshowUserModal(true);
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
            {inPending && <Loading />}
            {error && <ErrorMessage />}
            {data &&
              data.map((item) => (
                <Card
                  key={item.id}
                  fname={item.fname}
                  lname={item.lname}
                  role={item.role}
                  mobile={item.mobile}
                  email={item.email}
                  password={item.password}
                />
              ))}
          </CardContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
