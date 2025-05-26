import { getRole } from "@/utils/roles";
import {
  Bell,
  ClipboardPlus,
  LayoutDashboard,
  List,
  ListOrdered,
  Logs,
  LucideIcon,
  Pill,
  Receipt,
  Settings,
  SquareActivity,
  User,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "./logout-button";
import { Card } from "./ui/card";
import Image from "next/image";

const ACCESS_LEVELS_ALL = [
  "admin",
  "doctor",
  "nurse",
  "laboratory",
  "patient",
  "pharmacy",
  "account",
];

const STAFF_ONLY = [
  "admin",
  "doctor",
  "nurse",
  "laboratory",
  "pharmacy",
  "account",
];

const SidebarIcon = ({ Icon }: { Icon: LucideIcon }) => {
  return <Icon className="size-6 lg:size-5" />;
};

export const LogoLink = () => (
  <div className="flex items-center justify-center lg:justify-start gap-2">
    <Link href="/" className="flex items-center gap-2">
      <div className="p-1.5 rounded-md bg-customTeal text-white">
        <SquareActivity size={22} />
      </div>
      <span className="hidden lg:flex text-base 2xl:text-xl font-bold">
        HOPECARE
      </span>
    </Link>
  </div>
);
export const Sidebar = async () => {
  const role = await getRole();

  const SIDEBAR_LINKS = [
    {
      label: "MENU",
      links: [
        {
          name: "Panel",
          href: `/${role.toLowerCase()}`,
          access: ACCESS_LEVELS_ALL,
          icon: LayoutDashboard,
        },
        {
          name: "Perfil",
          href: "/patient/self",
          access: ["patient"],
          icon: User,
        },
      ],
    },
    {
      label: "Administrar",
      links: [
        {
          name: "Usuarios",
          href: "/record/users",
          access: ["admin"],
          icon: Users,
        },
        {
          name: "Doctores",
          href: "/record/doctors",
          access: ["admin", "nurse"],
          icon: User,
        },
        {
          name: "Personal",
          href: "/record/staffs",
          access: ["admin", "doctor"],
          icon: UserRound,
        },
        {
          name: "Pacientes",
          href: "/record/patients",
          access: STAFF_ONLY,
          icon: UsersRound,
        },
        {
          name: "Citas",
          href: "/record/appointments",
          access: ["admin", "doctor", "nurse"],
          icon: ListOrdered,
        },
        {
          name: "Recetas",
          href: "/pharmacy/prescriptions",
          access: ["admin", "pharmacy"],
          icon: ClipboardPlus,
        },
        {
          name: "Medicamentos",
          href: "/pharmacy/drugs",
          access: ["admin", "pharmacy"],
          icon: Pill,
        },
        {
          name: "Historial Médico",
          href: "/record/medical-records",
          access: ["admin", "doctor", "nurse", "laboratory", "pharmacy"],
          icon: SquareActivity,
        },
        {
          name: "Facturación General",
          href: "/record/billing",
          access: ["admin", "doctor", "account"],
          icon: Receipt,
        },
        {
          name: "Pagos Recibidos",
          href: "/record/payments",
          access: ["admin", "account"],
          icon: Receipt,
        },
        {
          name: "Citas",
          href: "/record/appointments",
          access: ["patient"],
          icon: ListOrdered,
        },
        {
          name: "Doctores",
          href: "/record/available-doctors",
          access: ["patient"],
          icon: Users,
        },
        {
          name: "Archivos",
          href: "/patient/self",
          access: ["patient"],
          icon: List,
        },
        /*{
          name: "Prescripción",
          href: "/patient/self#",
          access: ["patient"],
          icon: Pill,
        },*/
        {
          name: "Facturación",
          href: "/patient/self?cat=payments",
          access: ["patient"],
          icon: Receipt,
        },
        {
          name: "Dias Libres",
          href: "/admin/leaves",
          access: ["admin"],
          icon: List,
        },
        {
          name: "Dias Libres",
          href: "/record/leaves",
          access: STAFF_ONLY.slice(1),
          icon: List,
        },
        {
          name: "Facturas",
          href: "/pharmacy/invoices",
          access: ["admin", "pharmacy", "account"],
          icon: List,
        },
      ],
    },
    {
      label: "Sistema",
      links: [
        {
          name: "Notificaciones",
          href: "/notifications",
          access: ACCESS_LEVELS_ALL,
          icon: Bell,
        },
        {
          name: "Registros de auditoría",
          href: "/admin/audit-logs",
          access: ["admin"],
          icon: Logs,
        },
        {
          name: "Ajustes",
          href: "/admin/system-settings",
          access: ["admin"],
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <Card className="h-full p-4 flex flex-col justify-between gap-4 overflow-y-scroll">
      <div className="">
        <LogoLink />
        <div className="mt-4 text-sm ">
          {SIDEBAR_LINKS.map((i) => (
            <div className="flex flex-col gap-2" key={i.label}>
              <span className="hidden uppercase lg:block text-foreground font-light my-4">
                {i.label}
              </span>
              {i.links.map((item) => {
                if (item?.access?.includes(role?.toLowerCase())) {
                  return (
                    <Link
                      href={item.href}
                      key={item.name}
                      className="flex items-center justify-center lg:justify-start gap-4 text-muted-foreground py-2 md:px-2 rounded-md hover:bg-blue-600/10"
                    >
                      <SidebarIcon Icon={item?.icon} />
                      <span className="hidden lg:block">{item.name}</span>
                    </Link>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>
      <LogoutButton />
    </Card>
  );
};
