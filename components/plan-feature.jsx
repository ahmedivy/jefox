import { AiFillQuestionCircle } from "react-icons/ai";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function PlanFeature({ name, price, description }) {
  return (
    <div className="flex justify-between text-md md:text-md">
      <IoCheckmarkDoneCircleSharp className="h-5 w-5 text-green-500 md:w-6 md:h-6" />
      <div className="flex gap-1 md:gap-2 w-full px-4">
        <p className="">{name}</p>
        <p className="">$ {price}</p>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <AiFillQuestionCircle className="h-5 w-5 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="wrap w-[200px]">{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default PlanFeature;
