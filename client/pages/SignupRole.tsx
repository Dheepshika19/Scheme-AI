import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Sprout,
  Users,
  Users2,
  Briefcase,
  Rocket,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";

const roles = [
  {
    id: "student",
    title: "Student",
    description: "For education and scholarship schemes",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "farmer",
    title: "Farmer",
    description: "For agricultural and farming schemes",
    icon: Sprout,
    color: "from-green-500 to-green-600",
  },
  {
    id: "women",
    title: "Women",
    description: "For women empowerment and welfare schemes",
    icon: Users,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "senior_citizen",
    title: "Senior Citizen",
    description: "For elderly care and pension schemes",
    icon: Users2,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "job_seeker",
    title: "Job Seeker",
    description: "For employment and skill development schemes",
    icon: Briefcase,
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur",
    description: "For business startup and loan schemes",
    icon: Rocket,
    color: "from-red-500 to-red-600",
  },
];

export default function SignupRole() {
  const navigate = useNavigate();

  const handleSelectRole = (roleId: string) => {
    navigate(`/signup/details/${roleId}`);
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Login
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Choose Your Role
          </h1>
          <p className="text-gray-600">
            Select the category that best describes you to access relevant
            government schemes
          </p>
        </div>

        {/* Role Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card
                key={role.id}
                className="border-0 shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => handleSelectRole(role.id)}
              >
                <CardContent className="p-6">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {role.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">
                    {role.description}
                  </p>

                  {/* Button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectRole(role.id);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium h-10 flex items-center justify-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <p className="text-gray-700">
            <span className="font-semibold text-blue-600">Don't see your category?</span>
            {" "}
            You can still register as a general user and update your details later.
          </p>
        </div>
      </div>
    </div>
  );
}
