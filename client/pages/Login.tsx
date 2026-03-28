import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Sign up state
  const [signupFullName, setSignupFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/signup/role");
    setLoginLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/signup/role");
    setSignupLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden relative">
      {/* Animated Background - Subtle blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 blob-animation"></div>
        <div className="absolute -bottom-32 -right-40 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 blob-animation" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* LEFT SIDE - LOGIN FORM */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-blue-100 p-12 flex-col justify-center relative z-10">
        <div style={{ animation: "slide-up 0.6s ease-out" }}>
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Scheme AI</h1>
            </div>
            <p className="text-sm text-gray-600">Personalized support for every citizen</p>
          </div>

          {/* Login Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Log In</h2>
            <p className="text-gray-600 mb-8">Welcome back! Please login to your account</p>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div style={{ animation: "slide-up 0.5s ease-out 0.1s both" }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username or Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="pl-10 h-12 bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div style={{ animation: "slide-up 0.5s ease-out 0.15s both" }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <Input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showLoginPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right" style={{ animation: "slide-up 0.5s ease-out 0.2s both" }}>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loginLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg mt-6"
                style={{ animation: "slide-up 0.5s ease-out 0.25s both" }}
              >
                {loginLoading ? "Logging in..." : "Log In"}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gradient-to-br from-blue-50 to-blue-100 text-gray-600">
                    or
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4" style={{ animation: "slide-up 0.5s ease-out 0.3s both" }}>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="hidden sm:inline text-sm font-medium">Google</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                  </svg>
                  <span className="hidden sm:inline text-sm font-medium">Discord</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* CENTER - HERO ILLUSTRATION */}
      <div className="hidden lg:flex lg:w-0 relative justify-center items-center">
        <div className="absolute inset-y-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200 opacity-50"></div>
      </div>

      {/* RIGHT SIDE - SIGN UP FORM */}
      <div className="flex-1 lg:w-1/2 bg-gradient-to-br from-green-50 to-green-100 p-8 lg:p-12 flex flex-col justify-center relative z-10">
        <div style={{ animation: "slide-up 0.6s ease-out 0.1s both" }}>
          {/* Mobile Logo */}
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Scheme AI</h1>
            </div>
          </div>

          {/* Sign Up Form */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
          <p className="text-gray-600 mb-8">Create your account to explore government schemes</p>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name Input */}
            <div style={{ animation: "slide-up 0.5s ease-out 0.15s both" }}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Your full name"
                  value={signupFullName}
                  onChange={(e) => setSignupFullName(e.target.value)}
                  className="pl-10 h-12 bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-0"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div style={{ animation: "slide-up 0.5s ease-out 0.2s both" }}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="pl-10 h-12 bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-0"
                  required
                />
              </div>
            </div>

            {/* Mobile Number Input */}
            <div style={{ animation: "slide-up 0.5s ease-out 0.25s both" }}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  className="pl-10 h-12 bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-0"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div style={{ animation: "slide-up 0.5s ease-out 0.3s both" }}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <Input
                  type={showSignupPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-0"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showSignupPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={signupLoading}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg mt-8"
              style={{ animation: "slide-up 0.5s ease-out 0.35s both" }}
            >
              {signupLoading ? "Creating Account..." : "Create Account"}
            </Button>

            {/* Login Link */}
            <div className="text-center" style={{ animation: "slide-up 0.5s ease-out 0.4s both" }}>
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setLoginEmail("");
                    setLoginPassword("");
                  }}
                  className="font-semibold text-green-600 hover:text-green-700"
                >
                  Log In
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
