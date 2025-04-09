import { Building } from "lucide-react";

import { ServiceSettings } from "@/components/settings/services-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isAuthenticatedUser } from "@/utils/is-authenticated";

const SystemSettingPage = async () => {
  await isAuthenticatedUser();

  return (
    <div className="container mx-auto py-0">
      <Tabs defaultValue="services" className="space-y-4">
        <TabsList>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Servicio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <ServiceSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettingPage;
