import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import data from "../data/portfolio.json";
import axios from 'axios';

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { email, mobile, address, linkedin, github, emailInfo } = data;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData, [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/inquiry', formData);
      setIsSubmitting(true);
      console.log(response)
      if(response){
        toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        });
        setIsSubmitting(false);
      //Reset form after submit
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      }else{
        toast({
        title: "Oops! Something Went Wrong",
        description: "Your message wasn't delivered. Please try again",
        });
        setIsSubmitting(false);
      }
    } catch (err) {
      setIsSubmitting(true); 
      
      toast({
        title: "Error Occurred",
        description: `${err.status==423?`Excel file is currently open. Please close it before trying again.`:`Failed to save inquiry`}`,
        });
      setIsSubmitting(false);
    }

  //   setIsSubmitting(true);

  //   setTimeout(() => {
  //     toast({
  //       title: "Message sent!",
  //       description: "Thank you for your message. I'll get back to you soon.",
  //     });
  //     setIsSubmitting(false);
  //   }, 1500);
  };
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary"> Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">
              {" "}
              Contact Information
            </h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  {/* <h4 className="font-medium"> Email</h4> */}
                  <a
                    href="sadabhossain_pramanik@yahoo.in"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  {/* <h4 className="font-medium"> Phone</h4> */}
                  <a
                    href="Mobile:+919932195224"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {mobile}
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  {/* <h4 className="font-medium"> Location</h4> */}
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    {address}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4"> Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a href={linkedin} onClick={(e) => {
                  e.preventDefault(); // prevent native anchor behavior
                  window.open(linkedin, '_blank', 'noopener,noreferrer');
                }} target="_blank">
                  <Linkedin />
                </a>
                <a href={github} onClick={(e) => {
                  e.preventDefault(); // prevent native anchor behavior
                  window.open(github, '_blank', 'noopener,noreferrer');
                }} target="_blank">
                  <Github />
                </a>
                <a href={email} onClick={(e) => {
                  e.preventDefault(); // prevent native anchor behavior
                  window.open(emailInfo, '_blank', 'noopener,noreferrer');
                }} target="_blank">
                  <Mail />
                </a>
                {/* <a href="#" target="_blank">
                  <Twitch />
                </a> */}
              </div>
            </div>
          </div>

          <div
            className="bg-card p-8 rounded-lg shadow-xs"
            onSubmit={handleSubmit}
          >
            {/* <div className="h-98 overflow-hidden">
              <img
                src={image}
                alt="Image"
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-200"
              />
            </div> */}
            {/* </div> */}
            <h3 className="text-2xl font-semibold mb-6"> Send a Message</h3>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="Sadab Hossain Pramanik..."
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="rock@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
