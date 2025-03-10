import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FindJob = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('All');
  const [jobType, setJobType] = useState('All');
  
  // Sample job data - would typically come from an API
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'New York', category: 'Development', type: 'Full-time', 
      description: 'Looking for an experienced React developer to join our team.' },
    { id: 2, title: 'UX Designer', company: 'DesignHub', location: 'Remote', category: 'Design', type: 'Contract', 
      description: 'Create beautiful user experiences for our clients.' },
    { id: 3, title: 'Data Analyst', company: 'DataSphere', location: 'Chicago', category: 'Analytics', type: 'Part-time', 
      description: 'Help us make sense of complex data sets.' },
    { id: 4, title: 'Project Manager', company: 'GlobalSystems', location: 'Boston', category: 'Management', type: 'Full-time', 
      description: 'Lead our development team to success.' }
  ]);
  
  const [selectedJob, setSelectedJob] = useState(null);
  
  const categories = ['All', 'Development', 'Design', 'Analytics', 'Management', 'Marketing'];
  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship'];
  
  const filteredJobs = jobs.filter(job => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase()) &&
      (category === 'All' || job.category === category) &&
      (jobType === 'All' || job.type === jobType)
    );
  });
  const navigate = useNavigate();
  
  const handleApply = (jobId) => {
    navigate('ApplytoJob', { state: { job: selectedJob } });

  };
  
  return (
    <div id='findJob' className=" w-full min-h-screen flex bg-gradient-to-r from-[#16222A] to-[#3A6073] py-8 px-4">
      <div className="w-full bg-gradient-to-r from-[#093028] to-[#237A57] p-4 md:p-8 lg:p-10 
        rounded-br-[50px] md:rounded-br-[100px] lg:rounded-br-[150px] 
        rounded-tl-[50px] md:rounded-tl-[100px] lg:rounded-tl-[150px] 
        rounded-[20px] text-amber-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-['Poppins'] font-bold text-4xl md:text-5xl lg:text-6xl">
            Find Your Dream Job
          </h1>
          <p className="mt-2 text-lg md:text-xl text-green-200">
            Discover opportunities that match your skills and aspirations
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="w-full bg-emerald-900/30 p-4 md:p-6 rounded-[30px] mb-8 backdrop-blur-sm border border-emerald-600/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Job Title Search */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Job Title or Keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-emerald-800/40 text-amber-100 p-3 rounded-xl border border-emerald-600/30 
                  focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300
                  placeholder:text-amber-100/50"
              />
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-emerald-400/20 to-transparent opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 rounded-tr-xl"></div>
            </div>
            
            {/* Location Search */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-emerald-800/40 text-amber-100 p-3 rounded-xl border border-emerald-600/30 
                  focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300
                  placeholder:text-amber-100/50"
              />
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-lime-400/20 to-transparent opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 rounded-bl-xl"></div>
            </div>
            
            {/* Category Dropdown */}
            <div className="relative group">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-emerald-800/40 text-amber-100 p-3 rounded-xl border border-emerald-600/30 
                  focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300
                  appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-emerald-800 text-amber-100">
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
                <div className="w-4 h-4 border-r-2 border-b-2 border-amber-100 transform rotate-45 translate-y-[-4px]"></div>
              </div>
              <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-green-400/20 to-transparent opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 rounded-tl-xl"></div>
            </div>
            
            {/* Job Type Dropdown */}
            <div className="relative group">
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full bg-emerald-800/40 text-amber-100 p-3 rounded-xl border border-emerald-600/30 
                  focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300
                  appearance-none cursor-pointer"
              >
                {jobTypes.map((type) => (
                  <option key={type} value={type} className="bg-emerald-800 text-amber-100">
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
                <div className="w-4 h-4 border-r-2 border-b-2 border-amber-100 transform rotate-45 translate-y-[-4px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-teal-400/20 to-transparent opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 rounded-br-xl"></div>
            </div>
          </div>
        </div>
        
        {/* Job Listings and Detail Split View */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Job Listings */}
          <div className="w-full lg:w-1/2 bg-emerald-900/20 rounded-[30px] p-4 max-h-[600px] overflow-y-auto
            border border-emerald-600/20 backdrop-blur-sm relative">
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-8 w-8 h-8 bg-lime-300 opacity-20 rotate-12 animate-pulse"></div>
            <div className="absolute bottom-8 left-12 w-6 h-6 bg-teal-400 opacity-30 rotate-6 animate-bounce"></div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Available Positions</h2>
            
            {filteredJobs.length === 0 ? (
              <div className="text-center p-8 text-amber-100/80">
                <p className="text-xl mb-2">No jobs match your search criteria</p>
                <p>Try adjusting your filters to see more results</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div 
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 
                      group relative overflow-hidden ${selectedJob?.id === job.id 
                        ? 'bg-emerald-600/40 shadow-lg' 
                        : 'bg-emerald-800/30 hover:bg-emerald-700/30'}`}
                  >
                    {/* Decorative corner square */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-emerald-400/20 to-transparent 
                      opacity-40 group-hover:opacity-80 transition-all duration-500 rotate-6"></div>
                    
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <p className="text-green-200">{job.company} • {job.location}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-emerald-700/60 rounded-lg text-sm">{job.category}</span>
                      <span className="px-2 py-1 bg-emerald-700/60 rounded-lg text-sm">{job.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Job Details */}
          <div className="w-full lg:w-1/2 bg-emerald-900/20 rounded-[30px] p-6 border border-emerald-600/20 
            backdrop-blur-sm flex flex-col min-h-[400px] relative">
            
            {/* Decorative elements */}
            <div className="absolute top-1/4 left-4 w-10 h-10 bg-green-200 opacity-20 rotate-45"></div>
            <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-emerald-300 opacity-15 -rotate-12"></div>
            <div className="absolute bottom-6 left-6 w-8 h-8 border-2 border-green-200 opacity-30 rotate-12"></div>
            
            {selectedJob ? (
              <>
                <div className="relative mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold">{selectedJob.title}</h2>
                  <div className="absolute -bottom-2 left-0 w-16 h-1 bg-green-400/70 rounded-full"></div>
                </div>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-emerald-600/60 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.5 2.5a8 8 0 100 16 8 8 0 000-16zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z" />
                      </svg>
                    </div>
                    <span>{selectedJob.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-emerald-600/60 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                      </svg>
                    </div>
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-emerald-600/60 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                      </svg>
                    </div>
                    <span>{selectedJob.type}</span>
                  </div>
                </div>
                
                <div className="mb-8 flex-grow">
                  <h3 className="text-xl font-bold mb-2">Job Description</h3>
                  <p className="text-amber-100/90">{selectedJob.description}</p>
                  
                  <div className="mt-4">
                    <h3 className="text-xl font-bold mb-2">Requirements</h3>
                    <ul className="list-disc pl-5 text-amber-100/90 space-y-1">
                      <li>Minimum 2 years of relevant experience</li>
                      <li>Strong problem-solving abilities</li>
                      <li>Excellent communication skills</li>
                      <li>Bachelor's degree or equivalent practical experience</li>
                    </ul>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleApply(selectedJob.id)}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl 
                    text-lg font-bold hover:from-emerald-500 hover:to-green-400 transition-all duration-300
                    shadow-lg shadow-emerald-900/30 hover:shadow-emerald-800/50 group relative overflow-hidden"
                >
                  <span className="relative z-10">Apply Now</span>
                  <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left 
                    transition-transform duration-500 bg-gradient-to-r from-emerald-500/50 to-green-400/50"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-green-300/30 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-emerald-700/40 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Select a Job</h3>
                <p className="text-amber-100/80 max-w-md">
                  Click on a job from the list to view details and apply
                </p>
              </div>
            )}
          </div>
        </div>
        
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

export default FindJob;