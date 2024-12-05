import { Button, Table, Space, message, Form, Row, Col } from "antd";
import { useState } from "react";
import { addCustomer, editCustomer, deleteCustomer } from "../api";

import CustomerModal from "./CustomerModal";

const MainContent = ({ isLoading, customers, refreshCustomers }) => {
  const [modalState, setModalState] = useState({
    open: false,
    isEditing: false,
    confirmLoading: false,
    selectedCustomer: null,
  });

  const [form] = Form.useForm();

  const openModal = (isEditing, customer = null) => {
    setModalState({ open: true, isEditing, selectedCustomer: customer });
    form.setFieldsValue(customer || {});
  };

  const closeModal = () => {
    form.resetFields();
    setModalState({ ...modalState, open: false });
  };

  const handleSave = async (values) => {
    const { isEditing, selectedCustomer } = modalState;
    setModalState((prev) => ({ ...prev, confirmLoading: true }));

    try {
      if (isEditing) {
        await editCustomer(selectedCustomer.customerId, values);
        message.success("Customer updated successfully");
      } else {
        await addCustomer(values);
        message.success("Customer added successfully");
      }
      refreshCustomers();
      closeModal();
    } catch {
      message.error("Failed to save customer");
    } finally {
      setModalState((prev) => ({ ...prev, confirmLoading: false }));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      message.success("Customer deleted successfully");
      refreshCustomers();
    } catch {
      message.error("Failed to delete customer");
    }
  };

  const columns = [
    { title: "Id", dataIndex: "customerId", key: "customerId" },
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
        <Space>
          <Button size="small" onClick={() => openModal(true, record)}>
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
      <Row>
        <Col span={24}>
          <Row justify="end">
            <Button type="primary" onClick={() => openModal(false)}>
              Add Customer
            </Button>
          </Row>
          <Row justify="center">
            <Table
              bordered
              columns={columns}
              loading={isLoading}
              dataSource={customers}
              rowKey="customerId"
            />

            <CustomerModal
              isEditing={modalState.isEditing}
              open={modalState.open}
              confirmLoading={modalState.confirmLoading}
              onCancel={closeModal}
              onSave={handleSave}
              form={form}
            />
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default MainContent;
