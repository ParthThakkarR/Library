// "use client";

// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// export interface BookData {
//   itemTitle: string;
//   itemAuthor: string;
//   itemType: string;
//   itemPrice: string;
//   itemImage: File | null; // now storing file instead of URL
//   isbn: string;
//   quantity: string
// }

// interface BookPopupProps {
//   show: boolean;
//   onClose: () => void;
//   onAdd: (book: BookData) => void;
// }

// const BookPopup: React.FC<BookPopupProps> = ({ show, onClose, onAdd }) => {
//   const [formData, setFormData] = useState<BookData>({
//     itemTitle: "",
//     itemAuthor: "",
//     itemType: "",
//     itemPrice: "",
//     itemImage: null,
//     isbn: "",
//     quantity: ""
//   });

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // separate handler for file input
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFormData({ ...formData, itemImage: e.target.files[0] });
//     }
//   };

//   const handleSubmit = () => {
//     onAdd(formData);
//     setFormData({
//       itemTitle: "",
//       itemAuthor: "",
//       itemType: "",
//       itemPrice: "",
//       itemImage: null,
//       isbn: "",
//       quantity: ""
//     });
//     onClose();
//   };

//   return (
//     <Modal show={show} onHide={onClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Book</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>ISBN</Form.Label>
//             <Form.Control
//               type="text"
//               name="isbn"
//               value={formData.isbn}
//               onChange={handleChange}
//               placeholder="Enter ISBN code"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Title</Form.Label>
//             <Form.Control
//               type="text"
//               name="itemTitle"
//               value={formData.itemTitle}
//               onChange={handleChange}
//               placeholder="Enter title"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Author</Form.Label>
//             <Form.Control
//               type="text"
//               name="itemAuthor"
//               value={formData.itemAuthor}
//               onChange={handleChange}
//               placeholder="Enter author"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Category / Type</Form.Label>
//             <Form.Select
//               name="itemType"
//               value={formData.itemType}
//               onChange={handleChange}
//             >
//               <option value="">Select a type</option>
//               <option value="Fiction">Fiction</option>
//               <option value="Non-Fiction">Non-Fiction</option>
//               <option value="Science">Science</option>
//               <option value="Technology">Technology</option>
//               <option value="History">History</option>
//               <option value="Biography">Biography</option>
//             </Form.Select>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Price</Form.Label>
//             <Form.Control
//               type="number"
//               name="itemPrice"
//               value={formData.itemPrice}
//               onChange={handleChange}
//               placeholder="Enter price"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Quantity</Form.Label>
//             <Form.Control
//               type="number"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               placeholder="Quantity"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Book Cover Image</Form.Label>
//             <Form.Control
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//             {formData.itemImage && (
//               <small className="text-success">
//                 Selected: {formData.itemImage.name}
//               </small>
//             )}
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={handleSubmit}>
//           Add
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default BookPopup;


// Part 2

"use client";

import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export interface BookData {
  id?: string; // optional for update
  itemTitle: string;
  itemAuthor: string;
  itemType: string;
  itemPrice: string;
  itemImage: File | null;
  isbn: string;
  quantity: string;
}

interface BookPopupProps {
  show: boolean;
  onClose: () => void;
  onAdd: (book: BookData) => void;
  onUpdate?: (book: BookData) => void; // optional update callback
  bookToEdit?: BookData | null; // prefilled book for editing
}

const BookPopup: React.FC<BookPopupProps> = ({
  show,
  onClose,
  onAdd,
  onUpdate,
  bookToEdit,
}) => {
  const [formData, setFormData] = useState<BookData>({
    itemTitle: "",
    itemAuthor: "",
    itemType: "",
    itemPrice: "",
    itemImage: null,
    isbn: "",
    quantity: "",
  });

  // Prefill form when editing
  useEffect(() => {
    if (bookToEdit) {
      setFormData(bookToEdit);
    } else {
      setFormData({
        itemTitle: "",
        itemAuthor: "",
        itemType: "",
        itemPrice: "",
        itemImage: null,
        isbn: "",
        quantity: "",
      });
    }
  }, [bookToEdit, show]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, itemImage: e.target.files[0] });
    }
  };

  const handleSubmit = () => {
    if (bookToEdit && onUpdate) {
      onUpdate(formData); // update flow
    } else {
      onAdd(formData); // add flow
    }
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{bookToEdit ? "Edit Book" : "Add New Book"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Enter ISBN code"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="itemTitle"
              value={formData.itemTitle}
              onChange={handleChange}
              placeholder="Enter title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="itemAuthor"
              value={formData.itemAuthor}
              onChange={handleChange}
              placeholder="Enter author"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category / Type</Form.Label>
            <Form.Select
              name="itemType"
              value={formData.itemType}
              onChange={handleChange}
            >
              <option value="">Select a type</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
              <option value="History">History</option>
              <option value="Biography">Biography</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="itemPrice"
              value={formData.itemPrice}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Book Cover Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {formData.itemImage && typeof formData.itemImage !== "string" && (
              <small className="text-success">
                Selected: {formData.itemImage.name}
              </small>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {bookToEdit ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookPopup;
