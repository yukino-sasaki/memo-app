import { Divider, Flex } from "@chakra-ui/react";
import axios from "axios";
import { createContext, useState } from "react";
import { Category } from "./components/Category";
import { Detail } from "./components/Detail";
import { LoginHeader } from "./components/LoginHeader";

export const AccessTokenContext = createContext("");

function App() {
  const [memoData, setMemoData] = useState();
  const [token, setToken] = useState();
  const [memoContent, setMemoContent] = useState();
  const [categories, setCategories] = useState();

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

  return (
    <AccessTokenContext.Provider value={accessToken}>
      <LoginHeader onSubmit={onSubmit} />
      <Flex justifyContent={"space-between"}>
        <Category
          data={memoData}
          token={token}
          setMemoContent={setMemoContent}
          categories={categories}
          setCategories={setCategories}
        />
        <Divider orientation="vertical" h="full" />
        <Detail
          setMemoContent={setMemoContent}
          token={token}
          memoContent={memoContent}
          categories={categories}
          setCategories={setCategories}
        />
      </Flex>
    </AccessTokenContext.Provider>
  );
}

export default App;
