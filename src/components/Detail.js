import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const Detail = ({
  token,
  setMemoContent,
  memoContent,
  categories,
  setCategories,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (memoContent) {
      const { title, content, category_id, id } = memoContent;
      setValue("title", title);
      setValue("content", content);
      setValue("category_id", category_id);
      setValue("id", id);
    }
  }, [memoContent, setValue]);

  const onSubmit = async (values) => {
    const { title, content, category_id, id } = values;
    await axios
      .put(
        `${process.env.REACT_APP_ENDPOINT}/memo/${id}`,
        {
          category_id,
          title,
          content,
        },
        { headers: { "X-ACCESS-TOKEN": token } }
      )
      .then((res) => setMemoContent(res.data))
      .catch((error) => {
        throw new Error(error);
      });
  };

  const deleteMemo = async () => {
    const id = getValues("id");
    await axios
      .delete(`${process.env.REACT_APP_ENDPOINT}/memo/${id}`, {
        params: {
          id,
        },
        headers: {
          "X-ACCESS-TOKEN": token,
        },
      })
      .then(() => {
        setCategories(categories.filter((category) => category.id !== id));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  console.log(categories);
  return (
    <Box w="70%">
      <form onSubmit={handleSubmit(onSubmit)}>
        {memoContent && (
          <>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                variant="flushed"
                id="title"
                placeholder="Access Token"
                {...register("title", {
                  required: "This is required",
                })}
              />
              {/* <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage> */}
              <FormLabel>Content</FormLabel>
              <Textarea
                variant="flushed"
                id="content"
                {...register("content")}
              />
            </FormControl>
            <Flex justifyContent={"space-between"}>
              <Button
                id="save"
                mt={4}
                colorScheme="teal"
                disabled={!memoContent}
                isLoading={isSubmitting}
                type="submit"
              >
                Save
              </Button>
              <Button
                id="delete-memo"
                mt={4}
                colorScheme="red"
                disabled={!memoContent}
                onClick={() => deleteMemo()}
              >
                Delete
              </Button>
            </Flex>
          </>
        )}
      </form>
    </Box>
  );
};
