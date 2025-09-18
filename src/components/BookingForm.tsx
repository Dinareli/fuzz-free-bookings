import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  MessageCircle,
  CheckCircle,
  Scissors,
  RotateCcw
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type BookingStep = "service" | "professional" | "datetime" | "contact" | "confirmation";

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface Professional {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

const services: Service[] = [
  { id: "1", name: "Corte de Cabelo", duration: 30, price: 25 },
  { id: "2", name: "Barba", duration: 20, price: 15 },
  { id: "3", name: "Corte + Barba", duration: 45, price: 35 },
  { id: "4", name: "Bigode", duration: 15, price: 10 },
];

const professionals: Professional[] = [
  { id: "1", name: "João Silva", avatar: "👨‍🦲", specialties: ["Corte Clássico", "Barba"] },
  { id: "2", name: "Carlos Santos", avatar: "👨‍🦱", specialties: ["Corte Moderno", "Degradê"] },
  { id: "3", name: "Rafael Costa", avatar: "👨‍🦳", specialties: ["Barba", "Bigode"] },
];

const timeSlots: TimeSlot[] = [
  { id: "1", time: "08:00", available: true },
  { id: "2", time: "08:30", available: true },
  { id: "3", time: "09:00", available: false },
  { id: "4", time: "09:30", available: true },
  { id: "5", time: "10:00", available: true },
  { id: "6", time: "10:30", available: false },
  { id: "7", time: "11:00", available: true },
  { id: "8", time: "14:00", available: true },
  { id: "9", time: "14:30", available: true },
  { id: "10", time: "15:00", available: true },
];

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("service");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceId: "",
    professionalId: "",
    date: undefined as Date | undefined,
    timeSlot: "",
    clientName: "",
    clientPhone: "",
    observations: "",
  });

  const handleStepForward = useCallback(() => {
    const steps: BookingStep[] = ["service", "professional", "datetime", "contact", "confirmation"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  }, [currentStep]);

  const handleStepBack = useCallback(() => {
    const steps: BookingStep[] = ["service", "professional", "datetime", "contact", "confirmation"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  }, [currentStep]);

  const resetForm = useCallback(() => {
    setFormData({
      serviceId: "",
      professionalId: "",
      date: undefined,
      timeSlot: "",
      clientName: "",
      clientPhone: "",
      observations: "",
    });
    setCurrentStep("service");
  }, []);

  const handleConfirmBooking = useCallback(async () => {
    setIsLoading(true);
    
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const service = services.find(s => s.id === formData.serviceId);
    const professional = professionals.find(p => p.id === formData.professionalId);
    const timeSlot = timeSlots.find(t => t.id === formData.timeSlot);
    const dateStr = formData.date?.toLocaleDateString("pt-BR");
    
    const message = `🗓️ *Agendamento Confirmado*%0A%0A👤 Cliente: ${formData.clientName}%0A📞 Telefone: ${formData.clientPhone}%0A✂️ Serviço: ${service?.name}%0A💰 Valor: R$ ${service?.price}%0A👨‍💼 Profissional: ${professional?.name}%0A📅 Data: ${dateStr}%0A🕐 Horário: ${timeSlot?.time}%0A${formData.observations ? `📝 Observações: ${formData.observations}` : ""}`;
    
    const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;
    
    setIsLoading(false);
    
    toast({
      title: "Agendamento confirmado!",
      description: "Redirecionando para WhatsApp...",
    });
    
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1000);
  }, [formData]);

  const selectedService = services.find(s => s.id === formData.serviceId);
  const selectedProfessional = professionals.find(p => p.id === formData.professionalId);
  const selectedTime = timeSlots.find(t => t.id === formData.timeSlot);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-slide-up">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {["Serviço", "Profissional", "Data/Hora", "Contato", "Confirmação"].map((step, index) => {
          const stepKeys: BookingStep[] = ["service", "professional", "datetime", "contact", "confirmation"];
          const isActive = stepKeys[index] === currentStep;
          const isCompleted = stepKeys.indexOf(currentStep) > index;
          
          return (
            <div key={step} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                  isActive ? "bg-primary text-primary-foreground" : 
                  isCompleted ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
              </div>
              {index < 4 && (
                <div className={cn(
                  "w-8 h-0.5 mx-2",
                  isCompleted ? "bg-success" : "bg-muted"
                )} />
              )}
            </div>
          );
        })}
      </div>

      <Card className="glass-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Scissors className="h-5 w-5 text-primary" />
            {currentStep === "service" && "Escolha o Serviço"}
            {currentStep === "professional" && "Selecione o Profissional"}
            {currentStep === "datetime" && "Escolha Data e Horário"}
            {currentStep === "contact" && "Informações de Contato"}
            {currentStep === "confirmation" && "Confirmar Agendamento"}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Step: Service Selection */}
          {currentStep === "service" && (
            <div className="grid gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setFormData(prev => ({ ...prev, serviceId: service.id }))}
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-all interactive-scale",
                    formData.serviceId === service.id
                      ? "border-primary bg-primary-soft"
                      : "border-border hover:border-primary hover:bg-accent"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.duration} min</p>
                    </div>
                    <Badge variant="secondary">R$ {service.price}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step: Professional Selection */}
          {currentStep === "professional" && (
            <div className="grid gap-4">
              {professionals.map((professional) => (
                <div
                  key={professional.id}
                  onClick={() => setFormData(prev => ({ ...prev, professionalId: professional.id }))}
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-all interactive-scale",
                    formData.professionalId === professional.id
                      ? "border-primary bg-primary-soft"
                      : "border-border hover:border-primary hover:bg-accent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{professional.avatar}</span>
                    <div>
                      <h3 className="font-medium">{professional.name}</h3>
                      <div className="flex gap-1 mt-1">
                        {professional.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step: Date & Time Selection */}
          {currentStep === "datetime" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">Selecione a data</Label>
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => setFormData(prev => ({ ...prev, date }))}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-lg border p-3"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-3 block">Horários disponíveis</Label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={formData.timeSlot === slot.id ? "default" : "outline"}
                      disabled={!slot.available}
                      onClick={() => setFormData(prev => ({ ...prev, timeSlot: slot.id }))}
                      className="interactive-scale"
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step: Contact Information */}
          {currentStep === "contact" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome completo"
                  value={formData.clientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="observations">Observações (opcional)</Label>
                <Textarea
                  id="observations"
                  placeholder="Alguma observação especial?"
                  value={formData.observations}
                  onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
                />
              </div>
            </div>
          )}

          {/* Step: Confirmation */}
          {currentStep === "confirmation" && (
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg">Resumo do Agendamento</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Serviço:</span>
                    <span className="font-medium">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profissional:</span>
                    <span className="font-medium">{selectedProfessional?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data:</span>
                    <span className="font-medium">{formData.date?.toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Horário:</span>
                    <span className="font-medium">{selectedTime?.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cliente:</span>
                    <span className="font-medium">{formData.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Telefone:</span>
                    <span className="font-medium">{formData.clientPhone}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span className="text-primary">R$ {selectedService?.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleConfirmBooking}
                disabled={isLoading}
                className="w-full interactive-glow"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Confirmando...
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Confirmar via WhatsApp
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <div className="flex gap-2">
              {currentStep !== "service" && (
                <Button
                  variant="outline"
                  onClick={handleStepBack}
                  disabled={isLoading}
                >
                  Voltar
                </Button>
              )}
              <Button
                variant="outline"
                onClick={resetForm}
                disabled={isLoading}
                className="text-muted-foreground"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Limpar Tudo
              </Button>
            </div>

            {currentStep !== "confirmation" && (
              <Button
                onClick={handleStepForward}
                disabled={
                  (currentStep === "service" && !formData.serviceId) ||
                  (currentStep === "professional" && !formData.professionalId) ||
                  (currentStep === "datetime" && (!formData.date || !formData.timeSlot)) ||
                  (currentStep === "contact" && (!formData.clientName || !formData.clientPhone))
                }
                className="interactive-scale"
              >
                Continuar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}