import { Button, Container, Stack, TextInput, Title } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";

// import type { schema } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import { useForm } from "react-hook-form";
import {SettingSchema} from "./Setting.schema"
import type { SettingFormValue } from "./Setting.schema";
import {useAuth} from "../../auth/AuthContext"
import { useEffect } from "react";
export const Settings = () => {

const{user, updateUser} = useAuth()

const{
  reset,
  register, 
  handleSubmit, 
  formState:{errors, isSubmitting} 
} = useForm<SettingFormValue>({
  resolver: zodResolver(SettingSchema),
  defaultValues:{
    firstName:"",
    lastName:"",
    username:"",
    phone:"",
    email:""
  }
}) 

useEffect(()=>{
if(user){
  reset({
    firstName:user.firstName || "",
    lastName: user.lastName ||"",
    username:user.username ||"",
    phone: user.phone ||"",
    email: user.email ||""
  })
}
}, [user, reset])


const onSubmit = (data:SettingFormValue)=>{
  // console.log("submit data:", data);
  updateUser(data)
}



  return (
    // <Container size="md" py="xl">
    //   <Title order={1} mb="xl">

    //   </Title>
    // </Container>

    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
       <Stack>
      <TextInput
      label = "username"
      {...register("username")}
      error= {errors.username?.message}
      />

      <TextInput
      label = "firstName"
      {...register("firstName")}
      error ={errors.firstName?.message}
      />
    
      <TextInput
      label = "lastName"
      {...register("lastName")}
      error ={errors.lastName?.message}
      />

      <TextInput
      label = "email"
      {...register("email")}
      error ={errors.email?.message}
      />
    
      <TextInput
      label = "phone"
      {...register("phone")}
      error ={errors.phone?.message}
      />

      <Button  type="submit" disabled= {isSubmitting}>
        Save Changes
      </Button>
      </Stack>
      </form>
    </Container>

  );
};

export default Settings;
