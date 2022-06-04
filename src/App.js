import axios from "axios";
import { createContext, useState } from "react";
import { Category } from "./components/Category";
import { LoginHeader } from "./components/LoginHeader";

export const AccessTokenContext = createContext("");

function App() {
  const [memoData, setMemoData] = useState();
  const [token, setToken] = useState();
  const [memoContent, setMemoContent] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await axios
  //       .get(`${process.env.REACT_APP_ENDPOINT}/category`, {
  //         headers: {
  //           "X-ACCESS-TOKEN": "91e98584-35cf-41ac-9a7e-01d4be32fdfa",
  //         },
  //       })
  //       .then((res) => setMemoData(res.data))
  //       .catch(() => {
  //         throw new Error("can not fetch data");
  //       });
  //   };
  //   fetchData();
  // }, []);
  // console.log("memo", memoData);

  const uuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
      .split("")
      .map((c) => {
        switch (c) {
          case "x":
            return ((Math.random() * 16) | 0).toString(16);
          case "y":
            return (((Math.random() * 4) | 0) + 8).toString(16);
          default:
            return c;
        }
      })
      .join("");
  };

  // "91e98584-35cf-41ac-9a7e-01d4be32fdfa"
  let accessToken;

  const onSubmit = async (values) => {
    const { access_token } = values;
    setToken(access_token);
    await axios
      .get(`${process.env.REACT_APP_ENDPOINT}/category`, {
        headers: {
          "X-ACCESS-TOKEN": access_token,
        },
      })
      .then((res) => setMemoData(res.data))
      .catch(() => {
        throw new Error("can not fetch data");
      });
  };
  console.log("memo detail", memoContent);

  return (
    <AccessTokenContext.Provider value={accessToken}>
      <LoginHeader onSubmit={onSubmit} />
      <Category data={memoData} token={token} setMemoContent={setMemoContent} />
    </AccessTokenContext.Provider>
  );
}

export default App;
