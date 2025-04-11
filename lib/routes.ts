type RouteAccessProps = {
  [key: string]: string[];
};
const ALL_LEVEL = [
  "patient",
  "admin",
  "doctor",
  "nurse",
  "pharmacy",
  "account",
];
export const routeAccess: RouteAccessProps = {
  "/admin(.*)": ["admin"],
  "/patient/registration": ["patient"],
  "/patient(.*)": [
    "patient",
    "admin",
    "doctor",
    "nurse",
    "pharmacy",
    "account",
  ],
  "/record/doctors(.*)": ["admin", "doctor", "nurse"],
  "/doctor(.*)": ["doctor"],
  "/diagnosis(.*)": ["doctor"],
  "/pharmacy/invoices": ["pharmacy", "admin", "account"],
  "/pharmacy(.*)": ["pharmacy", "admin"],
  "/laboratory(.*)": ["laboratory"],
  "/staff(.*)": ["nurse", "cashier"],
  "/record/users": ["admin"],
  "/record/doctors": ["admin"],
  "/record/staffs": ["admin", "doctor"],
  "/record/patients": [
    "admin",
    "doctor",
    "nurse",
    "laboratory",
    "pharmacy",
    "account",
  ],
  "/record/leaves": ["doctor", "nurse", "laboratory", "pharmacy", "account"],
  "/record/billing": ["doctor", "admin", "account"],
  "/record/payments": ["admin", "account"],
  "/record/available-doctors": ["admin", "patient"],
  "/notifications": ALL_LEVEL,
  "/record/appointments": ["admin", "doctor", "nurse", "patient"],
};
