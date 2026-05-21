import { Badge, Box, Button, Card, Container, Flex, Group, Image, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '../../../components/ui/Spinner';
import { type ProductResponse } from './type'
import { fetchProduct } from './api';
import { useProduct, useProducts, useCategories } from './hook';
import { Navigate, useNavigate } from 'react-router-dom';



const Products = () => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useProducts();

// const Categories =   data?.products.map((info)=>(
//   info.category
// ))
// const Categories = Array.from(
//   new Set(data?.products.map((p)=>(p.category)))
// )


const {data: Categories} = useCategories();

const navigate = useNavigate();

  // console.log(data);
if(isLoading){ 
  return <Spinner/>
}
if(isError){
  return <Text>{error.message}</Text>
}
  

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">
        Our Products
      </Title>
      <select >
      <option value="">All Categories</option>
      {Categories?.map((stuff)=>(
        <option key={stuff} value={stuff}>{stuff}</option>
      ))}
      </select>

      <Text size="lg">Products page - add your products here</Text>
      
      
      <Flex wrap="wrap" gap= "md" justify="flex-start" align="flex-start" >     
        {data?.products.map((products)=>{
          const{id,  title , price, stock , rating, thumbnail, description} = products
        return  <Card key={products.id} padding={'lg'} w={300} shadow='sm'>
           <Card.Section>
        <Image
          src={thumbnail}
          height={160}
          alt={title}
          width={100}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} style={{flex:1}} lineClamp={1}>{title}</Text>
        <Badge color="pink" style={{flexShrink:0}}>${price}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
       {description} <br/>
       <p>Stock:{stock} Rating:{rating}</p>
      </Text>

      <Button color="blue" fullWidth mt="md" 
      onClick={()=>navigate(`/products/${products.id}`)}>
        View Detalis
      </Button>
        </Card>
        } )
        }
        </Flex>
    </Container>
  );
};

export default Products;
