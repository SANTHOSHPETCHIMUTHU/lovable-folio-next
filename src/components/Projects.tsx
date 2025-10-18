import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Github, ExternalLink, X } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  features: string[];
  challenges: string;
  solutions: string;
  screenshots: string[];
}

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Placeholder data - will be replaced by WordPress API
  const projects: Project[] = [
    {
      id: 1,
      title: "AI Image Recognition System",
      shortDescription: "Deep learning model for multi-class image classification",
      description: "A comprehensive image recognition system built using TensorFlow and CNN architecture to classify images across multiple categories with high accuracy.",
      technologies: ["Python", "TensorFlow", "OpenCV", "Flask"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com",
      features: [
        "Real-time image classification",
        "Multi-class support (50+ categories)",
        "Accuracy rate of 94%",
        "REST API for easy integration"
      ],
      challenges: "Handling diverse image quality and optimizing model performance for real-time processing.",
      solutions: "Implemented data augmentation, transfer learning with ResNet50, and model quantization for faster inference.",
      screenshots: [
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 2,
      title: "Smart Chatbot Assistant",
      shortDescription: "NLP-powered conversational AI for customer support",
      description: "An intelligent chatbot using natural language processing to provide automated customer support with context-aware responses.",
      technologies: ["Python", "BERT", "React", "Node.js"],
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com",
      features: [
        "Natural language understanding",
        "Context-aware responses",
        "Multi-turn conversations",
        "Integration with CRM systems"
      ],
      challenges: "Understanding user intent with limited training data and maintaining conversation context.",
      solutions: "Fine-tuned BERT model, implemented attention mechanisms, and used dialogue state tracking.",
      screenshots: [
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 3,
      title: "Predictive Analytics Dashboard",
      shortDescription: "ML-driven analytics platform for business insights",
      description: "A comprehensive analytics platform that uses machine learning to predict trends and provide actionable business insights.",
      technologies: ["React", "Python", "Scikit-learn", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com",
      features: [
        "Real-time data visualization",
        "Predictive modeling",
        "Custom reporting",
        "Export functionality"
      ],
      challenges: "Processing large datasets efficiently and creating intuitive visualizations for non-technical users.",
      solutions: "Implemented data pipeline optimization, used Recharts for visualization, and added interactive filters.",
      screenshots: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      ]
    },
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Explore my latest work in AI/ML and full-stack development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className="glass-card overflow-hidden cursor-pointer group h-full flex flex-col hover:border-primary/50 transition-all duration-300"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-primary/50">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProject.screenshots.map((screenshot, index) => (
                      <img
                        key={index}
                        src={screenshot}
                        alt={`${selectedProject.title} screenshot ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">{selectedProject.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Challenges</h4>
                    <p className="text-muted-foreground">{selectedProject.challenges}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Solutions</h4>
                    <p className="text-muted-foreground">{selectedProject.solutions}</p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button asChild className="bg-gradient-to-r from-primary to-secondary">
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View on GitHub
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="border-primary/50">
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
