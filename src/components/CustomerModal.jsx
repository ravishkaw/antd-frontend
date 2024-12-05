import { Modal, Form, Input } from "antd";

const CustomerModal = ({
  isEditing,
  open,
  confirmLoading,
  onCancel,
  form,
  onSave,
}) => {
  return (
    <Modal
      title={isEditing ? "Edit Customer" : "Add Customer"}
      open={open}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" onFinish={onSave}>
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
  );
};
export default CustomerModal;
