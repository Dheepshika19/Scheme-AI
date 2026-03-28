import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/signup");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-left blob */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 blob-animation"></div>

        {/* Top-right blob */}
        <div className="absolute -top-20 -right-32 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 blob-animation" style={{ animationDelay: "2s" }}></div>

        {/* Bottom-left blob */}
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 blob-animation" style={{ animationDelay: "4s" }}></div>

        {/* Bottom-right blob */}
        <div className="absolute -bottom-32 -right-40 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 blob-animation" style={{ animationDelay: "3s" }}></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-24 h-24 border-2 border-blue-300 rounded-3xl opacity-20 float-animation"></div>
        <div className="absolute bottom-32 left-16 w-32 h-32 border-2 border-green-300 rounded-full opacity-15 drift-animation"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-blue-200 rounded-lg opacity-10 rotate-slow"></div>
      </div>
      <div className="w-full max-w-md relative z-10 slide-up">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 mb-4">
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
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Scheme AI</h1>
          <p className="text-gray-600">
            Your gateway to government schemes and benefits
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300" style={{ animation: "slide-up 0.6s ease-out 0.2s both" }}>
          <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-green-50 border-b border-gray-100">
            <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Welcome back</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Sign in to your account to continue
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2" style={{ animation: "slide-up 0.5s ease-out 0.1s both" }}>
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2" style={{ animation: "slide-up 0.5s ease-out 0.2s both" }}>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg disabled:opacity-50 hover:scale-[1.02]"
                style={{ animation: "slide-up 0.5s ease-out 0.3s both" }}
              >
                {isLoading ? "Signing in..." : "Sign in"}
                {!isLoading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>

              {/* Sign Up Button */}
              <Link to="/signup" className="w-full" style={{ animation: "slide-up 0.5s ease-out 0.4s both" }}>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 border-2 border-green-600 text-green-600 hover:bg-green-50 font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                >
                  Create new account
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>By signing in, you agree to our Terms of Service</p>
          <p className="mt-2">
            <Link to="/privacy" className="hover:text-blue-600">
              Privacy Policy
            </Link>
            {" • "}
            <Link to="/terms" className="hover:text-blue-600">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
