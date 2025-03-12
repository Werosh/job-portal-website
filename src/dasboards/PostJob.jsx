import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    location: '',
    category: 'Development',
    jobType: 'Full-time',
    salary: '',
    description: '',
    requirements: '',
    responsibilities: '',
    contactEmail: '',
    applicationDeadline: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  
  const categories = ['Development', 'Design', 'Analytics', 'Management', 'Marketing', 'Sales', 'Customer Service', 'Other'];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const errors = {};
    const requiredFields = ['jobTitle', 'company', 'location', 'description', 'contactEmail'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      errors.contactEmail = 'Please enter a valid email address';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call to post job
      setTimeout(() => {
        console.log('Job posting data:', formData);
        setIsSubmitting(false);
        setSubmissionSuccess(true);
        
        // Redirect after success message is shown
        setTimeout(() => {
          navigate('/findJob');
        }, 2000);
      }, 1500);
    }
  };
  
  return (
    <div id="postJob" className="w-full min-h-screen flex bg-gradient-to-r from-[#16222A] to-[#3A6073] py-8 px-4">
      <div className="w-full bg-gradient-to-r from-[#093028] to-[#237A57] p-4 md:p-8 lg:p-10 
        rounded-br-[50px] md:rounded-br-[100px] lg:rounded-br-[150px] 
        rounded-tl-[50px] md:rounded-tl-[100px] lg:rounded-tl-[150px] 
        rounded-[20px] text-amber-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-['Poppins'] font-bold text-4xl md:text-5xl lg:text-6xl">
            Post a Job
          </h1>
          <p className="mt-2 text-lg md:text-xl text-green-200">
            Find the perfect candidate for your position
          </p>
        </div>
        
        {submissionSuccess ? (
          <div className="max-w-3xl mx-auto bg-emerald-800/30 rounded-xl p-6 text-center">
            <div className="w-20 h-20 bg-emerald-600/40 rounded-full mx-auto flex items-center justify-center mb-4">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Job Posted Successfully!</h2>
            <p className="text-amber-100/80 mb-4">
              Your job listing has been submitted and will be visible to candidates shortly.
            </p>
            <p className="text-green-200">Redirecting you to the jobs page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-emerald-900/30 p-6 rounded-[30px] backdrop-blur-sm border border-emerald-600/20">
            <div className="relative">
              <div className="absolute top-4 right-8 w-10 h-10 bg-lime-300 opacity-20 rotate-12 animate-pulse"></div>
              <div className="absolute bottom-8 left-12 w-6 h-6 bg-teal-400 opacity-30 rotate-6 animate-bounce"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Job Title */}
              <div className="relative group">
                <label className="block text-amber-100 mb-2 font-medium">Job Title*</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Frontend Developer"
                  className={`w-full px-4 py-3 bg-emerald-800/40 text-amber-100 rounded-xl border ${
                    formErrors.jobTitle ? 'border-red-500' : 'border-emerald-600/30'
                  } focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300 placeholder:text-amber-100/50`}
                />
                {formErrors.jobTitle && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.jobTitle}</p>
                )}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-emerald-400/20 to-transparent opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300 rounded-tr-xl"></div>
              </div>
              
              {/* Company */}
              <div className="relative group">
                <label className="block text-amber-100 mb-2 font-medium">Company*</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g. Acme Inc."
                  className={`w-full px-4 py-3 bg-emerald-800/40 text-amber-100 rounded-xl border ${
                    formErrors.company ? 'border-red-500' : 'border-emerald-600/30'
                  } focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300 placeholder:text-amber-100/50`}
                />
                {formErrors.company && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.company}</p>
                )}
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-lime-400/20 to-transparent opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300 rounded-bl-xl"></div>
              </div>
              
              {/* Location */}
              <div className="relative group">
                <label className="block text-amber-100 mb-2 font-medium">Location*</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. New York or Remote"
                  className={`w-full px-4 py-3 bg-emerald-800/40 text-amber-100 rounded-xl border ${
                    formErrors.location ? 'border-red-500' : 'border-emerald-600/30'
                  } focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300 placeholder:text-amber-100/50`}
                />
                {formErrors.location && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.location}</p>
                )}
                <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-green-400/20 to-transparent opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300 rounded-tl-xl"></div>
              </div>
              
              {/* Category Dropdown */}
              <div className="relative group">
                <label className="block text-amber-100 mb-2 font-medium">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-emerald-800/40 text-amber-100 rounded-xl border border-emerald-600/30 
                    focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300
                    appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-emerald-800 text-amber-100">
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute top-1/2 right-3 transform translate-y-3 pointer-events-none">
                  <div className="w-4 h-4 border-r-2 border-b-2 border-amber-100 transform rotate-45 translate-y-[-4px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-teal-400/20 to-transparent opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300 rounded-br-xl"></div>
              </div>
              
              {/* Job Type Dropdown */}
              <div className="relative group">
                <label className="block text-amber-100 mb-2 font-medium">Job Type</label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-emerald-800/40 text-amber-100 rounded-xl border border-emerald-600/30 
                    focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300
                    appearance-none cursor-pointer"
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type} className="bg-emerald-800 text-amber-100">
                      {type}
                    </option>
                  ))}
                </select>
                <div className="absolute top-1/2 right-3 transform translate-y-3 pointer-events-none">
                  <div className="w-4 h-4 border-r-2 border-b-2 border-amber-100 transform rotate-45 translate-y-[-4px]"></div>
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-emerald-400/20 to-transparent opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300 rounded-tr-xl"></div>
              </div>
              
              {/* Salary Range */}
              <div className="relative group">
                <label className="block text-amber-100 mb-2 font-medium">Salary Range (Optional)</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="e.g. $60,000 - $80,000 per year"
                  className="w-full px-4 py-3 bg-emerald-800/40 text-amber-100 rounded-xl border border-emerald-600/30 
                    focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300 placeholder:text-amber-100/50"
                />
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-lime-400/20 to-transparent opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300 rounded-bl-xl"></div>
              </div>
              
              {/* Contact Email */}
              <div className="relative group">
                <label className="block text-amber-100 mb-2 font-medium">Contact Email*</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="e.g. jobs@company.com"
                  className={`w-full px-4 py-3 bg-emerald-800/40 text-amber-100 rounded-xl border ${
                    formErrors.contactEmail ? 'border-red-500' : 'border-emerald-600/30'
                  } focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300 placeholder:text-amber-100/50`}
                />
                {formErrors.contactEmail && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.contactEmail}</p>
                )}
                <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-green-400/20 to-transparent opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300 rounded-tl-xl"></div>
              </div>
              
              {/* Application Deadline */}
              <div className="relative group">
                <label className="block text-amber-100 mb-2 font-medium">Application Deadline (Optional)</label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-emerald-800/40 text-amber-100 rounded-xl border border-emerald-600/30 
                    focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300"
                />
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-teal-400/20 to-transparent opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300 rounded-br-xl"></div>
              </div>
            </div>
            
            {/* Job Description */}
            <div className="mb-6 relative group">
              <label className="block text-amber-100 mb-2 font-medium">Job Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the role, responsibilities, and ideal candidate..."
                rows="5"
                className={`w-full px-4 py-3 bg-emerald-800/40 text-amber-100 rounded-xl border ${
                  formErrors.description ? 'border-red-500' : 'border-emerald-600/30'
                } focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300 placeholder:text-amber-100/50`}
              ></textarea>
              {formErrors.description && (
                <p className="text-red-400 text-sm mt-1">{formErrors.description}</p>
              )}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-emerald-400/20 to-transparent opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 rounded-tr-xl"></div>
            </div>
            
            {/* Key Requirements */}
            <div className="mb-6 relative group">
              <label className="block text-amber-100 mb-2 font-medium">Key Requirements (Optional)</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="List the key qualifications and requirements..."
                rows="3"
                className="w-full px-4 py-3 bg-emerald-800/40 text-amber-100 rounded-xl border border-emerald-600/30 
                  focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300 placeholder:text-amber-100/50"
              ></textarea>
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-lime-400/20 to-transparent opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 rounded-bl-xl"></div>
            </div>
            
            {/* Responsibilities */}
            <div className="mb-8 relative group">
              <label className="block text-amber-100 mb-2 font-medium">Responsibilities (Optional)</label>
              <textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleInputChange}
                placeholder="Detail the day-to-day responsibilities of this role..."
                rows="3"
                className="w-full px-4 py-3 bg-emerald-800/40 text-amber-100 rounded-xl border border-emerald-600/30 
                  focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300 placeholder:text-amber-100/50"
              ></textarea>
              <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-green-400/20 to-transparent opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 rounded-tl-xl"></div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-center">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="min-w-44 py-4 px-8 bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl 
                  text-lg font-bold hover:from-emerald-500 hover:to-green-400 transition-all duration-300
                  shadow-lg shadow-emerald-900/30 hover:shadow-emerald-800/50 group relative overflow-hidden
                  disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Post Job'}
                </span>
                <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left 
                  transition-transform duration-500 bg-gradient-to-r from-emerald-500/50 to-green-400/50"></div>
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-green-300/30 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>
            
            {/* Notes */}
            <p className="text-center text-sm text-amber-100/60 mt-4">
              * Fields marked with an asterisk are required
            </p>
          </form>
        )}
        
        {/* Animated bottom decoration */}
        <div className="mt-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-2 bg-gradient-to-r from-green-400/30 via-emerald-500/50 to-green-400/30 rounded-full"></div>
            <div className="absolute -top-6 left-1/3 w-4 h-4 bg-lime-300/40 rotate-12 animate-pulse"></div>
            <div className="absolute -bottom-6 right-1/3 w-3 h-3 bg-emerald-300/40 -rotate-12 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;