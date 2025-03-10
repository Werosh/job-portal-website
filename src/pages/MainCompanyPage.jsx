import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Building,
  Users,
  MapPin,
  Calendar,
  Award,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Globe,
  Mail,
  Clock,
  Search,
  Filter,
  ArrowUpRight,
  Plus,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const MainCompanyPage = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Sample companies data - would typically come from an API
  const companiesData = [
    {
      id: 1,
      name: "TechInnovate Solutions",
      logo: "https://cdn.logojoy.com/wp-content/uploads/2018/05/30162609/1332.png",
      founded: "2015",
      employees: "100-250",
      location: "San Francisco, CA",
      industry: "Technology",
      website: "techinnovate.example.com",
      about:
        "TechInnovate Solutions is a forward-thinking technology company dedicated to creating innovative software solutions that empower businesses to thrive in the digital age. Our team of experts combines deep technical knowledge with creative problem-solving to deliver cutting-edge products that meet the evolving needs of our clients.",
      mission:
        "To revolutionize business processes through intuitive, powerful, and sustainable technology solutions.",
      culture:
        "We foster a collaborative, inclusive environment where creativity and innovation are encouraged. Our team members are empowered to take ownership of their work and contribute to the company's mission in meaningful ways.",
      benefits: [
        "Competitive salary and equity packages",
        "Comprehensive health, dental, and vision coverage",
        "Flexible work arrangements and unlimited PTO",
        "Professional development stipend",
        "Wellness programs and gym membership",
      ],
      openings: [
        {
          id: 1,
          title: "Senior Frontend Developer",
          department: "Engineering",
          type: "Full-time",
          location: "San Francisco, CA",
        },
        {
          id: 2,
          title: "UX/UI Designer",
          department: "Design",
          type: "Full-time",
          location: "Remote",
        },
      ],
      faqs: [
        {
          id: 1,
          question: "What is the interview process like?",
          answer:
            "Our interview process typically consists of an initial phone screening, followed by a technical assessment, and finally an onsite or virtual panel interview with team members from various departments.",
        },
        {
          id: 2,
          question: "Do you offer relocation assistance?",
          answer:
            "Yes, we offer relocation packages for full-time positions that include moving expenses and temporary housing assistance.",
        },
      ],
    },
    {
      id: 2,
      name: "GreenEarth Ventures",
      logo: "https://www.designhill.com/resize_img.php?atyp=page_file&pth=ft_ca_ct||123||contestfile_1&flp=1563517809-3401829025d316371d6f302-72515596.jpg",
      founded: "2018",
      employees: "50-100",
      location: "Austin, TX",
      industry: "Sustainability",
      website: "greenearth.example.com",
      about:
        "GreenEarth Ventures is committed to promoting sustainable practices by investing in and developing clean energy solutions. We partner with innovators in the renewable energy sector to create a more sustainable future for our planet.",
      mission:
        "To accelerate the transition to clean energy and sustainable practices around the world.",
      culture:
        "Our team is driven by a shared passion for environmental stewardship. We believe in leading by example, fostering open communication, and celebrating diversity of thought and background.",
      benefits: [
        "Competitive compensation packages",
        "Full health and wellness benefits",
        "Monthly sustainability stipend",
        "Flexible remote work options",
        "Four-day workweek option",
      ],
      openings: [
        {
          id: 1,
          title: "Environmental Scientist",
          department: "Research",
          type: "Full-time",
          location: "Austin, TX",
        },
        {
          id: 2,
          title: "Sustainability Consultant",
          department: "Consulting",
          type: "Contract",
          location: "Remote",
        },
      ],
      faqs: [
        {
          id: 1,
          question: "What kind of projects will I work on?",
          answer:
            "Our projects range from solar and wind energy installations to developing innovative waste reduction solutions and sustainable agricultural practices.",
        },
        {
          id: 2,
          question: "What is your company's approach to work-life balance?",
          answer:
            "We believe that well-rested employees are more creative and productive. We offer flexible scheduling, including a four-day workweek option, and encourage our team to disconnect completely during non-working hours.",
        },
      ],
    },
    {
      "id": 3,
      "name": "EcoInnovate Solutions",
      "logo": "https://static.vecteezy.com/system/resources/previews/051/878/087/non_2x/letter-h-and-i-hitech-modern-logo-vector.jpg",
      "founded": "2015",
      "employees": "100-200",
      "location": "San Francisco, CA",
      "industry": "Sustainability",
      "website": "ecoinnovate.example.com",
      "about": "EcoInnovate Solutions is dedicated to designing and implementing cutting-edge green technologies to help businesses and communities reduce their carbon footprint. Our team of engineers, scientists, and strategists collaborates to drive impactful environmental change.",
      "mission": "To create a cleaner, more efficient world by developing and implementing innovative green technologies.",
      "culture": "We foster a culture of curiosity, collaboration, and impact-driven innovation. Our team is passionate about pushing the boundaries of sustainability while maintaining a healthy work-life balance.",
      "benefits": [
        "Generous stock options",
        "Comprehensive health insurance",
        "Paid volunteer days",
        "Hybrid work options",
        "Annual eco-retreat for team building"
      ],
      "openings": [
        {
          "id": 1,
          "title": "Renewable Energy Engineer",
          "department": "Engineering",
          "type": "Full-time",
          "location": "San Francisco, CA"
        },
        {
          "id": 2,
          "title": "Sustainable Product Designer",
          "department": "Product Development",
          "type": "Remote",
          "location": "Remote"
        }
      ],
      "faqs": [
        {
          "id": 1,
          "question": "What industries do you serve?",
          "answer": "We work with a variety of industries, including construction, agriculture, and technology, to integrate sustainable solutions into their operations."
        },
        {
          "id": 2,
          "question": "Do you offer remote work opportunities?",
          "answer": "Yes! Many of our positions are remote-friendly, and we provide the necessary tools and support for remote collaboration."
        }
      ]
    },
    {
      id: 4,
      name: "MediCare Innovations",
      logo: "https://img.lovepik.com/element/40174/0048.png_1200.png",
      founded: "2010",
      employees: "250-500",
      location: "Boston, MA",
      industry: "Healthcare",
      website: "medicare-innovations.example.com",
      about:
        "MediCare Innovations is at the forefront of healthcare technology, developing solutions that improve patient outcomes and streamline clinical workflows. Our products are used in hospitals and clinics worldwide.",
      mission:
        "To transform healthcare delivery through innovative technology that puts patients first.",
      culture:
        "We combine the rigor of medical science with the agility of a tech startup. Our team values intellectual curiosity, interdisciplinary collaboration, and a commitment to improving lives.",
      benefits: [
        "Industry-leading healthcare coverage",
        "Retirement plan with generous matching",
        "Continuing education support",
        "Onsite fitness center",
        "Parental leave program",
      ],
      openings: [
        {
          id: 1,
          title: "Clinical Data Scientist",
          department: "Research",
          type: "Full-time",
          location: "Boston, MA",
        },
        {
          id: 2,
          title: "Healthcare Software Engineer",
          department: "Engineering",
          type: "Full-time",
          location: "Boston, MA",
        },
      ],
      faqs: [
        {
          id: 1,
          question: "Do I need a healthcare background to work here?",
          answer:
            "While some positions require healthcare experience or credentials, many roles do not. We value diverse perspectives and provide training on healthcare-specific knowledge as needed.",
        },
        {
          id: 2,
          question: "How do you ensure your products meet medical standards?",
          answer:
            "We follow strict regulatory compliance protocols and collaborate closely with healthcare professionals throughout our product development cycle. All products undergo rigorous testing and validation before release.",
        },
      ],
    },
    {
      "id": 5,
      "name": "TerraTech Innovations",
      "logo": "https://www.creativehatti.com/wp-content/uploads/edd/2023/03/Connectivity-logo-design-for-technology-company-22-large.jpg",
      "founded": "2020",
      "employees": "25-50",
      "location": "Boulder, CO",
      "industry": "Environmental Technology",
      "website": "terratech.example.com",
      "about": "TerraTech Innovations pioneers smart environmental monitoring solutions, helping companies and municipalities track and optimize their environmental impact in real time.",
      "mission": "To leverage technology to create a more sustainable and data-driven approach to environmental conservation.",
      "culture": "We believe in the power of technology to drive change. Our team is a mix of scientists, technologists, and environmentalists who value transparency, continuous learning, and collaborative problem-solving.",
      "benefits": [
        "Equity opportunities in a growing company",
        "Health and dental coverage",
        "Flexible time off policy",
        "Work-from-anywhere policy",
        "Annual sustainability grant for personal green projects"
      ],
      "openings": [
        {
          "id": 1,
          "title": "Environmental Data Analyst",
          "department": "Data Science",
          "type": "Full-time",
          "location": "Boulder, CO"
        },
        {
          "id": 2,
          "title": "Software Engineer (IoT)",
          "department": "Technology",
          "type": "Remote",
          "location": "Remote"
        }
      ],
      "faqs": [
        {
          "id": 1,
          "question": "What technologies do you use?",
          "answer": "We use AI, IoT, and cloud computing to develop scalable environmental monitoring solutions."
        },
        {
          "id": 2,
          "question": "Does TerraTech collaborate with nonprofits?",
          "answer": "Yes! We actively partner with conservation organizations to apply our technology to environmental protection initiatives."
        }
      ]
    },
    {
      "id": 6,
      "name": "Blue Horizon Consulting",
      "logo": "https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/1631/posts/32707/item-list-card/TechLogos02_copy.jpg",
      "founded": "2012",
      "employees": "200-300",
      "location": "New York, NY",
      "industry": "Sustainability Consulting",
      "website": "bluehorizon.example.com",
      "about": "Blue Horizon Consulting helps businesses transition to sustainable practices, offering strategic guidance on corporate sustainability, carbon neutrality, and ESG compliance.",
      "mission": "To empower businesses to lead in sustainability by providing expert guidance and actionable strategies.",
      "culture": "We are a purpose-driven team that thrives on collaboration and long-term impact. Our workplace is fast-paced yet supportive, valuing professional growth and meaningful contributions to environmental solutions.",
      "benefits": [
        "Competitive salary and performance bonuses",
        "Comprehensive health, dental, and vision insurance",
        "Paid professional development programs",
        "Flexible work arrangements",
        "Employee-led sustainability initiatives"
      ],
      "openings": [
        {
          "id": 1,
          "title": "Corporate Sustainability Advisor",
          "department": "Consulting",
          "type": "Full-time",
          "location": "New York, NY"
        },
        {
          "id": 2,
          "title": "Carbon Footprint Analyst",
          "department": "Analytics",
          "type": "Remote",
          "location": "Remote"
        }
      ],
      "faqs": [
        {
          "id": 1,
          "question": "What types of clients do you work with?",
          "answer": "We collaborate with Fortune 500 companies, startups, and government agencies to develop and implement sustainability strategies."
        },
        {
          "id": 2,
          "question": "How does Blue Horizon support employee growth?",
          "answer": "We offer mentorship programs, industry certifications, and conference opportunities to support continuous learning and career development."
        }
      ]
    },
    {
      "id": 7,
      "name": "Digital Health Partners",
      "logo": "https://static.vecteezy.com/system/resources/previews/007/619/674/non_2x/modern-hexagon-tech-logo-designs-concept-hexa-technology-logo-template-vector.jpg",
      "founded": "2016",
      "employees": "100-200",
      "location": "Seattle, WA",
      "industry": "Healthcare",
      "website": "digitalhealth.example.com",
      "about": "Digital Health Partners creates innovative telehealth solutions and mobile health applications that connect patients with care providers, improve treatment adherence, and enhance overall healthcare experiences.",
      "mission": "To make quality healthcare accessible to everyone through technology and innovation.",
      "culture": "We maintain a dynamic, patient-centered culture where every team member contributes to improving healthcare access and outcomes through technology.",
      "benefits": [
        "Competitive compensation with healthcare industry benchmarking",
        "Premium medical insurance with no employee contribution required",
        "401(k) with generous matching",
        "Mental health support programs",
        "Hybrid work model with flexible scheduling"
      ],
      "openings": [
        {
          "id": 1,
          "title": "Mobile App Developer",
          "department": "Engineering",
          "type": "Full-time",
          "location": "Seattle, WA"
        },
        {
          "id": 2,
          "title": "Healthcare Product Manager",
          "department": "Product",
          "type": "Full-time",
          "location": "Seattle, WA"
        }
      ],
      "faqs": [
        {
          "id": 1,
          "question": "What technology stack does your company use?",
          "answer": "We primarily use React Native for mobile development, React for web applications, Node.js for backend services, and AWS for our cloud infrastructure."
        },
        {
          "id": 2,
          "question": "How does your company handle patient data privacy?",
          "answer": "We maintain HIPAA compliance across all our products and systems. All employees undergo regular privacy and security training, and we conduct routine audits of our data handling practices."
        }
      ]
    },
    {
      "id": 5,
      "name": "TerraTech Innovations",
      "logo": "https://www.creativehatti.com/wp-content/uploads/edd/2023/03/Connectivity-logo-design-for-technology-company-22-large.jpg",
      "founded": "2020",
      "employees": "25-50",
      "location": "Boulder, CO",
      "industry": "Environmental Technology",
      "website": "terratech.example.com",
      "about": "TerraTech Innovations pioneers smart environmental monitoring solutions, helping companies and municipalities track and optimize their environmental impact in real time.",
      "mission": "To leverage technology to create a more sustainable and data-driven approach to environmental conservation.",
      "culture": "We believe in the power of technology to drive change. Our team is a mix of scientists, technologists, and environmentalists who value transparency, continuous learning, and collaborative problem-solving.",
      "benefits": [
        "Equity opportunities in a growing company",
        "Health and dental coverage",
        "Flexible time off policy",
        "Work-from-anywhere policy",
        "Annual sustainability grant for personal green projects"
      ],
      "openings": [
        {
          "id": 1,
          "title": "Environmental Data Analyst",
          "department": "Data Science",
          "type": "Full-time",
          "location": "Boulder, CO"
        },
        {
          "id": 2,
          "title": "Software Engineer (IoT)",
          "department": "Technology",
          "type": "Remote",
          "location": "Remote"
        }
      ],
      "faqs": [
        {
          "id": 1,
          "question": "What technologies do you use?",
          "answer": "We use AI, IoT, and cloud computing to develop scalable environmental monitoring solutions."
        },
        {
          "id": 2,
          "question": "Does TerraTech collaborate with nonprofits?",
          "answer": "Yes! We actively partner with conservation organizations to apply our technology to environmental protection initiatives."
        }
      ]
    },
    {
      "id": 6,
      "name": "Blue Horizon Consulting",
      "logo": "https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/1631/posts/32707/item-list-card/TechLogos02_copy.jpg",
      "founded": "2012",
      "employees": "200-300",
      "location": "New York, NY",
      "industry": "Sustainability Consulting",
      "website": "bluehorizon.example.com",
      "about": "Blue Horizon Consulting helps businesses transition to sustainable practices, offering strategic guidance on corporate sustainability, carbon neutrality, and ESG compliance.",
      "mission": "To empower businesses to lead in sustainability by providing expert guidance and actionable strategies.",
      "culture": "We are a purpose-driven team that thrives on collaboration and long-term impact. Our workplace is fast-paced yet supportive, valuing professional growth and meaningful contributions to environmental solutions.",
      "benefits": [
        "Competitive salary and performance bonuses",
        "Comprehensive health, dental, and vision insurance",
        "Paid professional development programs",
        "Flexible work arrangements",
        "Employee-led sustainability initiatives"
      ],
      "openings": [
        {
          "id": 1,
          "title": "Corporate Sustainability Advisor",
          "department": "Consulting",
          "type": "Full-time",
          "location": "New York, NY"
        },
        {
          "id": 2,
          "title": "Carbon Footprint Analyst",
          "department": "Analytics",
          "type": "Remote",
          "location": "Remote"
        }
      ],
      "faqs": [
        {
          "id": 1,
          "question": "What types of clients do you work with?",
          "answer": "We collaborate with Fortune 500 companies, startups, and government agencies to develop and implement sustainability strategies."
        },
        {
          "id": 2,
          "question": "How does Blue Horizon support employee growth?",
          "answer": "We offer mentorship programs, industry certifications, and conference opportunities to support continuous learning and career development."
        }
      ]
    },
    {
      "id": 7,
      "name": "Digital Health Partners",
      "logo": "https://static.vecteezy.com/system/resources/previews/007/619/674/non_2x/modern-hexagon-tech-logo-designs-concept-hexa-technology-logo-template-vector.jpg",
      "founded": "2016",
      "employees": "100-200",
      "location": "Seattle, WA",
      "industry": "Healthcare",
      "website": "digitalhealth.example.com",
      "about": "Digital Health Partners creates innovative telehealth solutions and mobile health applications that connect patients with care providers, improve treatment adherence, and enhance overall healthcare experiences.",
      "mission": "To make quality healthcare accessible to everyone through technology and innovation.",
      "culture": "We maintain a dynamic, patient-centered culture where every team member contributes to improving healthcare access and outcomes through technology.",
      "benefits": [
        "Competitive compensation with healthcare industry benchmarking",
        "Premium medical insurance with no employee contribution required",
        "401(k) with generous matching",
        "Mental health support programs",
        "Hybrid work model with flexible scheduling"
      ],
      "openings": [
        {
          "id": 1,
          "title": "Mobile App Developer",
          "department": "Engineering",
          "type": "Full-time",
          "location": "Seattle, WA"
        },
        {
          "id": 2,
          "title": "Healthcare Product Manager",
          "department": "Product",
          "type": "Full-time",
          "location": "Seattle, WA"
        }
      ],
      "faqs": [
        {
          "id": 1,
          "question": "What technology stack does your company use?",
          "answer": "We primarily use React Native for mobile development, React for web applications, Node.js for backend services, and AWS for our cloud infrastructure."
        },
        {
          "id": 2,
          "question": "How does your company handle patient data privacy?",
          "answer": "We maintain HIPAA compliance across all our products and systems. All employees undergo regular privacy and security training, and we conduct routine audits of our data handling practices."
        }
      ]
    }
  ];

  // Get unique industries for filter dropdown
  const industries = [
    ...new Set(companiesData.map((company) => company.industry)),
  ];

  // Filter companies based on search term and industry filter
  const filteredCompanies = companiesData.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.about.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry =
      filterIndustry === "" || company.industry === filterIndustry;
    return matchesSearch && matchesIndustry;
  });

  // Limit display to 6 companies unless "See More" is clicked
  const displayedCompanies = showAll
    ? filteredCompanies
    : filteredCompanies.slice(0, 6);

  const toggleFaq = (id) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setActiveTab("about");
    setExpandedFaq(null);
    // Scroll to top when selecting a company
    // window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedCompany(null);
  };

  const handleSeeMoreClick = () => {
    setShowAll(true);
  };

  const handleShowLessClick = () => {
    setShowAll(false);
    // Optionally scroll back to top when showing less
    // window.scrollTo(0, 0);
  };

  // Company List View
  if (!selectedCompany) {
    return (
      <div
        id="company"
        className="w-full min-h-screen flex bg-gradient-to-r from-[#16222A] to-[#3A6073] py-8 px-4"
      >
        <div
          className="w-full bg-gradient-to-r from-[#093028] to-[#237A57] p-4 md:p-8 lg:p-10 
          rounded-br-[50px] md:rounded-br-[100px] lg:rounded-br-[150px] 
          rounded-tl-[50px] md:rounded-tl-[100px] lg:rounded-tl-[150px] 
          rounded-[20px] text-amber-100 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-16 h-16 bg-lime-300 opacity-20 rotate-12 animate-pulse"></div>
          <div className="absolute bottom-20 left-16 w-12 h-12 bg-emerald-300 opacity-30 -rotate-12"></div>
          <div className="absolute top-1/4 left-10 w-8 h-8 bg-green-200 opacity-30 rotate-45"></div>
          <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-teal-400 opacity-15 rotate-6 animate-bounce"></div>

          {/* Header */}
          <div className="relative z-10 mb-8">
            <h1 className="font-['Poppins'] font-bold text-3xl md:text-4xl lg:text-5xl mb-3 text-center">
              Company Directory
            </h1>
            <p className="text-green-200 text-lg md:text-xl text-center mb-8">
              Discover innovative companies and exciting career opportunities
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-300" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 bg-emerald-900/40 border border-emerald-600/30 rounded-xl
                    text-amber-100 placeholder-amber-100/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-300" />
                <select
                  value={filterIndustry}
                  onChange={(e) => setFilterIndustry(e.target.value)}
                  className="py-3 pl-10 pr-8 bg-emerald-900/40 border border-emerald-600/30 rounded-xl
                    text-amber-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none"
                >
                  <option value="">All Industries</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-300 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Company List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-emerald-900/30 rounded-xl border border-emerald-600/20 overflow-hidden
                  hover:shadow-lg hover:shadow-emerald-900/30 transition-all duration-300 group cursor-pointer"
                onClick={() => handleCompanySelect(company)}
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-400"></div>
                      <img
                        src={company.logo}
                        alt={`${company.name} Logo`}
                        className="w-full h-full object-cover relative z-10 p-1"
                      />
                    </div>

                    <div>
                      <h2 className="font-bold text-xl group-hover:text-green-200 transition-colors">
                        {company.name}
                      </h2>
                      <p className="text-amber-100/80">{company.industry}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-4 flex-wrap">
                    <div className="flex items-center gap-1 text-amber-100/70">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{company.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-100/70">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{company.employees}</span>
                    </div>
                  </div>

                  <p className="text-amber-100/80 mb-4 line-clamp-3">
                    {company.about}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-emerald-300">
                      {company.openings.length} open positions
                    </span>
                    <span className="flex items-center gap-1 text-green-200 group-hover:text-green-100 transition-colors">
                      View Details
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* See More / Show Less Button */}
          {filteredCompanies.length > 6 && (
            <div className="flex justify-center mt-10">
              {!showAll ? (
                <button
                  onClick={handleSeeMoreClick}
                  className="py-3 px-8 bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl 
                  text-lg font-bold hover:from-emerald-500 hover:to-green-400 transition-all duration-300
                  shadow-lg shadow-emerald-900/30 hover:shadow-emerald-800/50 group relative overflow-hidden
                  flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span className="relative z-10">See More Companies</span>
                  <div
                    className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left 
                    transition-transform duration-500 bg-gradient-to-r from-emerald-500/50 to-green-400/50"
                  ></div>
                </button>
              ) : (
                <button
                  onClick={handleShowLessClick}
                  className="py-3 px-8 bg-gradient-to-r from-emerald-700 to-green-600 rounded-xl 
                  text-lg font-bold hover:from-emerald-600 hover:to-green-500 transition-all duration-300
                  shadow-lg shadow-emerald-900/30 hover:shadow-emerald-800/50 group relative overflow-hidden
                  flex items-center gap-2"
                >
                  <ChevronUp className="w-5 h-5" />
                  <span className="relative z-10">Show Less</span>
                  <div
                    className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left 
                    transition-transform duration-500 bg-gradient-to-r from-emerald-600/50 to-green-500/50"
                  ></div>
                </button>
              )}
            </div>
          )}

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl mb-2">No companies match your search</p>
              <p className="text-amber-100/70">
                Try adjusting your search criteria
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 text-center text-amber-100/70">
            <p>
              Showing {displayedCompanies.length} of {filteredCompanies.length}{" "}
              companies
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Individual Company View
  return (
    <div className="w-full min-h-screen flex bg-gradient-to-r from-[#16222A] to-[#3A6073] py-8 px-4">
      <div
        className="w-full bg-gradient-to-r from-[#093028] to-[#237A57] p-4 md:p-8 lg:p-10 
        rounded-br-[50px] md:rounded-br-[100px] lg:rounded-br-[150px] 
        rounded-tl-[50px] md:rounded-tl-[100px] lg:rounded-tl-[150px] 
        rounded-[20px] text-amber-100 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-16 h-16 bg-lime-300 opacity-20 rotate-12 animate-pulse"></div>
        <div className="absolute bottom-20 left-16 w-12 h-12 bg-emerald-300 opacity-30 -rotate-12"></div>
        <div className="absolute top-1/4 left-10 w-8 h-8 bg-green-200 opacity-30 rotate-45"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-teal-400 opacity-15 rotate-6 animate-bounce"></div>

        {/* Back button */}
        <button
          onClick={handleBackToList}
          className="flex items-center gap-2 mb-6 py-2 px-4 bg-emerald-800/50 rounded-[200px]  text-amber-100/90
            hover:bg-emerald-700/50 transition-colors"
        >
          <ChevronDown className="w-4 h-4 rotate-90" />
          Back to company list
        </button>

        {/* Company Header */}
        <div
          className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 
          bg-emerald-900/30 p-6 rounded-[30px] backdrop-blur-sm border border-emerald-600/20"
        >
          {/* Company Logo */}
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-400"></div>
            <img
              src={selectedCompany.logo}
              alt={`${selectedCompany.name} Logo`}
              className="w-full h-full object-cover relative z-10 p-2 transition-all duration-500 
                group-hover:p-1 group-hover:brightness-110"
            />
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-lime-300/30 rotate-12 z-0"></div>
          </div>

          {/* Company Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-['Poppins'] font-bold text-3xl md:text-4xl lg:text-5xl mb-2">
              {selectedCompany.name}
            </h1>
            <p className="text-green-200 text-lg mb-4">
              {selectedCompany.industry}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-300" />
                <span>{selectedCompany.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-300" />
                <span>Founded {selectedCompany.founded}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-300" />
                <span>{selectedCompany.employees} employees</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-300" />
                <span>{selectedCompany.website}</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="md:self-center">
            <button
              className="py-3 px-6 bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl 
              text-lg font-bold hover:from-emerald-500 hover:to-green-400 transition-all duration-300
              shadow-lg shadow-emerald-900/30 hover:shadow-emerald-800/50 group relative overflow-hidden"
            >
              <span className="relative z-10">Follow Company</span>
              <div
                className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left 
                transition-transform duration-500 bg-gradient-to-r from-emerald-500/50 to-green-400/50"
              ></div>
              <div
                className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-green-300/30 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto mb-8 gap-2 py-2 px-1">
          {["about", "jobs", "faqs"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-6 rounded-xl transition-all duration-300 whitespace-nowrap font-medium ${
                activeTab === tab
                  ? "bg-emerald-600/60 text-amber-100 shadow-md"
                  : "bg-emerald-800/30 text-amber-100/70 hover:bg-emerald-700/40"
              }`}
            >
              {tab === "about" && (
                <Building className="w-4 h-4 inline-block mr-2" />
              )}
              {tab === "jobs" && (
                <Briefcase className="w-4 h-4 inline-block mr-2" />
              )}
              {tab === "faqs" && (
                <Award className="w-4 h-4 inline-block mr-2" />
              )}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          className="bg-emerald-900/20 rounded-[30px] p-6 md:p-8 border border-emerald-600/20 
          backdrop-blur-sm min-h-[400px] relative"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-400/20 to-transparent opacity-40 rotate-6"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-lime-400/20 to-transparent opacity-30"></div>

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 relative">
                  About Us
                  <div className="absolute -bottom-2 left-0 w-16 h-1 bg-green-400/70 rounded-full"></div>
                </h2>
                <p className="mb-4 text-amber-100/90 leading-relaxed">
                  {selectedCompany.about}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-800/30 p-6 rounded-2xl border border-emerald-600/20 relative overflow-hidden group">
                  <div
                    className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-500/20 to-transparent 
                    opacity-40 group-hover:opacity-70 transition-opacity duration-500 rotate-6"
                  ></div>

                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-emerald-300" />
                    Our Mission
                  </h3>
                  <p className="text-amber-100/80">{selectedCompany.mission}</p>
                </div>

                <div className="bg-emerald-800/30 p-6 rounded-2xl border border-emerald-600/20 relative overflow-hidden group">
                  <div
                    className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-lime-500/20 to-transparent 
                    opacity-40 group-hover:opacity-70 transition-opacity duration-500 rotate-6"
                  ></div>

                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-emerald-300" />
                    Our Culture
                  </h3>
                  <p className="text-amber-100/80">{selectedCompany.culture}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Benefits & Perks</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedCompany.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-emerald-800/20 p-4 rounded-xl"
                    >
                      <div className="mt-1 w-5 h-5 bg-emerald-600/60 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-amber-100 rounded-full"></div>
                      </div>
                      <p className="text-amber-100/90">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold relative">
                  Open Positions
                  <div className="absolute -bottom-2 left-0 w-16 h-1 bg-green-400/70 rounded-full"></div>
                </h2>
                <span className="bg-emerald-600/60 px-3 py-1 rounded-lg text-sm">
                  {selectedCompany.openings.length} openings
                </span>
              </div>

              <div className="space-y-4">
                {selectedCompany.openings.length > 0 ? (
                  selectedCompany.openings.map((job) => (
                    <div
                      key={job.id}
                      className="p-5 rounded-xl bg-emerald-800/30 hover:bg-emerald-700/30 transition-all duration-300
                        cursor-pointer group relative overflow-hidden border border-emerald-600/10"
                    >
                      {/* Decorative corner square */}
                      <div
                        className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-emerald-400/20 to-transparent 
                        opacity-40 group-hover:opacity-80 transition-all duration-500 rotate-6"
                      ></div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">
                            {job.title}
                          </h3>
                          <p className="text-green-200">{job.department}</p>

                          <div className="flex gap-4 mt-2">
                            <div className="flex items-center gap-1 text-amber-100/80">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1 text-amber-100/80">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{job.type}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          className="py-2 px-5 bg-emerald-600/60 hover:bg-emerald-500/60 rounded-lg
                          transition-all duration-300 self-start md:self-auto"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p>No open positions available at this time.</p>
                    <p className="text-amber-100/70 mt-2">
                      Check back later for new opportunities!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FAQs Tab */}
          {activeTab === "faqs" && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 relative">
                Frequently Asked Questions
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-green-400/70 rounded-full"></div>
              </h2>

              <div className="space-y-4">
                {selectedCompany.faqs.length > 0 ? (
                  selectedCompany.faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-emerald-800/30 rounded-xl overflow-hidden border border-emerald-600/20"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full p-5 flex items-center justify-between text-left transition-all duration-300
                          hover:bg-emerald-700/30"
                      >
                        <h3 className="text-lg font-medium">{faq.question}</h3>
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-emerald-300" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-emerald-300" />
                        )}
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          expandedFaq === faq.id ? "max-h-40" : "max-h-0"
                        }`}
                      >
                        <div className="p-5 pt-0 text-amber-100/80 bg-emerald-900/20">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p>No FAQs available for this company.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-8 bg-emerald-900/30 p-6 rounded-[30px] backdrop-blur-sm border border-emerald-600/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">
                Have questions about this company?
              </h3>
              <p className="text-amber-100/80">
                Reach out directly to their recruitment team
              </p>
            </div>

            <button
              className="py-3 px-6 bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl 
              text-lg font-bold hover:from-emerald-500 hover:to-green-400 transition-all duration-300
              shadow-lg shadow-emerald-900/30 hover:shadow-emerald-800/50 group relative overflow-hidden
              flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              <span className="relative z-10">Contact Recruiter</span>
              <div
                className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left 
                transition-transform duration-500 bg-gradient-to-r from-emerald-500/50 to-green-400/50"
              ></div>
            </button>
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

export default MainCompanyPage;
