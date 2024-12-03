import React, { useEffect, useState } from "react";

import "./App.css";

import axios from "axios";
import { Flex, Layout } from "antd";

import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  const [customers, setCustomers] = useState([]);
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "https://antd-backend.chickenkiller.com/api/customers"
      );
      setCustomers(response.data.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <Flex>
      <Layout>
        <Header style={headerStyle}>
          <Navbar />
        </Header>
        <Content>
          <MainContent
            customers={customers}
            refreshCustomers={fetchCustomers}
          />
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Flex>
  );
};
export default App;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};
