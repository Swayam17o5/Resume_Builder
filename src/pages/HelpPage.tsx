import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, FileText, Download, Edit, Layout as TemplateIcon } from "lucide-react";

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I create a new resume?",
      answer: "To create a new resume, click the 'Create Resume' button on your dashboard. You'll be able to choose a template and start filling in your information. The builder will guide you through each section."
    },
    {
      question: "Can I change my resume template after creating it?",
      answer: "Yes! You can switch between templates at any time without losing your content. Simply open your resume and click on the 'Change Template' option."
    },
    {
      question: "How do I download my resume?",
      answer: "Once you've completed your resume, click the 'Download' or 'Export' button. You can download your resume in PDF format, which is the most widely accepted format for job applications."
    },
    {
      question: "What makes a good resume?",
      answer: "A good resume should be clear, concise, and relevant to the job you're applying for. Use bullet points, action verbs, and quantifiable achievements. Keep it to 1-2 pages and ensure there are no spelling or grammatical errors."
    },
    {
      question: "How often should I update my resume?",
      answer: "It's recommended to update your resume every 6-12 months, or whenever you have new achievements, skills, or experiences to add. Always update it before starting a new job search."
    }
  ];

  const guides = [
    {
      title: "Getting Started",
      icon: <FileText className="h-6 w-6" />,
      content: "Learn the basics of creating your first resume and navigating the builder."
    },
    {
      title: "Choosing Templates",
      icon: <TemplateIcon className="h-6 w-6" />,
      content: "Explore our collection of professional templates and find the perfect one for your needs."
    },
    {
      title: "Editing Your Resume",
      icon: <Edit className="h-6 w-6" />,
      content: "Master the resume editor and learn how to showcase your skills effectively."
    },
    {
      title: "Exporting Options",
      icon: <Download className="h-6 w-6" />,
      content: "Understand different export options and how to get your resume ready for applications."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center space-x-2 mb-8">
          <HelpCircle className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-heading font-bold text-gray-900">Help Center</h1>
        </div>

        <div className="grid gap-6 mb-8">
          {guides.map((guide, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    {guide.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{guide.title}</h3>
                    <p className="text-gray-600">{guide.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              If you can't find the answer you're looking for, please contact our support team at{" "}
              <a href="mailto:support@jobpilot.com" className="text-indigo-600 hover:text-indigo-700">
                support@jobpilot.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
