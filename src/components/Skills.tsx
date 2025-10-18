import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Code, Brain, Database, Globe, Users, Lightbulb, MessageSquare, Target } from "lucide-react";

export const Skills = () => {
  const technicalSkills = [
    { name: "Python", icon: Code, level: 95 },
    { name: "TensorFlow/PyTorch", icon: Brain, level: 90 },
    { name: "React/Next.js", icon: Globe, level: 85 },
    { name: "SQL/NoSQL", icon: Database, level: 80 },
    { name: "Machine Learning", icon: Brain, level: 92 },
    { name: "Deep Learning", icon: Brain, level: 88 },
  ];

  const softSkills = [
    { name: "Teamwork", icon: Users, description: "Collaborative problem-solving" },
    { name: "Problem Solving", icon: Lightbulb, description: "Analytical thinking" },
    { name: "Communication", icon: MessageSquare, description: "Clear articulation" },
    { name: "Goal-Oriented", icon: Target, description: "Result-driven approach" },
  ];

  return (
    <section id="skills" className="section-padding bg-gradient-to-b from-transparent to-card/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A comprehensive overview of my technical and soft skills
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Code className="w-6 h-6 text-primary" />
              Technical Skills
            </h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="glass-card p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <skill.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-secondary" />
              Soft Skills
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="glass-card p-6 h-full hover:border-secondary/50 transition-all duration-300 hover:scale-105">
                    <skill.icon className="w-8 h-8 text-secondary mb-3" />
                    <h4 className="font-semibold mb-1">{skill.name}</h4>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
