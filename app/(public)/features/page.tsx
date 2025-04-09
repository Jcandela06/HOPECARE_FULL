import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  BarChart,
  Calendar,
  Clock,
  Database,
  FileText,
  Hospital,
  MessageSquare,
  Shield,
  Users,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Hospital,
      title: "Gestión hospitalaria",
      description:
        "Herramientas integrales para gestionar operaciones, recursos y personal del hospital.",
    },
    {
      icon: Users,
      title: "Manejo de pacientes",
      description:
        "Registro completo de pacientes, historial y sistema de gestión de atención.",
    },
    {
      icon: Calendar,
      title: "Programación de citas",
      description:
        "Sistema de programación eficiente para pacientes y proveedores de atención médica.",
    },
    {
      icon: FileText,
      title: "Historial médico electrónico",
      description:
        "Gestión de historias clínicas electrónicas segura y accesible.",
    },
    {
      icon: Activity,
      title: "Gestión clínica",
      description: "Herramientas avanzadas para el flujo de trabajo clínico y la atención al paciente.",
    },
    {
      icon: Database,
      title: "Gestión de inventario",
      description: "Seguimiento y gestión de suministros y equipos médicos.",
    },
    {
      icon: Shield,
      title: "Características de seguridad",
      description:
        "Medidas de seguridad compatibles con HIPAA para proteger datos confidenciales.",
    },
    {
      icon: MessageSquare,
      title: "Herramientas de comunicación",
      description: "Sistema de mensajería integrado para personal y pacientes.",
    },
    {
      icon: BarChart,
      title: "Análisis e informes",
      description: "Panel de control completo de informes y análisis.",
    },
    {
      icon: Clock,
      title: "Actualizaciones en tiempo real",
      description:
        "Actualizaciones y notificaciones instantáneas de información crítica.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Características</h1>
          <p className="text-xl text-gray-600">
          Descubra las potentes funciones que hacen de HopeCare la opción líder
           para los proveedores de atención médica
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-customTeal " />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
