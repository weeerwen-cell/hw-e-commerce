import {
  Badge,
  Box,
  Card,
  Container,
  Group,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";

import HomeInfoSection from "../../../components/home/HomeInfoSection";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../pages/hook";
import type { Product } from "./type";
const Home = () => {
  return (
    <Container size="xl" py="xl">
      <Box mb="xl" ta="center">
        <Title order={1} mb="md">
          Welcome to E-Commerce Store
        </Title>
        <Text size="lg" c="dimmed">
          Discover amazing products across all categories
        </Text>
      </Box>

      <Recommendations />

      <HomeInfoSection />
    </Container>
  );
};

const Recommendations = () => {
  const navigate = useNavigate();

  
  const { data, isLoading, isError } = useProducts("");

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Failed to load products</Text>;

  const products = data?.products?.slice(0, 4) ?? [];

  return (
    <Box mb="xl">
      <Title order={2} mb="md">
        ✨ Recommended for You
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
        {products.map((product:Product) => (
          <Card
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ cursor: "pointer", height: "100%" }}
          >
            <Card.Section>
              <Image
                src={product.thumbnail}
                height={160}
                alt={product.title}
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500} lineClamp={1}>
                {product.title}
              </Text>
            </Group>

            <Group justify="space-between">
              <Text size="xl" fw={700} c="blue">
                ${product.price}
              </Text>

              <Badge color="red" variant="filled">
                -10%
              </Badge>
            </Group>

            <Group gap={4} mt="xs">
              <Text size="sm" c="dimmed">
                ⭐ {product.rating}
              </Text>
              <Text size="sm" c="dimmed">
                • {product.stock} in stock
              </Text>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;