import { LabTest, Patient, Services } from "@prisma/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { format } from "date-fns";

interface ExtendedProps extends LabTest {
  patient: Patient;
  services: Services;
}
export const ViewLabTest = ({ data }: { data: ExtendedProps }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          variant={"link"}
          className="bg-blue-20 text-blue-500 font-normal"
        >
          Vista
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalles de la prueba de laboratorio</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600 dark:text-gray-400">
        Paciente:{" "}
          <strong>
            {data.patient.first_name} {data.patient.last_name}
          </strong>
        </p>
        <p className="text-gray-600 dark:text-gray-400">
        Servicio: {data.services.name}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
        Fecha: {format(data.test_date!, "yyyy-MM-dd h:m a")}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
        Nota: <span className="italic text-sm">{data?.notes || "N/A"}</span>
        </p>
        <p className="text-gray-600 dark:text-gray-400">
        Estado: {data.status}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
        Resultado: {data.result || "N/A"}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
        Notas:{" "}
          <span className="italic text-sm">{data.resultNote || "N/A"}</span>
        </p>

        <DialogClose asChild>
          <Button size={"sm"} variant={"outline"} className="mt-4">
            OK
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
