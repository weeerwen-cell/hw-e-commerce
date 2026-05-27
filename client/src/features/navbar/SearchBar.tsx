import { TextInput, ActionIcon } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!value.trim()) return;
    navigate(`/products?q=${encodeURIComponent(value)}`);
  };

  return (
    <TextInput
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      placeholder="Search products..."
      style={{ width: 400 }}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSearch();
      }}
      rightSection={
        <ActionIcon
          variant="filled"
          color="blue"
          radius="xl"
          onClick={handleSearch}
          aria-label="Search"
        >
          <IconSearch size={16} />
        </ActionIcon>
      }
    />
  );
};