import axios from "axios";

const API_URL = "https://antd-backend.chickenkiller.com/api";

export const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/customers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const addCustomer = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/customer`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
};

export const editCustomer = async (customerId, data) => {
  try {
    const response = await axios.put(`${API_URL}/customer/${customerId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

export const deleteCustomer = async (customerId) => {
  try {
    const response = await axios.delete(`${API_URL}/customer/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};
