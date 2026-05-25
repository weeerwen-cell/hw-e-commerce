import { Card, Container, Text, Title,Table, Button } from "@mantine/core";
import { useCart } from "./useCart";
import { useRemoveCartItem } from "./useRemoveCartItem";
import { useClearCart } from "../useClearCart";
import { useNavigate } from "react-router-dom";



const Cart = () => {

 
const {data:carts=[]}=useCart()
const {mutate:removeItem} = useRemoveCartItem()
const {mutate:clearCart} = useClearCart() 


const rows = carts.map((item) => (
  <Table.Tr key={item.id}>
    <Table.Td>{item.name}</Table.Td>
    <Table.Td>${item.price}</Table.Td>
    <Table.Td>{item.quantity}</Table.Td>
    <Table.Td>${item.price * item.quantity}</Table.Td>
    <Table.Td>
      <button color="red" onClick={()=>removeItem(item.id)}>remove</button>
    </Table.Td>
  </Table.Tr>
));

 const navigate = useNavigate(); 
  return (
    
    <Container size="lg" py="xl">
      <Title order={1} mb="xl">
        Shopping Cart
      </Title>

    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Product</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Quantity</Table.Th>
          <Table.Th>Subtotal</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>{rows}</Table.Tbody>
    </Table>

      <Button  onClick={()=>clearCart()}>clear cart</Button>
      <Button onClick={()=>navigate('/products')}>Continuse Shopping</Button>


      {carts.length === 0 && (<Card shadow="sm" padding="xl" radius="md" withBorder>
        <Text size="lg">Your cart is empty</Text>
      <Button onClick={()=> navigate('/products')}>browse products</Button>
      </Card>)}
       
    </Container>
  );
};

export default Cart;
