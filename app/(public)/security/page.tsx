import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  FileCheck,
  Lock,
  Server,
  Shield,
  UserCheck,
} from "lucide-react";

const Security = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Seguridad</h1>
          <p className="text-xl text-gray-600">
            Medidas de seguridad líderes en la industria para proteger sus datos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-6">
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <Shield className="w-12 h-12 text-customTeal mb-4" />
                <h3 className="text-xl font-semibold mb-2">HIPAA Cumplimiento</h3>
                <p className="text-gray-600">
                  Cumplimiento total de la normativa de protección de datos sanitarios
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <Lock className="w-12 h-12 text-customTeal mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cifrado de datos</h3>
                <p className="text-gray-600">
                  Cifrado de extremo a extremo para toda la información confidencial
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <FileCheck className="w-12 h-12 text-customTeal mb-4" />
                <h3 className="text-xl font-semibold mb-2">Auditorías periódicas</h3>
                <p className="text-gray-600">
                Evaluaciones de seguridad continuas y controles de cumplimiento
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <AlertCircle className="w-12 h-12 text-customTeal mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                Respuesta a incidentes
                </h3>
                <p className="text-gray-600">
                Equipo de respuesta a incidentes y monitoreo de seguridad 24 horas al día, 7 días a la semana
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <Server className="w-12 h-12 text-customTeal mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                Infraestructura segura
                </h3>
                <p className="text-gray-600">
                Infraestructura de nivel empresarial con múltiples redundancias
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <UserCheck className="w-12 h-12 text-customTeal mb-4" />
                <h3 className="text-xl font-semibold mb-2">Control de acceso</h3>
                <p className="text-gray-600">
                Control de acceso basado en roles y autenticación de usuarios
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">
          Nuestro compromiso con la seguridad
          </h2>
          <p className="text-gray-600 mb-8">
          En HopeCare, nos tomamos la seguridad muy en serio. Nuestra plataforma está diseñada con
          múltiples capas de seguridad para garantizar que los datos de su hospital permanezcan
          protegidos. Actualizamos periódicamente nuestras medidas de seguridad para anticiparnos
          a las posibles amenazas y mantener el cumplimiento de los estándares de la industria.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Security;
