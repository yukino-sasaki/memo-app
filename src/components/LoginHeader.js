import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
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
      <Flex justifyContent={"space-between"}>
        <Heading>Memo app</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex>
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="name">Access Token</FormLabel>
              <Input
                variant="flushed"
                minW="375px"
                id="access_token"
                bg="blue.400"
                placeholder="Access Token"
                {...register("access_token", {
                  required: "This is required",
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              id="login"
              mt={4}
              disabled={
                !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
                  watchAccessToken
                )
              }
              colorScheme="blue"
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
