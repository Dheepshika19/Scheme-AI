import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const STEPS = ["Common Details", "Role-Specific Details", "Documents"];

const ROLE_CONFIGS: Record<string, any> = {
  student: {
    title: "Student Details",
    fields: [
      { name: "educationLevel", label: "Education Level", type: "select", options: ["10th", "12th", "UG", "PG"] },
      { name: "courseName", label: "Course Name", type: "text" },
      { name: "institutionType", label: "Institution Type", type: "select", options: ["Government", "Private"] },
      { name: "marks", label: "Marks (%)", type: "number", min: 0, max: 100 },
      { name: "category", label: "Category", type: "select", options: ["SC", "ST", "OBC", "General"] },
      { name: "disability", label: "Disability", type: "select", options: ["Yes", "No"] },
    ],
    documents: [
      "Aadhar Card",
      "Student ID Card",
      "Bonafide Certificate",
      "Marksheet (Latest)",
      "Income Certificate",
      "Caste Certificate (if applicable)",
      "Disability Certificate (if Yes)",
    ],
  },
  farmer: {
    title: "Farmer Details",
    fields: [
      { name: "landOwnership", label: "Land Ownership", type: "select", options: ["Yes", "No"] },
      { name: "landSize", label: "Land Size", type: "select", options: ["<1 acre", "1–2 acres", "2–5 acres", ">5 acres"] },
      { name: "cropType", label: "Crop Type", type: "select", options: ["Rice", "Wheat", "Sugarcane", "Cotton", "Other"] },
      { name: "irrigationType", label: "Irrigation Type", type: "select", options: ["Rain", "Borewell", "Canal"] },
      { name: "farmerCategory", label: "Farmer Category", type: "select", options: ["Small", "Marginal", "Large"] },
      { name: "kisanCard", label: "Kisan Card", type: "select", options: ["Yes", "No"] },
    ],
    documents: [
      "Aadhar Card",
      "Land Ownership Document (Patta/Chitta)",
      "Kisan Card",
      "Bank Passbook",
      "Income Certificate",
      "Crop Proof (optional)",
    ],
  },
  women: {
    title: "Women Details",
    fields: [
      { name: "maritalStatus", label: "Marital Status", type: "select", options: ["Single", "Married", "Widow"] },
      { name: "employmentStatus", label: "Employment Status", type: "select", options: ["Working", "Not Working"] },
      { name: "educationLevel", label: "Education Level", type: "select", options: ["No School", "10th", "12th", "UG", "PG"] },
      { name: "numChildren", label: "Number of Children", type: "select", options: ["0", "1", "2", "3+"] },
      { name: "bplStatus", label: "BPL Status", type: "select", options: ["Yes", "No"] },
    ],
    documents: [
      "Aadhar Card",
      "Marriage Certificate (if Married)",
      "Widow Certificate (if Widow)",
      "Income Certificate",
      "Self Help Group ID (if any)",
    ],
  },
  senior_citizen: {
    title: "Senior Citizen Details",
    fields: [
      { name: "pensionStatus", label: "Pension Status", type: "select", options: ["Yes", "No"] },
      { name: "livingAlone", label: "Living Alone", type: "select", options: ["Yes", "No"] },
      { name: "healthCondition", label: "Health Condition", type: "select", options: ["Normal", "Disabled", "Chronic Illness"] },
      { name: "bplStatus", label: "BPL Status", type: "select", options: ["Yes", "No"] },
    ],
    documents: [
      "Aadhar Card",
      "Age Proof (Birth Certificate / Voter ID)",
      "Pension Certificate (if any)",
      "Medical Certificate (if applicable)",
      "Income Certificate",
    ],
  },
  job_seeker: {
    title: "Job Seeker Details",
    fields: [
      { name: "qualification", label: "Highest Qualification", type: "select", options: ["10th", "12th", "Diploma", "UG", "PG"] },
      { name: "skills", label: "Skills", type: "text" },
      { name: "experienceLevel", label: "Experience Level", type: "select", options: ["Fresher", "Experienced"] },
      { name: "yearsOfExperience", label: "Years of Experience", type: "select", options: ["0", "1–2", "3–5", "5+"] },
      { name: "preferredJobType", label: "Preferred Job Type", type: "select", options: ["Government", "Private", "Any"] },
    ],
    documents: [
      "Aadhar Card",
      "Resume / CV",
      "Educational Certificates",
      "Skill Certificates (if any)",
      "Experience Certificate (if applicable)",
    ],
  },
  entrepreneur: {
    title: "Entrepreneur Details",
    fields: [
      { name: "businessStatus", label: "Business Status", type: "select", options: ["Starting", "Existing"] },
      { name: "businessType", label: "Business Type", type: "select", options: ["Retail", "Manufacturing", "Service", "Tech", "Other"] },
      { name: "yearsOfExperience", label: "Years of Experience", type: "select", options: ["0", "1–2", "3–5", "5+"] },
      { name: "investmentCapacity", label: "Investment Capacity", type: "select", options: ["<1 Lakh", "1–5 Lakh", "5–10 Lakh", ">10 Lakh"] },
      { name: "loanRequired", label: "Loan Required", type: "select", options: ["Yes", "No"] },
      { name: "startupRegistered", label: "Startup Registered", type: "select", options: ["Yes", "No"] },
    ],
    documents: [
      "Aadhar Card",
      "PAN Card",
      "Business Registration Certificate (if existing)",
      "Bank Statement",
      "Project Report (if applying for loan)",
    ],
  },
};

const COMMON_DOCUMENTS = ["Aadhar Card", "Passport Size Photo"];

interface FormData {
  // Common
  fullName: string;
  age: string;
  gender: string;
  state: string;
  district: string;
  annualIncome: string;
  // Role-specific
  [key: string]: any;
}

export default function SignupDetails() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    age: "",
    gender: "",
    state: "",
    district: "",
    annualIncome: "",
  });
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});

  if (!role || !ROLE_CONFIGS[role]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Invalid Role</h1>
          <Button onClick={() => navigate("/signup")} className="mt-4">
            Go back
          </Button>
        </div>
      </div>
    );
  }

  const roleConfig = ROLE_CONFIGS[role];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDocumentToggle = (doc: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  };

  const handleFileUpload = (doc: string, file: File | null) => {
    setUploadedFiles((prev) => ({ ...prev, [doc]: file }));
  };

  const handleNext = () => {
    if (currentStep === 0) {
      // Validate common details
      if (
        !formData.fullName ||
        !formData.age ||
        !formData.gender ||
        !formData.state ||
        !formData.district ||
        !formData.annualIncome
      ) {
        alert("Please fill all common details");
        return;
      }
      const ageNum = parseInt(formData.age);
      if (ageNum < 18) {
        alert("Age must be at least 18");
        return;
      }
    }

    if (currentStep === 1) {
      // Validate role-specific details
      const requiredFields = roleConfig.fields.filter((f: any) => f.required !== false);
      for (const field of requiredFields) {
        if (!formData[field.name]) {
          alert(`Please fill ${field.label}`);
          return;
        }
      }
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    // Validate documents
    const requiredDocs = [...COMMON_DOCUMENTS, ...roleConfig.documents];
    const missingDocs = requiredDocs.filter(
      (doc) => !uploadedFiles[doc] || uploadedFiles[doc] === null
    );

    if (missingDocs.length > 0) {
      alert(`Please upload all required documents: ${missingDocs.join(", ")}`);
      return;
    }

    // Save to localStorage (in real app, send to server)
    const signupData = {
      role,
      ...formData,
      documents: uploadedFiles,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("signupData", JSON.stringify(signupData));

    // Redirect to chatbot
    navigate("/chatbot");
  };

  const handleBack = () => {
    if (currentStep === 0) {
      navigate("/signup");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h1>
          <p className="text-gray-600">Create your account to explore schemes</p>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-8">
          {STEPS.map((step, index) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded-full transition-colors ${
                index <= currentStep ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-6 border-b border-gray-100">
            <CardTitle className="text-2xl">
              {currentStep === 0 && "Common Details"}
              {currentStep === 1 && roleConfig.title}
              {currentStep === 2 && "Upload Documents"}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Step {currentStep + 1} of {STEPS.length}
            </p>
          </CardHeader>

          <CardContent className="pt-8">
            {/* Step 0: Common Details */}
            {currentStep === 0 && (
              <div className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="h-11"
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Age (≥18) *
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="h-11"
                    min="18"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Gender *
                  </label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* State */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    State *
                  </label>
                  <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64">
                      {INDIAN_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* District */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    District *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your district"
                    value={formData.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                    className="h-11"
                  />
                </div>

                {/* Annual Income */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Annual Family Income *
                  </label>
                  <Select value={formData.annualIncome} onValueChange={(value) => handleInputChange("annualIncome", value)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<1">Less than 1 Lakh</SelectItem>
                      <SelectItem value="1-3">1–3 Lakh</SelectItem>
                      <SelectItem value="3-8">3–8 Lakh</SelectItem>
                      <SelectItem value=">8">More than 8 Lakh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 1: Role-Specific Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {roleConfig.fields.map((field: any) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {field.label} *
                    </label>
                    {field.type === "text" && (
                      <Input
                        type="text"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="h-11"
                      />
                    )}
                    {field.type === "number" && (
                      <Input
                        type="number"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="h-11"
                        min={field.min}
                        max={field.max}
                      />
                    )}
                    {field.type === "select" && (
                      <Select value={formData[field.name] || ""} onValueChange={(value) => handleInputChange(field.name, value)}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options.map((option: string) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Step 2: Documents */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Common Documents */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Required for All</h3>
                  <div className="space-y-4">
                    {COMMON_DOCUMENTS.map((doc) => (
                      <DocumentUploadField
                        key={doc}
                        document={doc}
                        onFileChange={(file) => handleFileUpload(doc, file)}
                        uploaded={uploadedFiles[doc]}
                      />
                    ))}
                  </div>
                </div>

                {/* Role-Specific Documents */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">{roleConfig.title}</h3>
                  <div className="space-y-4">
                    {roleConfig.documents.map((doc: string) => (
                      <DocumentUploadField
                        key={doc}
                        document={doc}
                        onFileChange={(file) => handleFileUpload(doc, file)}
                        uploaded={uploadedFiles[doc]}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-11 border-2"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              {!isLastStep ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium flex items-center justify-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 h-11 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium"
                >
                  Complete Sign Up
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface DocumentUploadFieldProps {
  document: string;
  onFileChange: (file: File | null) => void;
  uploaded: File | null;
}

function DocumentUploadField({
  document,
  onFileChange,
  uploaded,
}: DocumentUploadFieldProps) {
  return (
    <div className="flex items-center justify-between p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
      <div className="flex items-center gap-3">
        <Upload className="w-5 h-5 text-gray-400" />
        <div>
          <p className="text-sm font-medium text-gray-900">{document}</p>
          <p className="text-xs text-gray-500">
            {uploaded ? "✓ Uploaded" : "Click to upload"}
          </p>
        </div>
      </div>
      <input
        type="file"
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        className="hidden"
        id={`upload-${document}`}
      />
      <label
        htmlFor={`upload-${document}`}
        className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors ${
          uploaded
            ? "bg-green-100 text-green-700 hover:bg-green-200"
            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
        }`}
      >
        {uploaded ? "Change" : "Upload"}
      </label>
    </div>
  );
}
