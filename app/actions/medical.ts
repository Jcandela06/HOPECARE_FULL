"use server";

import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import {
  DiagnosisSchema,
  LabRequestSchema,
  LabResultSchema,
  PatientBillSchema,
  PaymentSchema,
} from "@/lib/schema";
import { isAuthenticatedUser } from "@/utils/is-authenticated";
import { checkRole } from "@/utils/roles";

export async function addNewDiagnosis(data: any) {
  try {
    const session = await isAuthenticatedUser();

    if (session.role !== "DOCTOR") {
      throw new Error("Unauthorized user");
    }

    const isValidData = DiagnosisSchema.safeParse(data);

    const validatedData = isValidData.data;
    let medicalRecords = null;

    if (!validatedData?.medical_id) {
      medicalRecords = await db.medicalRecords.create({
        data: {
          patient_id: validatedData?.patient_id!,
          doctor_id: data?.doctor_id!,
          appointment_id: data?.appointment_id,
        },
      });
    }

    const med_id = validatedData?.medical_id || medicalRecords?.id;

    const res = await db.diagnosis.create({
      data: {
        ...validatedData!,
        medical_id: Number(med_id!),
      },
    });

    return {
      success: true,
      error: false,
      msg: `Diagnosis added successfully`,
    };
  } catch (error) {
    console.log(error);
    return { success: false, msg: "Internal Server Error" };
  }
}

export async function addNewBill(data: any) {
  try {
    await isAuthenticatedUser();

    const {
      success,
      data: validatedData,
      error: validationError,
    } = PatientBillSchema.safeParse(data);

    if (!success) {
      throw new Error(`Validation failed: ${validationError}`);
    }

    const appointmentId = Number(data?.appointment_id);
    const paymentId = data?.payment_id;
    let billInfo = null;

    const appointment = await db.appointment.findUnique({
      where: { id: appointmentId },
    });
    let paymentInfo = await db.payment.findFirst({
      where: { appointment_id: appointmentId },
    });

    if (!paymentInfo) {
      paymentInfo = await db.payment.create({
        data: {
          appointment_id: appointmentId,
          patient_id: appointment?.patient_id!,
          bill_date: new Date(),
          payment_date: new Date(),
          discount: 0.0,
          amount_paid: 0.0,
          total_amount: 0.0,
        },
      });
    }

    await db.$transaction(async (tx) => {
      const { service_name, service_date, quantity, unit_cost, total_cost } =
        validatedData;

      await tx.patientBills.create({
        data: {
          payment_id: paymentInfo.id,
          service_name,
          service_date: new Date(service_date),
          quantity: Number(quantity),
          unit_cost: Number(unit_cost),
          total_cost: Number(total_cost),
        },
      });

      await tx.payment.update({
        where: { id: paymentInfo.id },
        data: {
          total_amount: paymentInfo.total_amount! + Number(total_cost),
        },
      });
    });

    return {
      success: true,
      error: false,
      msg: `Bill added successfully`,
    };
  } catch (error: any) {
    console.error(`Error in addNewBill: ${error.message || error}`);
    return { success: false, msg: "Internal Server Error" };
  }
}

export async function generateBill(data: any) {
  try {
    await isAuthenticatedUser();

    const isValidData = PaymentSchema.safeParse(data);

    const validatedData = isValidData.data;

    const discountAmount =
      (Number(validatedData?.discount) / 100) *
      Number(validatedData?.total_amount);

    const res = await db.payment.update({
      data: {
        bill_date: validatedData?.bill_date,
        discount: discountAmount,
        total_amount: Number(validatedData?.total_amount)!,
      },
      where: { id: Number(validatedData?.id) },
    });

    await db.appointment.update({
      data: {
        status: "COMPLETED",
      },
      where: { id: res.appointment_id },
    });
    return {
      success: true,
      error: false,
      msg: `Bill generated successfully`,
    };
  } catch (error) {
    console.log(error);
    return { success: false, msg: "Internal Server Error" };
  }
}

export async function addLabRequest(data: any) {
  try {
    await isAuthenticatedUser();

    const isValidData = LabRequestSchema.safeParse(data);

    const validatedData = isValidData.data;
    let medicalRecords = null;

    if (!data?.recordId) {
      medicalRecords = await db.medicalRecords.create({
        data: {
          patient_id: data?.patientId,
          doctor_id: data?.doctorId!,
          appointment_id: data?.appointmentId,
        },
      });
    }

    const med_id = data?.recordId || medicalRecords?.id;

    const labData = validatedData?.testTypes.map((el) => ({
      service_id: Number(el),
      record_id: Number(med_id!),
      patient_id: data?.patientId,
    }));

    console.log(labData);

    await db.labTest.createMany({ data: labData! });

    return {
      success: true,
      error: false,
      msg: `Request successful`,
    };
  } catch (error) {
    console.log(error);
    return { success: false, msg: "Internal Server Error" };
  }
}

export async function addLabResult(data: any) {
  
  try {
    const session = await isAuthenticatedUser();

    if (session.role !== "LABORATORY") {
      throw new Error("Unauthorized");
    }

    const isLabTech = checkRole("LABORATORY");

    if (!isLabTech) {
      return {
        success: false,
        error: true,
        message: "Only laboratory technicians can add lab results",
      };
    }
    const isValidData = LabResultSchema.safeParse(data);

    if (!isValidData.success) {
      return {
        success: false,
        error: true,
        message: "Provide all required fields",
      };
    }

    const validatedData = isValidData.data;

    await db.labTest.update({
      where: { id: Number(validatedData.testId) },
      data: {
        result: validatedData.result,
        test_date: new Date(validatedData?.testDate),
        resultNote: validatedData.notes,
        status: validatedData.status,
      },
    });

    return {
      success: true,
      error: false,
      message: `Result added Successful`,
    };
  } catch (error) {
    console.log(error);
    return { success: false, msg: "Internal Server Error" };
  }
}

export async function createNewDiagnosis(data: {
  patientId: string;
  doctorId: string;
  diagnosis: string;
  medicalId?: string;
  symptoms: string;
  follow_up_plan?: string;
  notes?: string;
  drugs: {
    drugId: string;
    quantity: number;
    instructions?: string;
    frequency?: string;
    duration?: number;
  }[];
}) {
  try {
    const session = await isAuthenticatedUser();

    if (session.role !== "DOCTOR") {
      throw new Error("Unauthorized");
    }

    const diagnosis = await db.diagnosis.create({
      data: {
        patient_id: data.patientId,
        doctor_id: data.doctorId,
        diagnosis: data.diagnosis,
        medical_id: Number(data?.medicalId),
        symptoms: data.symptoms,
        follow_up_plan: data.follow_up_plan,
        notes: data.notes,
      },

      include: {
        medical: {
          select: { appointment_id: true },
        },
      },
    });

    if (data?.drugs.length > 0) {
      const pres = await db.prescription.create({
        data: {
          patientId: data.patientId,
          doctorId: data.doctorId,
          diagnosisId: diagnosis?.id,
          drugs: {
            create: data.drugs,
          },
        },
      });
    }

    revalidatePath(
      `/record/appointments/${diagnosis?.medical?.appointment_id}`
    );
    return { diagnosis };
  } catch (error) {
    console.log(error);
    return { error: "Failed to create prescription" };
  }
}
