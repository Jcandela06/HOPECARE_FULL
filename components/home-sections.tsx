import Link from "next/link";
import { Button } from "./ui/button";
import {
  Activity,
  BriefcaseMedical,
  Heart,
  Hospital,
  Pill,
  Shield,
  User,
  Users,
} from "lucide-react";
import { Card } from "./ui/card";

const features = [
  {
    icon: Hospital,
    title: "Operaciones del hospital",
    description:
      "Optimice las operaciones diarias, la asignación de recursos y la gestión del personal..",
  },
  {
    icon: Shield,
    title: "Seguridad de datos",
    description:
      "Medidas de seguridad compatibles con HIPAA para proteger datos confidenciales de los pacientes.",
  },
  {
    icon: Activity,
    title: "Gestión clínica",
    description:
      "Herramientas integrales para la atención al paciente y la optimización del flujo de trabajo clínico.",
  },
];

const stats = [
  { value: "100+", label: "Hospitales" },
  { value: "10K+", label: "Profesionales de la salud" },
  { value: "1M+", label: "Pacientes atendidos" },
  { value: "99.9%", label: "Tiempo de actividad del sistema" },
];

export const UserSection = () => {
  return (
    <section className="px-6 py-16 ">
      <div className="max-w-6xl mx-auto animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Portales dedicados para cada usuario
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Portal de Admin</h3>
              <p className="text-gray-600 mb-6">
              Acceso seguro para que el administrador gestione los recursos del hospital.
              </p>
              <Button variant="outline">
                <Link href="/sign-in">Admin Login</Link>
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Portal de Doctor</h3>
              <p className="text-gray-600 mb-6">
              Acceso seguro para que los médicos gestionen pacientes, citas, diagnósticos, etc.
              </p>
              <Button variant="outline">
                <Link href="/sign-in">Doctor Login</Link>
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-violet-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Potal de Enfermeras</h3>
              <p className="text-gray-600 mb-6">
              Acceso seguro para que las enfermeras gestionen la atención de los pacientes, los horarios y los
              signos vitales.
              </p>
              <Button variant="outline">
                <Link href="/sign-in">Enfermeras Login</Link>
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Portal de Paciente</h3>
              <p className="text-gray-600 mb-6">
              Fácil acceso para que los pacientes vean citas, registros médicos,
              y más.
              </p>
              <Button variant="outline">
                <Link href="/sign-in">Paciente Login</Link>
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <BriefcaseMedical className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Portal de Laboratorio</h3>
              <p className="text-gray-600 mb-6">
              Acceso seguro para que el staff gestionen la atención al paciente y las pruebas de laboratorio.
              </p>
              <Button variant="outline">
                <Link href="/sign-in">Laboratorio Login</Link>
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Pill className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Portal de Farmacia</h3>
              <p className="text-gray-600 mb-6">
              Acceso seguro para que el personal farmacéutico administren las recetas de los pacientes, el inventario y el dispensario.
              </p>
              <Button variant="outline">
                <Link href="/sign-in">Farmacia Login</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

{
  /* Features Section */
}
export const Features = () => (
  <section className="px-6 py-16">
    <div className="max-w-6xl mx-auto animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Funciones de nivel empresarial
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-customTeal " />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

{
  /* Statistics Section */
}
export const StatsSection = () => (
  <section className="px-6 py-16 bg-customTeal  text-white animate-fade-in">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl font-bold mb-2">{stat.value}</div>
            <div className="text-white-100">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

{
  /* CTA Section */
}
export const CTA = () => {
  return (
    <section className="px-6 py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
        ¿Está listo para transformar su experiencia en el hospital?
        </h2>
        <p className="text-lg mb-8 text-gray-600">
        Aproveche nuestros increíbles servicios y disfrute de una excelente experiencia
        de atención médica en la comodidad de su hogar.
        </p>
        <Button size="lg" className="bg-customTeal  hover:bg-customTeal  text-white">
          <Link href="/sign-up">Comienze Ahora</Link>
        </Button>
      </div>
    </section>
  );
};
