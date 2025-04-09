import { getServices } from "@/utils/services/admin";
import { AddServiceDialog } from "../labtest/add-services";
import { ServiceTable } from "../tables/services-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const ServiceSettings = async () => {
  const { data } = await getServices();

  if (!data) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Servicios</CardTitle>
            <CardDescription>
            Gestionar todos los servicios disponibles y sus precios.
            </CardDescription>
          </div>
          <AddServiceDialog />
        </div>
      </CardHeader>
      <CardContent>
        <ServiceTable data={data} />
      </CardContent>
    </Card>
  );
};
