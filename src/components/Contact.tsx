import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Mail, Phone, Linkedin, Github, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - will integrate with backend/WordPress API
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const contactDetails = [
    { icon: Mail, label: "Email", value: "santhosh@example.com", link: "mailto:santhosh@example.com" },
    { icon: Phone, label: "Phone", value: "+91 XXXXX XXXXX", link: "tel:+91XXXXXXXXXX" },
    { icon: Linkedin, label: "LinkedIn", value: "Connect", link: "https://linkedin.com" },
    { icon: Github, label: "GitHub", value: "Follow", link: "https://github.com" },
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-transparent to-card/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Have a project in mind? Let's work together to bring your ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card p-8">
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-muted/50 border-muted"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-muted/50 border-muted"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="bg-muted/50 border-muted resize-none"
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-6">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactDetails.map((detail, index) => (
                    <motion.a
                      key={index}
                      href={detail.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/10 transition-colors group"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <detail.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{detail.label}</p>
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {detail.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <Card className="glass-card p-8">
                <h3 className="text-xl font-semibold mb-4">Let's Collaborate</h3>
                <p className="text-muted-foreground">
                  I'm always interested in hearing about new projects and opportunities.
                  Whether you have a question or just want to say hi, feel free to reach out!
                </p>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-20 pt-8 border-t border-border/50 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex justify-center gap-6 mb-4">
            {contactDetails.map((detail, index) => (
              <a
                key={index}
                href={detail.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
              >
                <detail.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <p className="text-muted-foreground">
            © 2024 Santhosh Petchimuthu. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </section>
  );
};
