import React from 'react'
import { useRef } from 'react';
import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function ImageUpload() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string | null | ArrayBuffer>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            }
            reader.readAsDataURL(img);
        }
    }

    const resetImage = () => {
        setImageUrl(null);
        if (inputRef) {
            inputRef.current!.value = '';
        }
        const reader = new FileReader();
        reader.readAsDataURL(new Blob());

    }

    return (
        <div className='container w-75'>
            <Container>
                <Row>
                    {imageUrl && <img src={imageUrl as string} alt='' width='20%' />}
                </Row>
                <Row>
                    <Form.Group  controlId="formFile" className="mb-2 mt-2">
                        <Form.Control ref={inputRef}  onChange={handleChange} type="file" />
                    </Form.Group>
                </Row>
                <Row className='justify-content-md-center'>
                    <Button className='w-25' variant="primary" onClick={resetImage}>Reset</Button>
                </Row>
            </Container>
        </div>
    )
}

export default ImageUpload