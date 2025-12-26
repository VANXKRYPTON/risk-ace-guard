import { BarChart3 } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-semibold text-sm">Risk Analyzer</span>
              <span className="hidden sm:inline text-xs text-muted-foreground ml-2">| Financial Analysis</span>
            </div>
          </div>
          
          <nav className="flex items-center gap-6">
            <a href="#assessment" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Assessment
            </a>
            <a href="#methodology" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              Methodology
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
