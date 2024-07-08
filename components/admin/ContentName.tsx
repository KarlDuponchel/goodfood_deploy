import { useFetchProductByID } from "@/hooks/catalog/use_fetch_product_by_id";
import { OrderContent } from "@/utils/types";
import { FunctionComponent } from "react";

type ContentNameProps = {
  idContent: number;
};

export const ContentName: FunctionComponent<ContentNameProps> = ({idContent}) => {
    const content = useFetchProductByID(idContent);

    if (!content.data) return <div>Loading...</div>;

    return (
        <span>{content.data.name}</span>
    );
}