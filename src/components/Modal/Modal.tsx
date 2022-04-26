import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import HTMLReactParser from "html-react-parser";

function ModalComfirm({ show, title, content, onConfirm }: any) {
    return (
        <Modal show={show} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{HTMLReactParser(title)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onConfirm({ type: "close" })}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => onConfirm({ type: "confirm" })}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ModalComfirm;
