import { Card, CardContent } from "@/components/ui/card";
import { Award, Building2, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Acerca de HopeCare</h1>
          <p className="text-xl text-gray-600">
          Liderando el futuro de la gestión sanitaria
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <Card className="p-6">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Nuestra Mision</h2>
              <p className="text-gray-600">
              HopeCare ofrece una plataforma integral que brinda apoyo y recursos médicos
              confiables a personas con glucogenosis y sus familias. Su misión es empoderar
              a los pacientes, conectándolos con expertos y proporcionando herramientas digitales
              para la gestión de la enfermedad.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Nuestra Vision</h2>
              <p className="text-gray-600">
              Ser la referencia global en apoyo digital para enfermedades raras,
              promoviendo la concienciación y mejorando la calidad de vida de los pacientes.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <Users className="w-12 h-12 text-customTeal  mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Equipo de Expertos</h3>
            <p className="text-gray-600">
            Dirigido por expertos en atención médica y tecnología con décadas de experiencia
            </p>
          </div>
          <div className="text-center">
            <Award className="w-12 h-12 text-customTeal  mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Reconocimiento de la industria</h3>
            <p className="text-gray-600">
            Múltiples premios a la innovación en tecnología sanitaria
            </p>
          </div>
          <div className="text-center">
            <Building2 className="w-12 h-12 text-customTeal  mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Presencia global</h3>
            <p className="text-gray-600">
            Brindar servicios a proveedores de atención médica en varios países
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
