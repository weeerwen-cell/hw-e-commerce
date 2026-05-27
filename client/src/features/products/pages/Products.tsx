import {
  Badge,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { Spinner } from "../../../components/ui/Spinner";
import { useProducts, useCategories } from "./hook";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Product } from "./type";
import { useSearchParams } from "react-router-dom";



const Products = () => {
  const { data: Categories } = useCategories();
  const [seletedCateg, setSelectedCate] = useState("");

  const navigate = useNavigate();

const [params] = useSearchParams();
const searchQuery = params.get("q") || "";
  

  // 2. fetch products（category filter）
  const { data, isLoading, isError, error } = useProducts(seletedCateg);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
  }

  // （category + search）
  console.log("searchQuery =", searchQuery);
const filteredProducts = data?.products?.filter((product: Product) => {
  const matchCategory =
    seletedCateg === "" || product.category === seletedCateg;

  const matchSearch =
    product.title.toLowerCase().includes((searchQuery ?? "").toLowerCase());

  return matchCategory && matchSearch;
});
    console.log("searchQuery:", searchQuery);
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">
        Our Products
      </Title>

      {/* Category filter */}
      <select
        value={seletedCateg}
        onChange={(e) => setSelectedCate(e.target.value)}
      >
        <option value="">All Categories</option>
        {Categories?.map((cat: string) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <Text size="lg" mt="md">
        Products page
      </Text>

      {/* Products Grid */}
      <Flex wrap="wrap" gap="md" justify="flex-start" align="flex-start">
        {filteredProducts?.map((product: Product) => {
          const {
            id,
            title,
            price,
            stock,
            rating,
            thumbnail,
            description,
          } = product;

          return (
            <Card key={id} padding="lg" w={300} shadow="sm">
              <Card.Section>
                <Image src={thumbnail} height={160} alt={title} />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500} style={{ flex: 1 }} lineClamp={1}>
                  {title}
                </Text>

                <Badge color="pink">${price}</Badge>
              </Group>

              <Text size="sm" c="dimmed">
                {description}
                <br />
                <p>
                  Stock: {stock} | Rating: {rating}
                </p>
              </Text>

              <Button
                fullWidth
                mt="md"
                onClick={() => navigate(`/products/${id}`)}
              >
                View Details
              </Button>
            </Card>
          );
        })}
      </Flex>
    </Container>
  );
};

export default Products;