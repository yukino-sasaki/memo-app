import { Box, Divider, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Category } from "./components/Category";
import { Detail } from "./components/Detail";
import { LoginHeader } from "./components/LoginHeader";

function App() {
  const [memoData, setMemoData] = useState();
  const [token, setToken] = useState();
  const [memoContent, setMemoContent] = useState();
  const [categories, setCategories] = useState();

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
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <>
      <LoginHeader onSubmit={onSubmit} />
      <Flex justifyContent={"space-between"}>
        <Category
          data={memoData}
          token={token}
          setMemoContent={setMemoContent}
          categories={categories}
          setCategories={setCategories}
        />
        <Box h="full">
          <Divider orientation="vertical" />
        </Box>
        <Detail
          setMemoContent={setMemoContent}
          token={token}
          memoContent={memoContent}
          categories={categories}
          setCategories={setCategories}
        />
      </Flex>
    </>
  );
}

export default App;
