import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export const LoginHeader = ({ onSubmit }) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const watchAccessToken = watch("access_token");

  return (
    <Box bg="blue.400">
      <Flex justifyContent={"space-between"} px="5">
        <Heading>Memo app</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex>
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="name">Access Token</FormLabel>
              <Input
                minW="375px"
                id="access_token"
                bgColor={"transparent"}
                placeholder="Access Token"
                {...register("access_token", {
                  required: "This is required",
                })}
              />
            </FormControl>
            <Button
              id="login"
              mt={4}
              ml="10"
              disabled={
                !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
                  watchAccessToken
                )
              }
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};
