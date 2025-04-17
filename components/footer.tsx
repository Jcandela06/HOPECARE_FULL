import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="px-6 py-12 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold mb-4">HOPECARE</h3>
          <p className="text-sm">
            "Uniendo conocimiento y corazón en el cuidado de la glucogenosis."
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Compañia</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contactanos
              </Link>
            </li>
            <li>
              <Link
                href="/features"
                className="hover:text-white transition-colors"
              >
                Características
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Soporte</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/support"
                className="hover:text-white transition-colors"
              >
                Centro de Ayuda
              </Link>
            </li>
            <li>
              <Link
                href="/security"
                className="hover:text-white transition-colors"
              >
                Seguridad
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/politicas-y-privacidad.pdf"
                download
                className="hover:text-white transition-colors"
              >
                Política y Privacidad
              </a>
            </li>

            <li>
              <a
                href="/terminos-y-condiciones.pdf"
                download
                className="hover:text-white transition-colors"
              >
                Términos y Condiciones
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-sm">
        <p>
          &copy; 2025 HopeCare Hospital Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
