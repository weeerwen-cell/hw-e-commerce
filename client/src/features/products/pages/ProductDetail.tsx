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


const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const productId = Number(id)

  const { data, isLoading, isError, error } = useProduct(productId)
  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>{error.message}</Text>;
  return (
    <Container size="lg" py="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image
            src= {data?.thumbnail} 
            alt={data?.title}
            height={400}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={1} mb="md">
            {data?.title}
          </Title>
          <Group mb="md">
            <Badge size="lg" color="pink">
             {data?.price}
            </Badge>
            <Badge size="lg" color="blue">
              {data?.category}
            </Badge>
          </Group>
          <Text size="lg" mb="md">
            {data?.description}
          </Text>
          <Text size="md" mb="xl" c="dimmed">
            {data?.stock} units avaliable
          </Text>
          <Group>
            <Button size="lg">Add to Cart</Button>
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
