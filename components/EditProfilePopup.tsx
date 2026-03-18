// "use client";
// import React, { useState, useEffect } from "react";
// import styles from "./EditProfilePopup.module.css";
// import { FaUserCog, FaTimes, FaCamera, FaUser, FaSave } from "react-icons/fa";
// import { Patron } from "./types/Types";

// interface EditProfilePopupProps {
//   patron: Patron;
//   onClose: () => void;
//   onSave: (updated: Patron) => void;
// }

// const EditProfilePopup: React.FC<EditProfilePopupProps> = ({ patron, onClose, onSave }) => {
//   const [profileData, setProfileData] = useState<Patron>(patron);
//   const [imagePreview, setImagePreview] = useState<string | null>(patron.patronImage || null);

//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, [onClose]);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = ev => setImagePreview(ev.target?.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setProfileData({ ...profileData, [e.target.name]: e.target.value } as Patron);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try{
//         const response= await fetch(`/api/patrons/${patron.id}`,{
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(profileData),
//         })
        
//         if(!response.ok){
//             throw new Error("Failed To Update Patron")
//         }

//         const updatedPatron: Patron=await response.json();

//         onSave(updatedPatron);

//         onClose();
//     }
//     catch(err){
//         alert("Something went wrong while updating patron")
//     }

     
//   };

//   return (
//     <div className={styles.popupOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
//       <div className={styles.popupContent}>
//         {/* Header */}
//         <div className={styles.popupHeader}>
//           <h2>
//             <FaUserCog className="me-2" /> Edit Profile
//           </h2>
//           <button className={styles.closeBtn} onClick={onClose}>
//             <FaTimes />
//           </button>
//         </div>

//         {/* Body */}
//         <div className={styles.popupBody}>
//           <form onSubmit={handleSubmit}>
//             {/* Profile Image */}
//             <div className={styles.profileImageSection}>
//               <div className={styles.imagePreview}>
//                 {imagePreview ? <img src={imagePreview} alt="Profile" /> : <FaUser />}
//                 <button
//                   type="button"
//                   className={styles.cameraBtn}
//                   onClick={() => document.getElementById("imageInput")?.click()}
//                 >
//                   <FaCamera />
//                 </button>
//               </div>
//               <input
//                 type="file"
//                 id="imageInput"
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 onChange={handleImageUpload}
//               />
//             </div>

//             {/* Name Fields */}
//             <div className="row mb-3">
//               <div className="col-md-4 mb-3">
//                 <label className={styles.formLabel}>First Name</label>
//                 <input
//                   type="text"
//                   name="patronFirstName"
//                   className="form-control"
//                   value={profileData.patronFirstName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-md-4 mb-3">
//                 <label className={styles.formLabel}>Middle Name</label>
//                 <input
//                   type="text"
//                   name="patronMiddleName"
//                   className="form-control"
//                   value={profileData.patronMiddleName || ""}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="col-md-4 mb-3">
//                 <label className={styles.formLabel}>Last Name</label>
//                 <input
//                   type="text"
//                   name="patronLastName"
//                   className="form-control"
//                   value={profileData.patronLastName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Department, Roll, Enrollment */}
//             <div className="mb-3">
//               <label className={styles.formLabel}>Department</label>
//               <input
//                 type="text"
//                 name="patronDepartment"
//                 className="form-control"
//                 value={profileData.patronDepartment}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="mb-3">
//               <label className={styles.formLabel}>Roll No.</label>
//               <input
//                 type="number"
//                 name="patronRollNo"
//                 className="form-control"
//                 value={profileData.patronRollNo}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="mb-3">
//               <label className={styles.formLabel}>Enrollment No.</label>
//               <input
//                 type="number"
//                 name="patronEnrollmentNumber"
//                 className="form-control"
//                 value={profileData.patronEnrollmentNumber}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Buttons */}
//             <div className={styles.btnGroupCustom}>
//               <button type="button" className={styles.btnCancel} onClick={onClose}>
//                 Cancel
//               </button>
//               <button type="submit" className={styles.btnSubmit}>
//                 <FaSave className="me-2" /> Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfilePopup;


"use client";
import React, { useState, useEffect } from "react";
import styles from "./EditProfilePopup.module.css";
import { FaUserCog, FaTimes, FaCamera, FaUser, FaSave } from "react-icons/fa";
import { Patron } from "./types/Types";

interface EditProfilePopupProps {
  patron: Patron;
  onClose: () => void;
  onSave: (updated: Patron) => void;
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = ({ patron, onClose, onSave }) => {
  const [profileData, setProfileData] = useState<Patron>(patron);
  const [imagePreview, setImagePreview] = useState<string | null>(patron.patronImage || null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value } as Patron);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build the payload your API expects
    const payload = {
      patronFirstName: profileData.patronFirstName,
      patronMiddleName: profileData.patronMiddleName,
      patronLastName: profileData.patronLastName,
      patronDepartment: profileData.patronDepartment,
      patronSemester: Number(profileData.patronSemester), // convert
      patronRollNo: Number(profileData.patronRollNo),     // convert
      patronEnrollmentNumber: Number(profileData.patronEnrollmentNumber), // convert
      patronImage: imagePreview, // include updated image
    };

    try {
      const response = await fetch(`/api/patron/${patron.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed To Update Patron");
      }

      const updatedPatron: Patron = await response.json();
      onSave(updatedPatron);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating patron");
    }
  };

  return (
    <div className={styles.popupOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.popupContent}>
        {/* Header */}
        <div className={styles.popupHeader}>
          <h2>
            <FaUserCog className="me-2" /> Edit Profile
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className={styles.popupBody}>
          <form onSubmit={handleSubmit}>
            {/* Profile Image */}
            <div className={styles.profileImageSection}>
              <div className={styles.imagePreview}>
                {imagePreview ? <img src={imagePreview} alt="Profile" /> : <FaUser />}
                <button
                  type="button"
                  className={styles.cameraBtn}
                  onClick={() => document.getElementById("imageInput")?.click()}
                >
                  <FaCamera />
                </button>
              </div>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>

            {/* Name Fields */}
            <div className="row mb-3">
              <div className="col-md-4 mb-3">
                <label className={styles.formLabel}>First Name</label>
                <input
                  type="text"
                  name="patronFirstName"
                  className="form-control"
                  value={profileData.patronFirstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className={styles.formLabel}>Middle Name</label>
                <input
                  type="text"
                  name="patronMiddleName"
                  className="form-control"
                  value={profileData.patronMiddleName || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className={styles.formLabel}>Last Name</label>
                <input
                  type="text"
                  name="patronLastName"
                  className="form-control"
                  value={profileData.patronLastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Department, Roll, Enrollment */}
            <div className="mb-3">
              <label className={styles.formLabel}>Department</label>
              <input
                type="text"
                name="patronDepartment"
                className="form-control"
                value={profileData.patronDepartment}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className={styles.formLabel}>Roll No.</label>
              <input
                type="number"
                name="patronRollNo"
                className="form-control"
                value={profileData.patronRollNo}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className={styles.formLabel}>Enrollment No.</label>
              <input
                type="number"
                name="patronEnrollmentNumber"
                className="form-control"
                value={profileData.patronEnrollmentNumber}
                onChange={handleChange}
              />
            </div>

            {/* Buttons */}
            <div className={styles.btnGroupCustom}>
              <button type="button" className={styles.btnCancel} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className={styles.btnSubmit}>
                <FaSave className="me-2" /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePopup;
