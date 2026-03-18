'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

const DEFAULT_PROFILE_IMAGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRTlFQ0VGIi8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjI1IiBmaWxsPSIjNkM3NTdEIi8+CjxwYXRoIGQ9Ik0zMCAxMjBDMzAgMTA0LjUzNiA0Mi41MzYgOTIgNTggOTJIOTJDMTA3LjQ2NCA5MiAxMjAgMTA0LjUzNiAxMjAgMTIwVjE1MEgzMFYxMjBaIiBmaWxsPSIjNkM3NTdEIi8+Cjwvc3ZnPgo=";

const CompleteProfileWithImageUI = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successAlertRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    department: '',
    semester: '',
    rollNo: '',
    enrollmentNo: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(DEFAULT_PROFILE_IMAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fullName = useMemo(() => {
    const { firstName, middleName, lastName } = formData;
    const name = [firstName, middleName, lastName].filter(Boolean).join(' ');
    return name || 'Student Profile';
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    const formPayload = new FormData();
    // Map your frontend keys to backend keys
    formPayload.append('patronFirstName', formData.firstName);
    formPayload.append('patronMiddleName', formData.middleName);
    formPayload.append('patronLastName', formData.lastName);
    formPayload.append('patronDepartment', formData.department);
    formPayload.append('patronSemester', formData.semester);
    formPayload.append('patronRollNo', formData.rollNo);
    formPayload.append('patronEnrollmentNumber', formData.enrollmentNo);

    // ONLY append image if the user has selected one
    if (imageFile) {
      formPayload.append('patronImage', imageFile);
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const response = await fetch('/api/patron/create', {
        method: 'POST',
        body: formPayload,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong.');

      setSuccess('Profile updated successfully!');
      successAlertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
      form.classList.remove('was-validated');
    }
  };

  const resetForm = () => {
    if (window.confirm('Are you sure you want to reset all fields?')) {
      setFormData({
        firstName: '', middleName: '', lastName: '', department: '', semester: '', rollNo: '', enrollmentNo: ''
      });
      setImageFile(null);
      setImagePreview(DEFAULT_PROFILE_IMAGE);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (formRef.current) formRef.current.classList.remove('was-validated');
      setError('');
      setSuccess('');
    }
  };

  const goToDashboard = () => {
    if (window.confirm('Are you sure you want to go back? Any unsaved changes will be lost.')) {
      router.push('/');
    }
  };

  // useEffect(()=>{
  //   const allowAccess=sessionStorage.getItem('allowEditProfile');

  //   if(allowAccess!=='true'){
  //     router.replace('/dashboard');
  //   }
  //   else{
  //     sessionStorage.removeItem("allowEditProfile");
  //   }
  // },[]);
  
  return (
    <div className={styles.profileBody}>
      {/* Navigation */}
      <nav className={`navbar navbar-expand-lg navbar-light bg-white fixed-top ${styles.navbar}`}>
        <div className="container">
          <a className={styles.navbarBrand} href="#">
            <i className="fas fa-book-open me-2"></i>
            LibraryHub
          </a>
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="#" onClick={goToDashboard}>
              <i className="fas fa-arrow-left me-2"></i>
              Back to Home
            </a>
          </div>
        </div>
      </nav>

      {/* Main Profile Container */}
      <div className="container">
        <div className={styles.profileContainer}>
          {/* Profile Header */}
          <div className={styles.profileHeader}>
            <div className={styles.profilePhotoContainer}>
              <img
                src={imagePreview}
                alt="Profile Photo"
                className={styles.profilePhoto}
              />
              <input
                type="file"
                id="photoUpload"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <label htmlFor="photoUpload" className={styles.photoUploadBtn} title="Upload Photo (optional)">
                <i className="fas fa-camera"></i>
              </label>
            </div>
            <h2 className="mb-2">{fullName}</h2>
            <p className="mb-0 opacity-75">Complete your profile information</p>
          </div>

          <div className={styles.formSection}>
            {success && (
              <div ref={successAlertRef} className="alert alert-success d-flex align-items-center">
                <i className="fas fa-check-circle me-2"></i>{success}
              </div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className={styles.infoCard}>
              <h5 className="mb-2"><i className="fas fa-info-circle me-2 text-primary"></i>Profile Information</h5>
              <p className="mb-0 text-muted">
                Please fill in all required fields marked with <span className={styles.required}>*</span>.<br />
                <span className="text-info">Profile picture is optional</span>
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="row">
                <div className="col-12">
                  <h5 className="mb-4 text-primary"><i className="fas fa-user me-2"></i>Personal Information</h5>
                </div>
                {['firstName', 'lastName'].map(field => (
                  <div className="col-md-6 mb-3" key={field}>
                    <label htmlFor={field} className={styles.formLabel}>
                      {field.charAt(0).toUpperCase() + field.slice(1).replace('Name', ' Name')} <span className={styles.required}>*</span>
                    </label>
                    <input type="text" className="form-control" id={field} name={field} value={formData[field as keyof typeof formData]} onChange={handleChange} required />
                    <div className="invalid-feedback">Please provide a valid {field.replace('Name', ' name')}.</div>
                  </div>
                ))}
                <div className="col-md-12 mb-4">
                  <label htmlFor="middleName" className={styles.formLabel}>Middle Name <small className="text-muted">(Optional)</small></label>
                  <input type="text" className="form-control" id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} />
                </div>

                <div className="col-12 mt-4">
                  <h5 className="mb-4 text-primary"><i className="fas fa-graduation-cap me-2"></i>Academic Information</h5>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="department" className={styles.formLabel}>Department <span className={styles.required}>*</span></label>
                  <select className="form-select" id="department" name="department" value={formData.department} onChange={handleChange} required>
                    <option value="">Select Department...</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics & Communication</option>
                    <option value="Mechanical">Mechanical Engineering</option>
                  </select>
                  <div className="invalid-feedback">Please select a department.</div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="semester" className={styles.formLabel}>Semester <span className={styles.required}>*</span></label>
                  <select className="form-select" id="semester" name="semester" value={formData.semester} onChange={handleChange} required>
                    <option value="">Select Semester...</option>
                    {[...Array(8)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}{['st', 'nd', 'rd'][i] || 'th'} Semester</option>)}
                  </select>
                  <div className="invalid-feedback">Please select a semester.</div>
                </div>

                <div className="col-md-6 mb-4">
                  <label htmlFor="rollNo" className={styles.formLabel}>Roll Number <span className={styles.required}>*</span></label>
                  <input type="text" className="form-control" id="rollNo" name="rollNo" value={formData.rollNo} onChange={handleChange} placeholder="e.g., 2024001" required />
                  <div className="invalid-feedback">Please provide your roll number.</div>
                </div>

                <div className="col-md-6 mb-4">
                  <label htmlFor="enrollmentNo" className={styles.formLabel}>Enrollment Number <span className={styles.required}>*</span></label>
                  <input type="text" className="form-control" id="enrollmentNo" name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} placeholder="e.g., EN2024CS001" required />
                  <div className="invalid-feedback">Please provide your enrollment number.</div>
                </div>

                <div className="col-12 mt-4">
                  <div className="d-flex gap-3 justify-content-end">
                    <button type="button" className="btn btn-outline-secondary" onClick={resetForm} disabled={isLoading}>
                      <i className="fas fa-undo me-2"></i>Reset
                    </button>
                    <button type="submit" className={`btn ${styles.btnPrimary}`} disabled={isLoading}>
                      {isLoading ? (
                        <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Saving...</>
                      ) : (
                        <><i className="fas fa-save me-2"></i>Save Profile</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileWithImageUI;
