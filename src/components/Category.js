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
  Spacer,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import {
  AiFillFolder,
  AiOutlineFileText,
  AiTwotoneFolderOpen,
} from "react-icons/ai";

export const Category = ({
  data,
  token,
  setMemoContent,
  categories,
  setCategories,
}) => {
  const [selectedMemo, setSelectedMemo] = useState();
  const [categoryId, setCategoryId] = useState();
  const [expandedIndex, setExpandedIndex] = useState();

  const expandAccordion = async (id) => {
    setCategories();
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

  const addMemo = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_ENDPOINT}/memo`,
        {
          category_id: categoryId,
          title: "New Title",
          content: "New Content",
        },
        {
          headers: {
            "X-ACCESS-TOKEN": token,
          },
        }
      )
      .then((res) => {
        setMemoContent(res.data);
        setCategories([...categories, res.data]);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <Box w="30%">
      {data ? (
        <>
          <Accordion
            allowToggle
            onChange={(expandedIndex) => {
              setExpandedIndex(expandedIndex);
            }}
          >
            {data.map(({ id: category_id, name }, index) => {
              return (
                <AccordionItem key={index}>
                  <h2>
                    <AccordionButton
                      aria-expanded
                      _expanded={{ color: "blue.300" }}
                      onClick={() => {
                        expandAccordion(category_id);
                        setCategoryId(category_id);
                      }}
                    >
                      <Flex w="100%" justifyContent={"space-between"}>
                        <Icon
                          as={
                            category_id === categoryId
                              ? AiTwotoneFolderOpen
                              : AiFillFolder
                          }
                        />
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
          <Flex>
            <Spacer />
            <Button
              colorScheme="teal"
              id="new-memo"
              mt="4"
              disabled={expandedIndex === -1}
              onClick={() => addMemo()}
            >
              New
            </Button>
          </Flex>
        </>
      ) : (
        <Text>ログインしてください</Text>
      )}
    </Box>
  );
};
