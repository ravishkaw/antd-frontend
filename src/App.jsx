import React, { useEffect, useState } from "react";
import { Flex, Layout } from "antd";

import { getCustomers } from "./api";

import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import FooterContainer from "./components/Footer";

import "./App.css";
const { Header, Footer, Content } = Layout;

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await getCustomers();
      setCustomers(response.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
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
            isLoading={isLoading}
            customers={customers}
            refreshCustomers={fetchCustomers}
          />
        </Content>
        <Footer style={footerStyle}>
          <FooterContainer />
        </Footer>
      </Layout>
    </Flex>
  );
};
export default App;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 48,
  lineHeight: "48px",
  backgroundColor: "#4096ff",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  padding: 0,
  backgroundColor: "#4096ff",
};
