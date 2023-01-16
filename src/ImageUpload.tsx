import React from 'react'
import { useRef } from 'react';
import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ModalCropper from './ModalCropper';

function ImageUpload() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string | null | ArrayBuffer>();
    const [croppedImg, setCroppedImg] = useState<string | null | ArrayBuffer>(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleShow();
            let img = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            }
            reader.readAsDataURL(img);
        }
    }

    const handleCrop = (croppedImg: string) => {
        setCroppedImg(croppedImg);
        handleClose();
    }

    const resetImage = () => {
        setImageUrl(null);
        setCroppedImg(null);
        if (inputRef) {
            inputRef.current!.value = '';
        }
        const reader = new FileReader();
        reader.readAsDataURL(new Blob());
    }

    return (
        <div className='container w-75'>
            <ModalCropper
                show={show}
                handleCrop={handleCrop}
                handleShow={handleShow}
                handleClose={handleClose}
                imageUrl={imageUrl} />
            <Container>
                <Row className='justify-content-center'>
                    <div className='text-center'>
                        {croppedImg && <img src={croppedImg as string} alt='' width='80%' />}
                    </div>
                </Row>
                <Row>
                    <Form.Group controlId="formFile" className="mb-2 mt-2">
                        <Form.Control ref={inputRef} onChange={handleChange} type="file" />
                    </Form.Group>
                </Row>
                <Row className='justify-content-center'>
                    <div className='text-center'>
                        <Button className='w-25' variant="primary" onClick={resetImage}>Reset</Button>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default ImageUpload