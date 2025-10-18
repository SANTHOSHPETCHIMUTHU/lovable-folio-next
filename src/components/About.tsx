import { motion } from "framer-motion";
import { Download, MapPin, Mail, Phone, Linkedin, Award, Heart, Wrench } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export const About = () => {
  const personalDetails = [
    { icon: MapPin, label: "Location", value: "Tamil Nadu, India" },
    { icon: Mail, label: "Email", value: "santhosh@example.com", link: "mailto:santhosh@example.com" },
    { icon: Phone, label: "Phone", value: "+91 XXXXX XXXXX" },
    { icon: Linkedin, label: "LinkedIn", value: "Connect", link: "https://linkedin.com" },
  ];

  const highlights = [
    {
      icon: Award,
      title: "Certifications",
      description: "TensorFlow Developer, AWS Certified ML",
    },
    {
      icon: Heart,
      title: "Interests",
      description: "Deep Learning, Computer Vision, NLP",
    },
    {
      icon: Wrench,
      title: "Favorite Tools",
      description: "Python, React, TensorFlow, PyTorch",
    },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Get to know more about my journey and expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="glass-card p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Professional Summary</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I'm an AI/ML enthusiast with a passion for creating intelligent solutions that solve real-world problems.
              With expertise in machine learning, deep learning, and full-stack development, I bridge the gap between
              cutting-edge AI research and practical applications.
            </p>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </motion.div>

          <motion.div
            className="glass-card p-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Contact Details</h3>
            <div className="space-y-4">
              {personalDetails.map((detail, index) => (
                <div key={index} className="flex items-center gap-3">
                  <detail.icon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{detail.label}</p>
                    {detail.link ? (
                      <a
                        href={detail.link}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-foreground">{detail.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="glass-card p-6 h-full hover:border-primary/50 transition-all duration-300">
                <highlight.icon className="w-10 h-10 text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-2">{highlight.title}</h4>
                <p className="text-muted-foreground">{highlight.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
