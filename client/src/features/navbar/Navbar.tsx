import { Avatar, Button, Group, Indicator, Menu, Text } from "@mantine/core";
import {
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { SearchBar } from "./SearchBar";
import { ThemeToggler } from "./ThemeToggler";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../cart/pages/useCart";

type NarbarProps ={
  onSearch:(query:string)=>void
}



export const Navbar = ({onSearch}:NarbarProps) => {

  const {data: cart} = useCart()
  const count = cart?.totalQuantity??0;


  const navigate = useNavigate();
  const { user, logout } = useAuth()
  console.log("navbar user:", user);
  return (
    <Group
      justify="space-between"
      p="md"
      style={{ borderBottom: "1px solid #e9ecef" }}
    >
      <Text
        size="xl"
        fw={700}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        E-Commerce Store
      </Text>

      <SearchBar />

      <Group>
        <ThemeToggler />
        <Indicator label={count} size={16} color="red" position="middle-start">
          
          <Button
            variant="subtle"
            leftSection={<IconShoppingCart size={18} />}
            onClick={() => navigate("/cart")}
          >
            Cart
          </Button>
        </Indicator>
      {!user?(
        <Button onClick={()=>navigate("/login")}>
          login
        </Button>
      ):(
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              variant="subtle"
              rightSection={<IconChevronDown size={16} />}
            >
              <Group gap="xs">
                <Avatar src={user?.image} alt="User" size="sm" />
                <Text size="sm">
                  {user?.firstName?? user?.username}
                </Text>
              </Group>
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item
              leftSection={<IconSettings size={16} />}
              onClick={() => navigate("/settings")}
            >
              Settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              leftSection={<IconLogout size={16} />}
              color="red"
              onClick={() => {
                logout();
                navigate("/login")
              }}
            >
              Logout
            </Menu.Item>


            {/* <Menu.Item
              leftSection={<IconLogout size={16} />}
              color="red"

              onClick={() => { navigate("/login") }}
            >
              Login
            </Menu.Item> */}
          </Menu.Dropdown>



        </Menu>
      )}
      </Group>
    </Group>
  );
};
