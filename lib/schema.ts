import { z } from "zod";
import { DrugCategory } from "./types/pharmacy";

export const PatientFormSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(30, "`El nombre debe tener como máximo 30 caracteres."),
  last_name: z
    .string()
    .trim()
    .min(2, "El apellido debe tener al menos 2 caracteres.")
    .max(30, "`El apellido debe tener como máximo 30 caracteres"),
  date_of_birth: z.string().min(1, "Se requiere fecha de nacimiento"),
  gender: z.enum(["MALE", "FEMALE"], { message: "Gender is required!" }),
  phone: z.string().min(10, "Introduzca el número de teléfono"), //.max(10, "Enter phone number"),
  email: z.string().email("Dirección de correo electrónico no válida."),
  address: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(500, "La dirección debe tener como máximo 500 caracteres."),
  marital_status: z.enum(
    ["casado", "soltero", "divorciado", "viudo", "separado"],
    { message: "Se requiere estado civil." }
  ),
  emergency_contact_name: z
    .string()
    .min(2, "Se requiere el nombre del contacto de emergencia.")
    .max(50, "El contacto de emergencia debe tener como máximo 50 caracteres"),
  emergency_contact_number: z.string().min(10, "Introduzca el número de teléfono"),
  // .max(10, "Enter phone number"),
  relation: z.enum(["madre", "padre", "esposo", "esposa", "otro"], {
    message: "Se requiere relación con persona de contacto",
  }),
  blood_group: z.string().optional(),
  allergies: z.string().optional(),
  medical_conditions: z.string().optional(),
  medical_history: z.string().optional(),
  insurance_provider: z.string().optional(),
  insurance_number: z.string().optional(),
  privacy_consent: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "Debe aceptar la política de privacidad.",
    }),
  service_consent: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "Debe aceptar los términos del servicio.",
    }),
  medical_consent: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "Debe aceptar los términos del tratamiento médico.",
    }),
  img: z.string().optional(),
  primaryPhysician: z.string().optional(),
});

export const workingDaySchema = z.object({
  day: z.enum([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]),
  start_time: z.string(),
  close_time: z.string(),
});

export const DoctorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre debe tener como máximo 50 caracteres."),
  phone: z.string().min(10, "Introduzca el número de teléfono").max(10, "Introduzca el número de teléfono"),
  email: z.string().email("Dirección de correo electrónico no válida."),
  address: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(500, "La dirección debe tener como máximo 500 caracteres."),
  specialization: z.string().min(2, "Se requiere especialización."),
  license_number: z.string().min(2, "Se requiere número de licencia"),
  type: z.enum(["FULL", "PART"], { message: "El tipo es obligatorio." }),
  department: z.string().min(2, "Se requiere departamento."),
  img: z.string().optional(),
  password: z
    .string()
    .min(8, { message: "¡La contraseña debe tener al menos 8 caracteres!" })
    .optional()
    .or(z.literal("")),
});
export const WorkingDaysSchema = z.array(workingDaySchema).optional();

export const StaffSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre debe tener como máximo 50 caracteres."),
    role: z.enum(["NURSE", "LABORATORY", "PHARMACY", "ACCOUNT"], {
      message: "Role is required.",
    }),
  phone: z
    .string()
    .min(10, "El contacto debe tener 10 dígitos")
    .max(10, "El contacto debe tener 10 dígitos"),
  email: z.string().email("Dirección de correo electrónico no válida."),
  address: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(500, "La dirección debe tener como máximo 500 caracteres."),
  license_number: z.string().optional(),
  department: z.string().optional(),
  img: z.string().optional(),
  password: z
    .string()
    .min(8, { message: "¡La contraseña debe tener al menos 8 caracteres!" })
    .optional()
    .or(z.literal("")),
});

export const AppointmentSchema = z.object({
  doctor_id: z.string().min(1, "Seleccione un médico"),
  type: z.string().min(1, "Seleccione el tipo de cita"),
  appointment_date: z.string().min(1, "Seleccione la fecha de la cita"),
  time: z.string().min(1, "Seleccione la hora de la cita"),
  note: z.string().optional(),
});

export const VitalSignsSchema = z.object({
  patient_id: z.string(),
  medical_id: z.string(),

  body_temperature: z.coerce
    .number({
      message: "Ingrese la temperatura corporal registrada",
    })
    .min(1, { message: "La temperatura corporal debe ser mayor a 0" }),

  heartRate: z.string().min(1, "Introduzca la frecuencia cardíaca registrada"),

  systolic: z.coerce
    .number({
      message: "Ingrese la presión arterial sistólica registrada",
    })
    .min(1, { message: "La presión arterial sistólica debe ser mayor que 0" }),

  diastolic: z.coerce
    .number({
      message: "Ingrese la presión arterial diastólica registrada",
    })
    .min(1, { message: "La presión arterial diastólica debe ser mayor que 0" }),


  respiratory_rate: z.coerce
    .number()
    // .min(1, { message: "Respiratory rate must be greater than 0" })
    .optional(),

  oxygen_saturation: z.coerce
    .number()
    // .min(1, { message: "Oxygen saturation must be greater than 0" })
    .optional(),

  weight: z.coerce
    .number({
      message: "Enter recorded weight (Kg)",
    })
    .min(1, { message: "Weight must be greater than 0" }),

  height: z.coerce
    .number({
      message: "Enter recorded height (Cm)",
    })
    .min(1, { message: "Height must be greater than 0" }),
});

export const DiagnosisSchema = z.object({
  patient_id: z.string(),
  medical_id: z.string(),
  doctor_id: z.string(),
  symptoms: z.string({ message: "Symptoms required" }),
  diagnosis: z.string({ message: "Diagnosis required" }),
  notes: z.string().optional(),
  prescribed_medications: z.string().optional(),
  follow_up_plan: z.string().optional(),
});

export const ServicesSchema = z.object({
  name: z.string().min(2, {
    message: "Service name must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  tat: z.string().min(1, {
    message: "Turn around time is required.",
  }),
  description: z.string().optional(),
  department: z.enum(["GENERAL", "LABORATORY"]).default("GENERAL"),
});

export const PaymentSchema = z.object({
  id: z.string(),
  bill_date: z.coerce.date(),
  discount: z.string({ message: "discount" }),
  total_amount: z.string(),
});

export const PatientBillSchema = z.object({
  payment_id: z.string(),
  service_name: z.string(),
  service_date: z.string(),
  appointment_id: z.string(),
  quantity: z.string({ message: "Quantity is required" }),
  unit_cost: z.string({ message: "Unit cost is required" }),
  total_cost: z.string({ message: "Total cost is required" }),
});

export const LabRequestSchema = z.object({
  patientName: z.string().min(2, "Patient name must be at least 2 characters"),
  recordId: z.string().min(1, "Medical ID is required"),
  patientId: z.string().min(1, "Patient ID is required"),
  age: z.string().min(1, "Age must be a positive number"),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender",
  }),
  testTypes: z.array(z.string()).min(1, "Please select at least one test type"),
  priority: z.enum(["routine", "urgent", "stat"], {
    required_error: "Please select priority level",
  }),
  requestDate: z.string().min(1, "Request date is required"),
  specialInstructions: z.string().optional(),
});

export const LabResultSchema = z.object({
  testId: z.string().min(1, "Test ID is required"),
  testDate: z.string().min(1, "Test date is required"),
  result: z.string().min(1, "Result is required"),
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED"], {
    message: "Status is required!",
  }),
  notes: z.string().optional(),
});

export const drugSchema = z.object({
  name: z.string().min(1, "Drug name is required"),
  category: z.nativeEnum(DrugCategory, {
    required_error: "Category is required",
  }),
  batchNumber: z.string().min(1, "Batch number is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  quantity: z.number().min(0, "Quantity must be 0 or greater"),
  pricePerUnit: z.number().min(0, "Price must be 0 or greater"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  description: z.string().optional(),
});

export const invoiceSchema = z.object({
  providerName: z.string().min(1, "Provider name is required"),
  purchaseDate: z.date(),
  notes: z.string().optional(),
});



// import { z } from "zod";
// import { DrugCategory } from "./types/pharmacy";
// import { Role } from "@prisma/client";

// export const PatientFormSchema = z.object({
//   first_name: z
//     .string()
//     .trim()
//     .min(2, "El nombre debe tener al menos 2 caracteres.")
//     .max(30, "`El nombre debe tener como máximo 30 caracteres."),
//   last_name: z
//     .string()
//     .trim()
//     .min(2, "El apellido debe tener al menos 2 caracteres.")
//     .max(30, "`El apellido debe tener como máximo 30 caracteres"),
//   date_of_birth: z.string().min(1, "Se requiere fecha de nacimiento"),
//   gender: z.enum(["masculino", "femenino"], { message: "¡Se requiere género!" }),
//   phone: z.string().min(10, "Introduzca el número de teléfono"), //.max(10, "Enter phone number"),
//   email: z.string().email("Dirección de correo electrónico no válida."),
//   address: z
//     .string()
//     .min(5, "La dirección debe tener al menos 5 caracteres")
//     .max(500, "La dirección debe tener como máximo 500 caracteres."),
//   marital_status: z.enum(
//     ["casado", "soltero", "divorciado", "viudo", "separado"],
//     { message: "Se requiere estado civil." }
//   ),
//   emergency_contact_name: z
//     .string()
//     .min(2, "Se requiere el nombre del contacto de emergencia.")
//     .max(50, "El contacto de emergencia debe tener como máximo 50 caracteres"),
//   emergency_contact_number: z.string().min(10, "Introduzca el número de teléfono"),
//   // .max(10, "Enter phone number"),
//   relation: z.enum(["madre", "padre", "esposo", "esposa", "otro"], {
//     message: "Se requiere relación con persona de contacto",
//   }),
//   blood_group: z.string().optional(),
//   allergies: z.string().optional(),
//   medical_conditions: z.string().optional(),
//   medical_history: z.string().optional(),
//   insurance_provider: z.string().optional(),
//   insurance_number: z.string().optional(),
//   privacy_consent: z
//     .boolean()
//     .default(false)
//     .refine((val) => val === true, {
//       message: "Debe aceptar la política de privacidad.",
//     }),
//   service_consent: z
//     .boolean()
//     .default(false)
//     .refine((val) => val === true, {
//       message: "Debe aceptar los términos del servicio.",
//     }),
//   medical_consent: z
//     .boolean()
//     .default(false)
//     .refine((val) => val === true, {
//       message: "Debe aceptar los términos del tratamiento médico.",
//     }),
//   img: z.string().optional(),
//   primaryPhysician: z.string().optional(),
// });

// export const workingDaySchema = z.object({
//   day: z.enum([
//     "monday",
//     "tuesday",
//     "wednesday",
//     "thursday",
//     "friday",
//     "saturday",
//     "sunday",
//   ]),
//   start_time: z.string(),
//   close_time: z.string(),
// });

// export const DoctorSchema = z.object({
//   name: z
//     .string()
//     .trim()
//     .min(2, "El nombre debe tener al menos 2 caracteres")
//     .max(50, "El nombre debe tener como máximo 50 caracteres."),
//   phone: z.string().min(10, "Introduzca el número de teléfono").max(10, "Introduzca el número de teléfono"),
//   email: z.string().email("Dirección de correo electrónico no válida."),
//   address: z
//     .string()
//     .min(5, "La dirección debe tener al menos 5 caracteres")
//     .max(500, "La dirección debe tener como máximo 500 caracteres."),
//   specialization: z.string().min(2, "Se requiere especialización."),
//   license_number: z.string().min(2, "Se requiere número de licencia"),
//   type: z.enum(["FULL", "PART"], { message: "El tipo es obligatorio." }),
//   department: z.string().min(2, "Se requiere departamento."),
//   img: z.string().optional(),
//   password: z
//     .string()
//     .min(8, { message: "¡La contraseña debe tener al menos 8 caracteres!" })
//     .optional()
//     .or(z.literal("")),
// });
// export const WorkingDaysSchema = z.array(workingDaySchema).optional();

// export const StaffSchema = z.object({
//   name: z
//     .string()
//     .trim()
//     .min(2, "El nombre debe tener al menos 2 caracteres")
//     .max(50, "El nombre debe tener como máximo 50 caracteres."),
//     role: z.nativeEnum(Role, {
//       message: "Se requiere rol.",
//     }),
//   phone: z
//     .string()
//     .min(10, "El contacto debe tener 10 dígitos")
//     .max(10, "El contacto debe tener 10 dígitos"),
//   email: z.string().email("Dirección de correo electrónico no válida."),
//   address: z
//     .string()
//     .min(5, "La dirección debe tener al menos 5 caracteres")
//     .max(500, "La dirección debe tener como máximo 500 caracteres."),
//   license_number: z.string().optional(),
//   department: z.string().optional(),
//   img: z.string().optional(),
//   password: z
//     .string()
//     .min(8, { message: "¡La contraseña debe tener al menos 8 caracteres!" })
//     .optional()
//     .or(z.literal("")),
// });

// export const AppointmentSchema = z.object({
//   doctor_id: z.string().min(1, "Seleccione un médico"),
//   type: z.string().min(1, "Seleccione el tipo de cita"),
//   appointment_date: z.string().min(1, "Seleccione la fecha de la cita"),
//   time: z.string().min(1, "Seleccione la hora de la cita"),
//   note: z.string().optional(),
// });

// export const VitalSignsSchema = z.object({
//   patient_id: z.string(),
//   medical_id: z.string(),

//   body_temperature: z.coerce
//     .number({
//       message: "Ingrese la temperatura corporal registrada",
//     })
//     .min(1, { message: "La temperatura corporal debe ser mayor a 0" }),

//   heartRate: z.string().min(1, "Introduzca la frecuencia cardíaca registrada"),

//   systolic: z.coerce
//     .number({
//       message: "Ingrese la presión arterial sistólica registrada",
//     })
//     .min(1, { message: "La presión arterial sistólica debe ser mayor que 0" }),

//   diastolic: z.coerce
//     .number({
//       message: "Ingrese la presión arterial diastólica registrada",
//     })
//     .min(1, { message: "La presión arterial diastólica debe ser mayor que 0" }),

//   respiratory_rate: z.coerce
//     .number()
//     // .min(1, { message: "Respiratory rate must be greater than 0" })
//     .optional(),

//   oxygen_saturation: z.coerce
//     .number()
//     // .min(1, { message: "Oxygen saturation must be greater than 0" })
//     .optional(),

//   weight: z.coerce
//     .number({
//       message: "Ingrese el peso registrado (Kg)",
//     })
//     .min(1, { message: "El peso debe ser mayor que 0" }),

//   height: z.coerce
//     .number({
//       message: "Introduzca la altura registrada (Cm)",
//     })
//     .min(1, { message: "La altura debe ser mayor que 0" }),
// });

// export const DiagnosisSchema = z.object({
//   patient_id: z.string(),
//   medical_id: z.string(),
//   doctor_id: z.string(),
//   symptoms: z.string({ message: "Síntomas requeridos" }),
//   diagnosis: z.string({ message: "Se requiere diagnóstico" }),
//   notes: z.string().optional(),
//   prescribed_medications: z.string().optional(),
//   follow_up_plan: z.string().optional(),
// });

// export const ServicesSchema = z.object({
//   name: z.string().min(2, {
//     message: "El nombre del servicio debe tener al menos 2 caracteres.",
//   }),
//   category: z.string().min(2, {
//     message: "La categoría debe tener al menos 2 caracteres.",
//   }),
//   price: z.string().min(1, {
//     message: "Se requiere precio.",
//   }),
//   tat: z.string().min(1, {
//     message: "Se requiere tiempo de respuesta.",
//   }),
//   description: z.string().optional(),
//   department: z.enum(["GENERAL", "LABORATORIO"]).default("GENERAL"),
// });

// export const PaymentSchema = z.object({
//   id: z.string(),
//   bill_date: z.coerce.date(),
//   discount: z.string({ message: "descuento" }),
//   total_amount: z.string(),
// });

// export const PatientBillSchema = z.object({
//   payment_id: z.string(),
//   service_name: z.string(),
//   service_date: z.string(),
//   appointment_id: z.string(),
//   quantity: z.string({ message: "Se requiere cantidad" }),
//   unit_cost: z.string({ message: "Se requiere el costo unitario" }),
//   total_cost: z.string({ message: "Se requiere el costo total" }),
// });

// export const LabRequestSchema = z.object({
//   patientName: z.string().min(2, "El nombre del paciente debe tener al menos 2 caracteres"),
//   recordId: z.string().min(1, "Se requiere identificación médica"),
//   patientId: z.string().min(1, "Se requiere identificación del paciente"),
//   age: z.string().min(1, "La edad debe ser un número positivo"),
//   gender: z.enum(["masculino", "femenino"], {
//     required_error: "Por favor seleccione un género",
//   }),
//   testTypes: z.array(z.string()).min(1, "Seleccione al menos un tipo de prueba"),
//   priority: z.enum(["rutina", "urgente", "estadística"], {
//     required_error: "Por favor seleccione el nivel de prioridad",
//   }),
//   requestDate: z.string().min(1, "La fecha de solicitud es obligatoria"),
//   specialInstructions: z.string().optional(),
// });

// export const LabResultSchema = z.object({
//   testId: z.string().min(1, "Se requiere identificación de prueba"),
//   testDate: z.string().min(1, "Se requiere la fecha del examen"),
//   result: z.string().min(1, "Se requiere resultado"),
//   status: z.enum(["PENDING", "COMPLETED", "CANCELLED"], {
//     message: "¡Se requiere estado!",
//   }),
//   notes: z.string().optional(),
// });

// export const drugSchema = z.object({
//   name: z.string().min(1, "Se requiere el nombre del medicamento"),
//   category: z.nativeEnum(DrugCategory, {
//     required_error: "La categoría es obligatoria",
//   }),
//   batchNumber: z.string().min(1, "Se requiere el número de lote"),
//   manufacturer: z.string().min(1, "Se requiere fabricante"),
//   quantity: z.number().min(0, "La cantidad debe ser 0 o mayor"),
//   pricePerUnit: z.number().min(0, "El precio debe ser 0 o mayor"),
//   expiryDate: z.string().min(1, "Se requiere fecha de caducidad"),
//   description: z.string().optional(),
// });

// export const invoiceSchema = z.object({
//   providerName: z.string().min(1, "El nombre del proveedor es obligatorio"),
//   purchaseDate: z.date(),
//   notes: z.string().optional(),
// });
