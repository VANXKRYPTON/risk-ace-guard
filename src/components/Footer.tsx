import { BarChart3, Github, BookOpen, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold">Risk Analyzer</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Business Risk Assessment using Financial Ratio Analysis
                and Gradient Boosting Classification Algorithms.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#methodology" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Methodology
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-medium mb-4">Project Info</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Major Project - College Research
              </p>
              <a href="mailto:contact@example.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact
              </a>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Business Risk Assessment Project. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Powered by Gradient Boosting</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
