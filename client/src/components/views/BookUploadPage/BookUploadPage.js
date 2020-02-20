import React, {useState} from 'react'
import { Typography, Button, Form, message, Input, Icon  } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone';
import Axios from 'axios';




const { Title } = Typography;


const PrivateOptions = [
    {value:0, label: "Private"},
    {value:1, label: "Public"}
]

const CategoryOptions = [
    {value:0, label: "Film & Animation"},
    {value:1, label: "Autos & Vehicles"},
    {value:2, label: "Music"},
    {value:3, label: "horors"}
]

function BookUploadPage() {

    const [BookTitle, setBookTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")
    const [filePath, setfilePath] = useState("")
    const [thumbnail, setthumbnail] = useState("")
    const [Duration, setDuration] = useState("")
    const onTitleChange = (e) =>{
        setBookTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }
    
    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])
        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if(response.data.success){
                    console.log(response)

                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }

                    setfilePath(response.data.url)


                    Axios.post('/api/video/thumbnail', variable)
                    .then(res => {
                        if(res.data.success){
                            setDuration(res.data.fileDuration)
                            setthumbnail(res.data.thumbsFilePath)
                            console.log(res.data)
                        }else {
                            alert('썸네일 생성에 실패했습니다.')
                        }
                    })
                }else {
                    console.log(response)
                    alert('비디오 업로드를 실패했습니다.')
                }
            })
    }
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Book</Title>
            </div>

            <Form onSubmit>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {/* Drop zone*/ }
                    <Dropzone
                    onDrop = {onDrop}
                    multiple = {false}
                    maxSize = {100000000}
                    >
                    {({ getRootProps, getInputProps }) => (
                        <div style={{ width: "300px", height:"240px", border:"1px solid loghtgray", display:'flex',
                        alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontsize:'3rem'}}>

                            </Icon>
                        </div>
                    )}
                    </Dropzone>
                    {/* 썸네일 */}

                    {thumbnail &&
                    <div>
                        <img src={`http://localhost:5000/${thumbnail}`} alt="thumbnail" />
                    </div>
                    }
                </div>
                
            <label>Title</label> 
            <Input
                onChange={onTitleChange}
                value={BookTitle}
            />
            <br/><br/>
            <label>Description</label> 
            <TextArea
                onChange={onDescriptionChange}
                value={Description}
            />
            <br/><br/>
            <select onChange={onPrivateChange}>
                {PrivateOptions.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>    
                ))}  
            </select>
            <br/><br/>
            <select onChange={onCategoryChange}>
                {CategoryOptions.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>    
                ))}
            </select>
            <br/><br/>
            <Button type="primary" size="large" onClick>
                Submit
            </Button>
            <br/><br/>
            </Form>
        </div>
    )
}

export default BookUploadPage