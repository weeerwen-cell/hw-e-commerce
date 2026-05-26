import {
  Card,
  Container,
  Text,
  Title,
  Table,
  Button,
} from "@mantine/core";
import { useCart } from "./useCart";
import { useRemoveCartItem } from "./useRemoveCartItem";
import { useClearCart } from "./useClearCart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { data: carts=[] } = useCart();
 
  
  
  const { mutate: removeItem } = useRemoveCartItem();
  const { mutate: clearCart } = useClearCart();

  const navigate = useNavigate();

 
const rows = carts.flatMap((cart) =>
  (cart.products ?? []).slice(0,4).map((product) => (
    <Table.Tr key={`${cart.id}-${product.id}`}>
      <Table.Td>{product.title}</Table.Td>
      <Table.Td>${product.price}</Table.Td>
      <Table.Td>{product.quantity}</Table.Td>
      <Table.Td>${product.price * product.quantity}</Table.Td>

      <Table.Td>
        <Button
          color="red"
          onClick={() =>
            removeItem({
              cartId: cart.id,
              productId: product.id,
            })
          }
        >
          remove
        </Button>
      </Table.Td>
    </Table.Tr>
  ))
);
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

      <Button mt="md" color="red" onClick={() => clearCart()}>
        Clear Cart
      </Button>

      <Button mt="md" ml="sm" onClick={() => navigate("/products")}>
        Continue Shopping
      </Button>

      {carts.length === 0 && (
        <Card shadow="sm" padding="xl" radius="md" withBorder mt="md">
          <Text size="lg">Your cart is empty</Text>
          <Button mt="md" onClick={() => navigate("/products")}>
            Browse products
          </Button>
        </Card>
      )}
    </Container>
  );
};

export default Cart;