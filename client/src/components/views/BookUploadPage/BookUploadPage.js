import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";

const { Title } = Typography;
const { TextArea } = Input;
const Catogory = [
  { value: 0, label: "베스트셀러" },
  { value: 0, label: "소설" },
  { value: 0, label: "시" },
  { value: 0, label: "인문학" },
  { value: 0, label: "에세이" }
];
function UploadBookPage(props) {
  const user = useSelector(state => state.user);
  const [title, setTitle] = useState("");
  const [Author, setAuthor] = useState("");
  const [Publisher, setPublisher] = useState("");
  const [Year, setYear] = useState("");
  const [Description, setDescription] = useState("");
  const [Categories, setCategories] = useState("베스트셀러");
  const [FilePath, setFilePath] = useState("");
  const handleChangeTitle = event => {
    setTitle(event.currentTarget.value);
  };
  const handleChangeAuthor = event => {
    setAuthor(event.currentTarget.value);
  };
  const handleChangePublisher = event => {
    setPublisher(event.currentTarget.value);
  };
  const handleChangeYear = event => {
    setYear(event.currentTarget.value);
  };
  const handleChangeDescription = event => {
    setDescription(event.currentTarget.value);
  };
  const handleChangeOne = event => {
    setCategories(event.currentTarget.value);
  };
  const onSubmit = event => {
    event.preventDefault();
    //    console.log(event)
    const variables = {
      writer: user.userData._id,
      title: title,
      description: Description,
      filePath: FilePath,
      category: Categories,
      author: Author,
      publisher: Publisher,
      year: Year
    };
    axios.post("/api/book/uploadBook", variables).then(response => {
      if (response.data.success) {
        message.success("업로드에 성공했습니다");
        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      } else {
        alert("Failed to upload Book");
      }
    });
  };
  const onDrop = files => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "image/png" }
    };
    formData.append("img", files[0]);
    axios.post("/api/book/uploadfiles", formData, config).then(response => {
      if (response.data.success) {
        setFilePath(response.data.url);
        //gerenate thumbnail with this filepath !
      } else {
        // console.log('uploadfiles', response.data.err)
        alert("failed to save the book in server");
      }
    });
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload book</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>

          {FilePath && (
            <div>
              <img src={`${FilePath}`} alt="haha" style={{ width: "400px" }} />
              {/* <img src={`http://localhost:5000/${FilePath}`} alt="haha" style={{ width:'400px'}}/> */}
            </div>
          )}
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={handleChangeTitle} value={title} />
        <br />
        <br />
        <label>author</label>
        <Input onChange={handleChangeAuthor} value={Author} />
        <br />
        <br />
        <label>publisher</label>
        <Input onChange={handleChangePublisher} value={Publisher} />
        <br />
        <br />
        <label>year</label>
        <Input onChange={handleChangeYear} value={Year} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={handleChangeDescription} value={Description} />
        <br />
        <br />
        <select onChange={handleChangeOne}>
          {Catogory.map((item, index) => (
            <option key={index} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          제출
        </Button>
        <br />
        <br />
      </Form>
    </div>
  );
}

export default UploadBookPage;
