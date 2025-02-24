import React from "react";
import { TypeCatalog } from "../TypeCatalog";
import style from "../type.module.scss";
import checkCircle from "../../../../assets/icon/check-circle.svg";

interface Props {
  item: TypeCatalog;
  setSelectedSub: React.Dispatch<React.SetStateAction<TypeCatalog[]>>
  selectedSub: TypeCatalog[]
}

export default function RowCatalog({ item, setSelectedSub, selectedSub }: Props) {
  const [isSelected, setSelected] = React.useState(false);

  function handleSelected() {
    setSelected((prev) => !prev);
  }

  function handleSelectedSub(item: TypeCatalog) {
    if (selectedSub.find((select) => select.id == item.id)) {
      setSelectedSub((prev) => [
        ...prev.filter((select) => select.id !== item.id),
      ]);
    } else {
      setSelectedSub((prev) => [...prev, item]);
    }
  }
  return (
    <div
      key={item.id}
      className={style.itemCatalog}
    >
      <div className={`${style.itemCatalogTitle} ${
        isSelected && style.itemCatalog__active
      }`} onClick={() => handleSelected()}>
        {item.title}
      </div>

      {isSelected && (
        <div className={style.itemListSubCatalog}>
          {item.subcategories &&
            item.subcategories.map((item) => {
              return (
                <div
                  className={style.itemCatalogSub}
                  key={item.id}
                  onClick={() => handleSelectedSub(item)}
                >
                  <div className={style.itemSubCatalogTitle}>{item.title} </div>
                  {selectedSub.find((select) => select.id == item.id) && (
                    <img src={checkCircle} alt="check" />
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
