import { useState } from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;
const UpdateForm = () => {
  const { formVal, setForms } = useState({});
  return (
    <Form>
      <FormItem></FormItem>
    </Form>
  );
};
export default UpdateForm;
