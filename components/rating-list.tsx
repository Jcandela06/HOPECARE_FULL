import { Star } from "lucide-react";
import { Card } from "./ui/card";

interface DataProps {
  id: number;
  staff_id: string;
  rating: number;
  comment?: string;
  created_at: Date | string;
  patient: { last_name: string; first_name: string };
}
export const RatingList = ({ data }: { data: any }) => {
  return (
    <Card>
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold">Reseñas de pacientes</h1>
      </div>

      <div className="space-y-2 p-2">
        {data?.slice(0, 5).map((el: DataProps) => (
          <div
            key={el.id}
            className="even:bg-gray-50 hover:bg-gray-100 dark:even:bg-gray-800/20 p-3 rounded dark:hover:bg-gray-800"
          >
            <div className="flex justify-between">
              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <p className="text-base font-medium">
                  {el.patient.first_name + " " + el.patient.last_name}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  {new Date(el.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="hidden md:flex flex-col items-center">
                <div className="flex items-center text-yellow-600">
                  {Array.from({ length: el.rating }, (_, index) => (
                    <Star key={index} className="text-xs md:text-lg" />
                  ))}
                </div>
                <span className="">{el.rating.toFixed(1)}</span>
              </div>

              <div className="flex gap-1 items-center md:hidden">
                <Star size={20} className="text-yellow-600" />{" "}
                <span className="text-sm">{el.rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{el.comment}</p>
          </div>
        ))}

        {data?.length === 0 && (
          <div className="px-2 text-gray-600">
            <p>Sin reseñas</p>
          </div>
        )}
      </div>
    </Card>
  );
};
