import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const LoginHeader = ({ onSubmit }) => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();

  useEffect(() => {
    setValue("access_token", "91e98584-35cf-41ac-9a7e-01d4be32fdfa");
  }, [setValue]);

  const watchAccessToken = watch("access_token");

  return (
    <Box bg="blue.400">
      <Flex justifyContent={"space-between"} px="5">
        <Heading>Memo app</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Access Token</FormLabel>
              <Input
                id="access_token"
                type="text"
                minW="375px"
                disabled={isSubmitting || isSubmitted}
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
                ) ||
                isSubmitted ||
                isSubmitting
              }
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              LOGIN
            </Button>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};
