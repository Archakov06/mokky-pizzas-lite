import React from 'react';
import { SimpleGrid, Pagination, Select, TextInput, Center, Loader } from '@mantine/core';
import * as Api from '../api';
import { ProductCard } from '../components/ProductCard';

export function HomePage() {
  // Поисковое значение
  const [searchValue, setSearchValue] = React.useState('');

  // Сортировка по полю
  const [sortBy, setSortBy] = React.useState('price');

  // Номер конкретной страницы в пагинации
  const [currentPage, setCurrentPage] = React.useState(1);

  // Количество элементов на странице
  const [totalPages, setTotalPages] = React.useState(1);

  // Список пицц
  const [items, setItems] = React.useState([]);

  // Загрузка
  const [isLoading, setLoading] = React.useState(false);

  // Готовность приложения
  const [isReady, setReady] = React.useState(false);

  // Загрузка пицц с Mokky при первом рендере и при изменении параметров
  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);

        // Выбирем какие поля нужно вернуть в самих объектах
        const selectedFields = ['id', 'title', 'price', 'imageUrl', 'rating'].join(',');

        // Лимит отображаемых пицц на страницу
        const limit = 6;

        const response = await Api.getPizzas({
          limit,
          sortBy,
          page: currentPage,
          _select: selectedFields,
          ...(searchValue && { title: searchValue + '*' }),
        });

        setItems(response.items);
        setTotalPages(response.meta.total_pages);
      } catch (error) {
        // Обработка ошибки получения записей
        console.error(error);
        setItems([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchItems().finally(() => {
      setReady(true);
    });
  }, [searchValue, sortBy, currentPage]);

  // Сохраняем сортировку выбранного поля
  function handleSortOrderChange(value) {
    setSortBy(value);
    setCurrentPage(1);
  }

  // Переход на следующую/предыдущую страницу
  function handlePageChange(page) {
    setCurrentPage(page);
  }

  // Если приложение не готово, вернем заглушку
  if (!isReady) {
    return (
      <Center style={{ marginTop: 50 }}>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <div style={{ display: 'grid', marginTop: 20, gridTemplateColumns: '1fr 0.4fr', gap: 20 }}>
        <TextInput
          placeholder="Найти продукт..."
          label="Поиск"
          style={{ flex: 1 }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          rightSection={isLoading && <Loader size="xs" />}
          size="lg"
          withAsterisk
        />

        <Select
          label="Сортировка"
          placeholder="Pick one"
          size="lg"
          value={sortBy}
          onChange={handleSortOrderChange}
          data={[
            { value: '-title', label: 'По заголовку (DESC)' },
            { value: 'title', label: 'По заголовку (ASC)' },
            { value: '-price', label: 'По цене (DESC)' },
            { value: 'price', label: 'По цене (ASC)' },
            { value: '-rating', label: 'По рейтингу (DESC)' },
            { value: 'rating', label: 'По рейтингу (ASC)' },
          ]}
        />
      </div>

      <br />
      <Pagination value={currentPage} onChange={handlePageChange} total={totalPages} />
      <br />

      {isLoading && (
        <Center style={{ marginTop: 50 }}>
          <Loader />
        </Center>
      )}

      {!isLoading && (
        <div style={{ marginBottom: 30 }}>
          <SimpleGrid cols={3}>
            {items.map((item) => (
              <ProductCard
                key={item.id}
                imageUrl={item.imageUrl}
                title={item.title}
                price={item.price}
                rating={item.rating}
                id={item.id}
              />
            ))}
          </SimpleGrid>
        </div>
      )}
    </>
  );
}
