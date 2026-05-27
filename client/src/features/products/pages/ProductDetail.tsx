import {
  Badge,
  Button,
  Container,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "./hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCartApi } from "./api";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id);

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError: isProductError,
    error: productError,
  } = useProduct(productId);

  const { mutate } = useMutation({
    mutationFn: addCartApi,

 
    onMutate: async (payload: any) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<any>(["cart"]);

      queryClient.setQueryData(["cart"], (oldCart: any) => {
        if (!oldCart || !data) return oldCart;

        return {
          ...oldCart,
          totalQuantity: oldCart.totalQuantity + 1,
          totalProducts: oldCart.totalProducts + 1,
          products: [
            ...oldCart.products,
            {
              id: productId,
              title: data.title,
              price: data.price,
              quantity: 1,
              thumbnail: data.thumbnail,
            },
          ],
        };
      });

     
      return { previousCart };
    },

    
    onError: (_err, _payload, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },

   
    onSuccess: (cartData) => {
      queryClient.setQueryData(["cart"], cartData);
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (isProductError) return <Text>{productError.message}</Text>;

  return (
    <Container size="lg" py="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image src={data?.thumbnail} alt={data?.title} height={400} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={1} mb="md">
            {data?.title}
          </Title>

          <Group mb="md">
            <Badge size="lg" color="pink">
              ${data?.price}
            </Badge>
            <Badge size="lg" color="blue">
              {data?.category}
            </Badge>
          </Group>

          <Text size="lg" mb="md">
            {data?.description}
          </Text>

          <Text size="md" mb="xl" c="dimmed">
            {data?.stock} units available
          </Text>

          <Group>
            <Button
              size="lg"
              onClick={() => {
                const token = localStorage.getItem("token");
                if (!token) {
                  navigate("/login");
                  return;
                }

                mutate({
                  userId: 1,
                  products: [
                    {
                      id: productId,
                      quantity: 1,
                    },
                  ],
                });
              }}
            >
              Add to Cart
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/products")}
            >
              Back to Products
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ProductDetail;