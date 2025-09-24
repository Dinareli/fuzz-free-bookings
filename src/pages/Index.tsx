import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingForm } from "@/components/BookingForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Button as UIButton } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  Clock, 
  Star, 
  CheckCircle, 
  MessageCircle,
  Scissors,
  ArrowRight,
  Phone,
  MapPin
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  if (showBookingForm) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border/40 backdrop-blur-md bg-background/80 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scissors className="h-6 w-6 text-primary" />
              <span className="font-semibold text-xl">Calendar Barber</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost" 
                onClick={() => setShowBookingForm(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ← Voltar ao início
              </Button>
              <ThemeToggle />
              {isAuthenticated && (
                <UIButton variant="outline" onClick={logout}>
                  Sair
                </UIButton>
              )}
            </div>
          </div>
        </header>

        {/* Booking Form */}
        <main className="container mx-auto px-4 py-12">
          <BookingForm />
        </main>

        {/* Footer */}
        <footer className="border-t border-border/40 bg-muted/30 mt-20">
          <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Calendar Barber. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-md bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl">Calendar Barber</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Funcionalidades
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                Sobre
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contato
              </a>
            </nav>
            <ThemeToggle />
            {isAuthenticated && (
              <UIButton variant="outline" onClick={logout}>
                Sair
              </UIButton>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8 animate-slide-up">
              <Badge variant="secondary" className="w-fit">
                <Star className="h-3 w-3 mr-1" />
                Sistema Completo de Agendamento
              </Badge>
              
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  <span className="text-foreground">Revolucione sua</span><br />
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Barbearia
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Sistema profissional de agendamento que simplifica a gestão da sua barbearia 
                  e melhora a experiência dos seus clientes.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-base px-6 py-3"
                  onClick={() => setShowBookingForm(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Começar Agendamento
                </Button>
                
                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                  className="text-base px-6 py-3"
                >
                  <a href="#features">
                    <Star className="h-4 w-4 mr-2" />
                    Ver Funcionalidades
                  </a>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Barbearias</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-primary">10k+</div>
                  <div className="text-sm text-muted-foreground">Agendamentos</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfação</div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Visual */}
            <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Barbearia moderna com ambiente profissional"
                  className="w-full h-[500px] lg:h-[600px] object-cover rounded-2xl shadow-2xl"
                />
                
                {/* Floating Cards */}
                
                <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">5 Barbeiros Disponíveis</div>
                      <div className="text-xs text-muted-foreground">Hoje: 8h às 18h</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Funcionalidades
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sistema completo para otimizar a gestão da sua barbearia e melhorar a experiência dos seus clientes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Agendamento Online",
                description: "Sistema de marcação 24/7 para seus clientes agendarem quando quiserem."
              },
              {
                icon: Users,
                title: "Gestão de Profissionais", 
                description: "Organize horários e especialidades de cada barbeiro da sua equipe."
              },
              {
                icon: MessageCircle,
                title: "WhatsApp Integrado",
                description: "Confirmações automáticas via WhatsApp para reduzir faltas."
              },
              {
                icon: Clock,
                title: "Horários Flexíveis",
                description: "Configure seus horários de funcionamento e disponibilidade."
              },
              {
                icon: CheckCircle,
                title: "Validação em Tempo Real",
                description: "Sistema inteligente que evita conflitos de horários."
              },
              {
                icon: Star,
                title: "Interface Moderna",
                description: "Design responsivo e intuitivo para melhor experiência."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-6 text-center space-y-4 interactive-scale animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="outline">Sobre Nós</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Transformando a experiência das barbearias brasileiras
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Desenvolvemos o Calendar Barber pensando nas necessidades reais dos profissionais de barbearia. 
              Nossa missão é simplificar a gestão de agendamentos e melhorar a experiência tanto dos barbeiros 
              quanto dos clientes em todo o Brasil.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Para Barbeiros</h3>
                <ul className="space-y-2">
                  {[
                    "Organize sua agenda facilmente",
                    "Reduza faltas e cancelamentos",
                    "Aumente sua produtividade",
                    "Gerencie múltiplos profissionais"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Para Clientes</h3>
                <ul className="space-y-2">
                  {[
                    "Agende a qualquer hora do dia",
                    "Escolha seu profissional favorito",
                    "Confirmação via WhatsApp",
                    "Interface simples e intuitiva"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para começar?
            </h2>
            <p className="text-xl text-muted-foreground">
              Faça seu primeiro agendamento e descubra como é fácil usar o Calendar Barber.
            </p>
            <Button 
              size="lg"
              className="interactive-glow interactive-scale text-lg px-8 py-6"
              onClick={() => setShowBookingForm(true)}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Fazer Agendamento
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Contato
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Entre em contato conosco
            </h2>
          </div>
          
          <div className="max-w-2xl mx-auto grid gap-8">
            <div className="glass-card p-6 text-center space-y-4">
              <Phone className="h-8 w-8 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Telefone</h3>
              <p className="text-muted-foreground">(11) 99999-9999</p>
              <Button asChild variant="outline" className="interactive-scale">
                <a
                  href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20Calendar%20Barber."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
            </div>
            
            <div className="glass-card p-6 text-center space-y-4">
              <MapPin className="h-8 w-8 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Localização</h3>
              <p className="text-muted-foreground">São Paulo, SP - Brasil</p>
              <p className="text-sm text-muted-foreground">
                Atendimento em todo território nacional
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Scissors className="h-5 w-5 text-primary" />
              <span className="font-semibold">Calendar Barber</span>
            </div>
            <div className="text-sm text-muted-foreground text-center">
              © 2024 Calendar Barber. Todos os direitos reservados. 
              <span className="mx-2">•</span>
              Sistema de agendamento para barbearias do Brasil.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;