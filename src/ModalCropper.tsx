import React from 'react'
import { useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";

function ModalCropper(props: any) {
    const cropperRef = useRef(null);
    const [croppedImg, setCroppedImg] = useState("");

    const onCrop = () => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        setCroppedImg(cropper.getCroppedCanvas().toDataURL());
    };

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Image cropper</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Cropper
                    src={props.imageUrl}
                    style={{ width: "100%", height: "100%" }}
                    guides={true}
                    crop={onCrop}
                    ref={cropperRef}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    responsive={true}
                    autoCropArea={1}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => props.handleCrop(croppedImg as string)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCropper