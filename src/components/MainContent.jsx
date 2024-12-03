import { Button, Table, Form, Input, Space, message, Modal } from "antd";
import axios from "axios";
import { useState } from "react";

const MainContent = ({ customers, refreshCustomers }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const addCustomer = () => {
    setIsEditing(false);
    form.resetFields();
    showModal();
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    form.setFieldsValue(record);
    setSelectedCustomer(record);
    showModal();
  };

  const handleCancel = () => {
    form.resetFields();
    setIsEditing(false);
    setOpen(false);
  };

  const handleSave = async (values) => {
    setConfirmLoading(true);
    try {
      if (isEditing) {
        await axios.put(
          `http://167.172.79.211:8080/api/customer/${selectedCustomer.customerId}`,
          values
        );
        message.success("Customer updated successfully");
      } else {
        await axios.post(`http://167.172.79.211:8080/api/customer`, values);
        message.success("Customer added successfully");
      }
      setTimeout(() => {
        setConfirmLoading(false);
        setOpen(false);
        form.resetFields();
        refreshCustomers();
      }, 2000);
    } catch (error) {
      console.error("Error saving customer:", error);
      message.error("Failed to save customer");
      setConfirmLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://167.172.79.211:8080/api/customer/${id}`);
      message.success("Customer deleted successfully");
      refreshCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
      message.error("Failed to delete customer");
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "First Name",
      dataIndex: "customerFirstName",
      key: "customerFirstName",
    },
    {
      title: "Last Name",
      dataIndex: "customerLastName",
      key: "customerLastName",
    },
    {
      title: "Action",
      key: "operation",
      render: (_, record) => (
        <Space size="small">
          <Button size="small" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            danger
            size="small"
            onClick={() => handleDelete(record.customerId)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <Button type="primary" style={{ margin: "16px" }} onClick={addCustomer}>
          Add Customer
        </Button>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={customers}
        rowKey="customerId"
      />
      <Modal
        title={isEditing ? "Edit Customer" : "Add Customer"}
        open={open}
        onOk={() => form.submit()}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            label="First Name"
            name="customerFirstName"
            rules={[{ required: true, message: "First name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="customerLastName"
            rules={[{ required: true, message: "Last name is required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MainContent;
