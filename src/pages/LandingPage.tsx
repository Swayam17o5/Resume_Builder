import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Check, ArrowRight, FileText, Star, Award } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight">
                Create an <span className="text-brand-600">AI-Powered</span> Resume That Gets Noticed
              </h1>
              <p className="text-xl text-gray-600">
                Our intelligent resume builder helps you craft professional resumes tailored to your industry, with real-time feedback and smart suggestions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="text-lg h-12 btn-hover" 
                  onClick={() => navigate("/signup")}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg h-12 btn-hover" 
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in order-first md:order-last">
              <div className="relative bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
                <div className="aspect-[4/3] bg-brand-50 p-6">
                  <div className="h-full w-full bg-white rounded-lg shadow-md flex items-center justify-center">
                    <div className="p-6 w-full">
                      <div className="h-8 w-40 bg-brand-200 rounded-md mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-100 rounded-md"></div>
                        <div className="h-4 w-5/6 bg-gray-100 rounded-md"></div>
                        <div className="h-4 w-4/6 bg-gray-100 rounded-md"></div>
                      </div>
                      <div className="h-8 w-28 bg-brand-100 rounded-md mt-6"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-brand-100 rounded-full"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
                  </div>
                  <div className="h-6 w-16 bg-green-100 rounded-full"></div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-brand-600 text-white rounded-full h-16 w-16 flex items-center justify-center shadow-lg font-bold text-xl">
                85%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Features Designed to Get You Hired
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our intelligent resume builder helps you stand out with professional templates and AI-powered suggestions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 card-hover">
              <div className="h-12 w-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Professional Templates</h3>
              <p className="text-gray-600">
                Choose from a wide variety of professionally designed templates tailored for different industries.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 card-hover">
              <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">AI Resume Scoring</h3>
              <p className="text-gray-600">
                Get instant feedback on your resume with our AI-powered scoring system and personalized improvement tips.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 card-hover">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">ATS Optimization</h3>
              <p className="text-gray-600">
                Ensure your resume passes through Applicant Tracking Systems with our optimized formatting and keywords.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of job seekers who have successfully landed their dream jobs using our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Marketing Specialist</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The AI scoring system helped me identify weaknesses in my resume that I never would have noticed. After making the suggested improvements, I started getting more interview calls immediately."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-medium">David Chen</h4>
                  <p className="text-sm text-gray-600">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a software engineer, I needed a resume that highlighted my technical skills while still looking professional. This platform gave me exactly what I needed, and I landed a job at a top tech company."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-medium">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-600">Recent Graduate</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a recent graduate with limited experience, I was struggling to create a resume that stood out. This tool helped me highlight my skills and education in the best possible way."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-brand-600 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-xl text-brand-100 max-w-2xl mx-auto mb-8">
            Join thousands of job seekers who have successfully landed their dream jobs using our platform.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-brand-600 font-medium bg-white hover:bg-gray-100 text-lg h-12"
            onClick={() => navigate("/signup")}
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </Layout>
  );
}
