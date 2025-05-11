import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Instagram, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Team Member 1",
    role: "Frontend Developer",
    bio: "Passionate about creating intuitive user interfaces and smooth user experiences.",
    photo: "https://thispersondoesnotexist.com/", // Placeholder for generated photos
    socials: {
      github: "https://github.com/teammember1",
      twitter: "https://twitter.com/teammember1",
      instagram: "https://instagram.com/teammember1",
      linkedin: "https://linkedin.com/in/teammember1"
    }
  },
  {
    name: "Team Member 2",
    role: "Backend Developer",
    bio: "Focuses on building robust and scalable backend systems that power our applications.",
    photo: "https://thispersondoesnotexist.com/", // Placeholder for generated photos
    socials: {
      github: "https://github.com/teammember2",
      twitter: "https://twitter.com/teammember2",
      instagram: "https://instagram.com/teammember2",
      linkedin: "https://linkedin.com/in/teammember2"
    }
  },
  {
    name: "Team Member 3",
    role: "UI/UX Designer",
    bio: "Creative designer with a keen eye for detail and a passion for creating beautiful interfaces.",
    photo: "https://thispersondoesnotexist.com/", // Placeholder for generated photos
    socials: {
      github: "https://github.com/teammember3",
      twitter: "https://twitter.com/teammember3",
      instagram: "https://instagram.com/teammember3",
      linkedin: "https://linkedin.com/in/teammember3"
    }
  },
  {
    name: "Team Member 4",
    role: "Project Manager",
    bio: "Keeps the project on track and ensures smooth collaboration between team members.",
    photo: "https://thispersondoesnotexist.com/", // Placeholder for generated photos
    socials: {
      github: "https://github.com/teammember4",
      twitter: "https://twitter.com/teammember4",
      instagram: "https://instagram.com/teammember4",
      linkedin: "https://linkedin.com/in/teammember4"
    }
  }
];

export default function AboutUsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're a team of passionate developers and designers committed to helping you create professional resumes that get noticed.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <div className="bg-white rounded-xl shadow-md p-8">
            <p className="text-gray-700 leading-relaxed">
              Our mission is to empower job seekers with the tools they need to showcase their skills and experience effectively. 
              We believe that everyone deserves access to professional-grade resume tools regardless of their background or experience level.
              Our AI-powered platform helps you create tailored resumes that highlight your strengths and get you noticed by employers.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center text-gray-400">
                  {/* Placeholder for actual team member photos */}
                  <span className="text-6xl font-bold">{member.name.charAt(0)}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-indigo-600 text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                
                <div className="flex space-x-2">
                  <a href={member.socials.github} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-black">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href={member.socials.twitter} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-blue-400">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href={member.socials.instagram} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-pink-500">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-blue-600">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions, feedback, or suggestions? We'd love to hear from you!
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Contact Us
          </Button>
        </div>
      </div>
    </Layout>
  );
} 