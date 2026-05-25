import { Card, Container, Text, Title } from "@mantine/core";
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form'; 
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useAuth } from "../auth/pages/context/AuthContext";

const Login = () => {
  
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '', //const [username, setUsername] = useState("")
      password: '', //const [password, setPassword] = useState("")
    
    },

    validate: {
      username: (value) => (value.length > 3? null : 'Invalid UserName'),
      password: (value) => (value.length > 4? null : 'Invalid Password'),
    },
  });

  const navigate = useNavigate();
  //get the context first, 
  const auth = useAuth()
  if( !auth){
    throw new Error("authContext is not avaliable")
  //if auth is null -> !null is true， then will throw error 
  }
  
  const {login} = auth
  
  const handleSub = async(value: typeof form.values)=>{
      
    try{  
      await login(value.username, value.password);
      console.log("login success"); 
      navigate("/products")    
      }catch(err){
         console.log("login fails", err);        
      }
    }

  return (
    <Container size={"sm"}>
    <form onSubmit={form.onSubmit(handleSub)}>
      <TextInput
        style={{width:300}}
        withAsterisk
        label="UserName"
        placeholder="emilys"
        {...form.getInputProps('username')}
      />
        
        <TextInput
        style={{width:300}}
        withAsterisk
        label="Password"
        placeholder="emilyspass"
        {...form.getInputProps('password')}
      />

        <Button type="submit">Submit</Button>
        <Text component={Link} to= "/signup" c="blue" style={{cursor:"pointer"}}>
          Sign up
        </Text>
    </form>
    </Container>
  );


};

export default Login;
