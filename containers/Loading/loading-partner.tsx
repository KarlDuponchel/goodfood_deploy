import { BaseButton } from "@/components/button/Button";
import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import { SidebarPartners } from "@/containers/partners/SidebarPartners";
import { useRouter } from "next/navigation";

export const LoadingPartner = () => {
  const router = useRouter();

  return (
    <>
      <div className="grid min-h-screen w-full grid-cols-6 grid-rows-10 bg-background">
        <SidebarPartners />
        <div className="col-span-5 col-start-2 row-span-8 max-lg:col-start-1">
          loading...
        </div>
      </div>
    </>
  );
};
