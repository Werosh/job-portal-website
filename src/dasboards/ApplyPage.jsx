import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const ApplyPage = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Get job details from route state
  const job = location.state?.job || {};
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    coverLetter: '',
    availability: '',
    expectedSalary: '',
  });
  
  // Resume file state
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileName, setResumeFileName] = useState('');
  const [fileError, setFileError] = useState('');
  
  // Loading and submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setFileError('Please upload a PDF file');
        setResumeFile(null);
        setResumeFileName('');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setFileError('File size should not exceed 5MB');
        setResumeFile(null);
        setResumeFileName('');
        return;
      }
      
      setResumeFile(file);
      setResumeFileName(file.name);
      setFileError('');
    }
  };
  
  // Trigger file input click
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!resumeFile) {
      setFileError('Please upload your resume');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // In a real application, you would create a FormData object
      // and send it to your backend API
      const formDataToSend = new FormData();
      formDataToSend.append('jobId', job.id);
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('availability', formData.availability);
      formDataToSend.append('expectedSalary', formData.expectedSalary);
      formDataToSend.append('resume', resumeFile);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful submission
      setSubmitSuccess(true);
      
      // In a real app, you would redirect after successful submission
      setTimeout(() => {
        navigate('/', { state: { applied: true } });
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError('Failed to submit your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // If no job data is available, show an error
  if (!job.id) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-r from-[#16222A] to-[#3A6073] py-8 px-4 flex items-center justify-center">
        <div className="bg-gradient-to-r from-[#093028] to-[#237A57] p-8 rounded-xl text-amber-100 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
          <p className="mb-6">The job you're trying to apply for could not be found.</p>
          <button
            onClick={() => navigate('/jobs')}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl 
              font-bold hover:from-emerald-500 hover:to-green-400 transition-all duration-300"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#16222A] to-[#3A6073] py-8 px-4">
      <div className="w-full max-w-4xl mx-auto bg-gradient-to-r from-[#093028] to-[#237A57] p-6 md:p-8 
        rounded-[20px] text-amber-100">
        
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-green-200 hover:text-green-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to job details
        </button>
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-bold text-3xl md:text-4xl">Apply for Position</h1>
          <div className="mt-1 text-xl text-green-200">{job.title}</div>
          <div className="text-green-300">{job.company} • {job.location}</div>
        </div>
        
        {submitSuccess ? (
          <div className="bg-emerald-900/30 p-6 rounded-xl border border-emerald-600/20 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-green-200 mb-6">Your application has been successfully submitted. You will be redirected shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-emerald-900/30 p-6 rounded-xl border border-emerald-600/20">
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1 text-green-200" htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full bg-emerald-800/40 text-amber-100 p-3 rounded-xl border border-emerald-600/30 
                      focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300
                      placeholder:text-amber-100/50"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-green-200" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-emerald-800/40 text-amber-100 p-3 rounded-xl border border-emerald-600/30 
                      focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300
                      placeholder:text-amber-100/50"
                  />
                </div>
              </div>
              
              <div>
                <label className="block mb-1 text-green-200" htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-emerald-800/40 text-amber-100 p-3 rounded-xl border border-emerald-600/30 
                    focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300
                    placeholder:text-amber-100/50"
                />
              </div>
            </div>
            
            <div className="bg-emerald-900/30 p-6 rounded-xl border border-emerald-600/20">
              <h2 className="text-xl font-bold mb-4">Resume Upload</h2>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
              />
              
              <div className="mb-2">
                <button
                  type="button"
                  onClick={handleFileButtonClick}
                  className="py-3 px-4 bg-emerald-700/60 rounded-xl hover:bg-emerald-600/60 
                    transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  Upload Resume (PDF)
                </button>
              </div>
              
              {resumeFileName && (
                <div className="mt-2 p-3 bg-emerald-800/40 rounded-xl border border-emerald-600/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span className="truncate max-w-xs">{resumeFileName}</span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setResumeFile(null);
                      setResumeFileName('');
                    }}
                    className="text-amber-100/70 hover:text-amber-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              )}
              
              {fileError && (
                <p className="mt-2 text-red-300">{fileError}</p>
              )}
              
              <p className="mt-3 text-green-200/70 text-sm">
                Please upload your resume in PDF format (5MB max)
              </p>
            </div>
            
            <div className="bg-emerald-900/30 p-6 rounded-xl border border-emerald-600/20">
              <h2 className="text-xl font-bold mb-4">Additional Information</h2>
              
              <div className="mb-4">
                <label className="block mb-1 text-green-200" htmlFor="coverLetter">Cover Letter</label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-emerald-800/40 text-amber-100 p-3 rounded-xl border border-emerald-600/30 
                    focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300
                    placeholder:text-amber-100/50"
                  placeholder="Tell us why you're interested in this position and why you'd be a good fit..."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-green-200" htmlFor="availability">Availability</label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                    className="w-full bg-emerald-800/40 text-amber-100 p-3 rounded-xl border border-emerald-600/30 
                      focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300
                      appearance-none"
                  >
                    <option value="" disabled className="bg-emerald-800 text-amber-100">Select availability</option>
                    <option value="immediately" className="bg-emerald-800 text-amber-100">Immediately</option>
                    <option value="2weeks" className="bg-emerald-800 text-amber-100">2 weeks</option>
                    <option value="1month" className="bg-emerald-800 text-amber-100">1 month</option>
                    <option value="other" className="bg-emerald-800 text-amber-100">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 text-green-200" htmlFor="expectedSalary">Expected Salary</label>
                  <input
                    type="text"
                    id="expectedSalary"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="w-full bg-emerald-800/40 text-amber-100 p-3 rounded-xl border border-emerald-600/30 
                      focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300
                      placeholder:text-amber-100/50"
                  />
                </div>
              </div>
            </div>
            
            {submitError && (
              <div className="p-4 bg-red-900/30 border border-red-700/50 rounded-xl text-red-200">
                {submitError}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl 
                text-lg font-bold transition-all duration-300 relative overflow-hidden
                ${isSubmitting ? 'opacity-90' : 'hover:from-emerald-500 hover:to-green-400 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-800/50'}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                <span className="relative z-10">Submit Application</span>
              )}
              <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left 
                transition-transform duration-500 bg-gradient-to-r from-emerald-500/50 to-green-400/50"></div>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;