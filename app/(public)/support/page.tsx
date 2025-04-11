import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, FileQuestion, Headset } from "lucide-react";

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Centro de Soporte</h1>
          <p className="text-xl text-gray-600">
            Estamos aquí para ayudarle a tener éxito.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center">
            <CardContent>
              <Headset className="w-12 h-12 text-customTeal mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Soporte</h3>
              <p className="text-gray-600 mb-4">
              Nuestro equipo de soporte está disponible las 24 horas del día.
              </p>
              <Button variant="outline">Contactar Soporte</Button>
            </CardContent>
          </Card>

          <Card className="p-6 text-center">
            <CardContent>
              <FileQuestion className="w-12 h-12 text-customTeal mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">FAQ</h3>
              <p className="text-gray-600 mb-4">
              Encuentra respuestas a preguntas frecuentes
              </p>
              <Button variant="outline">Ver FAQ</Button>
            </CardContent>
          </Card>

          <Card className="p-6 text-center">
            <CardContent>
              <BookOpen className="w-12 h-12 text-customTeal mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Documentación</h3>
              <p className="text-gray-600 mb-4">
                Guías detalladas y documentación
              </p>
              <Button variant="outline">Ver Docs</Button>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">
            Preguntas frecuentes
          </h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>¿Cómo restablezco mi contraseña?</AccordionTrigger>
              <AccordionContent>
              Puede restablecer su contraseña haciendo clic en el enlace "Olvidé mi contraseña"
                en la página de inicio de sesión. Siga las instrucciones enviadas a su
                correo electrónico para crear una nueva contraseña.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
              ¿Qué recursos de formación están disponibles?
              </AccordionTrigger>
              <AccordionContent>
              Ofrecemos recursos de capacitación integrales que incluyen tutoriales en video,
               documentación y sesiones de capacitación en vivo para el personal del hospital.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>¿Qué tan seguros son los datos de los pacientes?</AccordionTrigger>
              <AccordionContent>
              Implementamos medidas de seguridad líderes en la industria, que incluyen
                encriptación, auditorías de seguridad periódicas y cumplimiento de HIPAA para
                garantizar que los datos de los pacientes estén protegidos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Support;
