import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { AiFillFolder, AiOutlineFileText } from "react-icons/ai";

export const Category = ({ data, token, setMemoContent }) => {
  const [categories, setCategories] = useState();
  const [selectedMemo, setSelectedMemo] = useState();

  const expandAccordion = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_ENDPOINT}/memo`, {
        params: {
          category_id: id,
        },
        headers: {
          "X-ACCESS-TOKEN": token,
        },
      })
      .then((res) => setCategories(res.data))
      .catch((error) => {
        throw new Error(error);
      });
  };
  console.log(categories);

  const getMemo = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_ENDPOINT}/memo/${id}`, {
        params: {
          id,
        },
        headers: {
          "X-ACCESS-TOKEN": token,
        },
      })
      .then((res) => setMemoContent(res.data))
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <Box w="30%">
      {data ? (
        <>
          <Accordion allowToggle>
            {data.map(({ id, name }, index) => {
              return (
                <AccordionItem key={index}>
                  <h2>
                    <AccordionButton
                      _expanded={{ color: "blue.300" }}
                      onClick={() => expandAccordion(id)}
                    >
                      <Flex w="100%" justifyContent={"space-between"}>
                        <Icon as={AiFillFolder} />
                        <Text textAlign="center">{name}</Text>
                        <AccordionIcon />
                      </Flex>
                    </AccordionButton>
                  </h2>
                  {categories &&
                    categories.map(({ title, id }, index) => {
                      return (
                        <AccordionPanel
                          pb={4}
                          key={index}
                          onClick={() => {
                            setSelectedMemo(id);
                            getMemo(id);
                          }}
                        >
                          <Flex
                            w="100%"
                            justifyContent={"space-between"}
                            color={selectedMemo === id ? "blue.300" : "gray"}
                          >
                            <Icon as={AiOutlineFileText} />
                            <Text textAlign="center" w="100%">
                              {title}
                            </Text>
                          </Flex>
                        </AccordionPanel>
                      );
                    })}
                </AccordionItem>
              );
            })}
          </Accordion>
          <Button colorScheme="teal">New</Button>
        </>
      ) : (
        <Text>ログインしてください</Text>
      )}
    </Box>
  );
};
