"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    const form = e.target as HTMLFormElement;
  
    try {
      const result = await emailjs.sendForm(
        "service_ubrpoq3",
        "template_43orias",
        form,
        "8ip_8R4N_MfytAdXd"
      );
      console.log("Correo enviado:", result.text);
      setMessage("Correo enviado con éxito.");
      form.reset();
    } catch (error: any) {
      console.error("Error al enviar el correo:", error);
      setMessage(error?.text || error?.message || "Error desconocido al enviar el correo.");
    } finally {
      setLoading(false); // <- Aquí reiniciamos el estado para que el botón deje de estar en "Enviando..."
    }
  };
  

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl text-gray-600">Ponte en contacto con nuestro equipo</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Card className="p-6">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-6">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input name="name" placeholder="Tu Nombre" required />
                </div>
                <div>
                  <Input type="email" name="email" placeholder="Tu email" required />
                </div>
                <div>
                  <Textarea name="message" placeholder="Tu Mensaje" className="h-32" required />
                </div>
                <Button type="submit" className="w-full bg-customTeal  hover:bg-customTeal  text-white" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar Mensaje"}
                </Button>
              </form>
              {message && <p className="text-center mt-4">{message}</p>}
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-customTeal mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Email</h3>
                <p className="text-gray-600">hopecarececep@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-customTeal  mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Teléfono</h3>
                <p className="text-gray-600">+57 (320) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-customTeal  mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Dirección</h3>
                <p className="text-gray-600">
                  Calle 21 # 53-06
                  <br />
                  Suite 456
                  <br />
                  Cali, Valle del Cauca
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;