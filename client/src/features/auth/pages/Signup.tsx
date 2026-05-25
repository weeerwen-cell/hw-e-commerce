import { Card, Container, Title, Button, TextInput, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { USER_URL } from "./AuthApi";
import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";

export const Signup = () => {

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      firstName:"",
      lastName:""
    },

      validate: {
      firstName: (v) => (v.length < 2? "first name too short": null),
      lastName: (v) => (v.length < 2? "last name too short": null),  
      username: (v) => (v.length < 3 ? "Username too short" : null),
      email: (v) => (/^\S+@\S+$/.test(v) ? null : "Invalid email"),
      password: (v) => (v.length < 6 ? "Password too short" : null),
    }

  })
    const navigate = useNavigate();
  const handleSubmit =async(value: typeof form.values)=>{
      try {
        const res = await fetch(USER_URL)
        const data = await res.json();
        const exist =  data.users.some(
          (u:any)=>u.username === value.username
        );
        if(exist){
          form.setFieldError("username", "username already exists")
        }
        // alert("signup success")
        navigate("/products")
      } catch (error) {
        console.log(error);        
      }

  }

  return (
    <Container size="xs" py="xl">
      <Card shadow="md" padding="xl" radius="md" withBorder>
        <Title order={2} mb="md" ta="center">
          Create an account
          </Title>
          <form onSubmit={form.onSubmit(handleSubmit)}>

          <TextInput
          label="First name"
          {...form.getInputProps("firstName")}
          />

          <TextInput
          label="Last name"
          {...form.getInputProps("lastName")}
          />


        <TextInput
          label="Username"
          {...form.getInputProps("username")}
        />

        <TextInput
          label="Email"
          mt="sm"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          label="Password"
          mt="sm"
          {...form.getInputProps("password")}
        />

        <Button fullWidth mt="lg" type="submit">
          Sign up
        </Button>
      </form>
         
       
      </Card>
    </Container>
  );
};

export default Signup;
