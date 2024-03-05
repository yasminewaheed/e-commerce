const { createContext, useState, useEffect } = require("react");

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [Usertoken, setUsertoken] = useState(null);
  const [login, setlogin] = useState(null);
  const [isopen, setisopen] = useState(false);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const localId = localStorage.getItem("id");
    if (localId) {
      setUserId(localId);
    }
  }, []);
  return (
    <UserContext.Provider
      value={{
        Usertoken,
        setUsertoken,
        login,
        setlogin,
        isopen,
        setisopen,
        userId,
        setUserId,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
