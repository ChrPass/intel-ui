import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const emptyFunc = () => {};

const SearchField = ({ value = "", onChange = emptyFunc }) => {
  return (
    <Input
      placeholder="input search text"
      onChange={onChange}
      addonAfter={<SearchOutlined />}
    />
  );
};

export default SearchField;
