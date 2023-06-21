import { Link } from 'react-router-dom';
import { Card, Image, Text, Badge, Button, Group, Rating } from '@mantine/core';

export function ProductCard({ id, title, price, imageUrl, rating }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={imageUrl} height={160} alt="Norway" />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <Badge color="pink" variant="light">
            {price} ₽
          </Badge>
          <Rating defaultValue={rating} />
        </div>
      </Group>

      <Link to={`/pizza/${id}`} style={{ textDecoration: 'none' }}>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          Подробнее
        </Button>
      </Link>
    </Card>
  );
}
