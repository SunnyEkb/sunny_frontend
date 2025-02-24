import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import style from "./filter.module.scss";

export default function Filter() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const handleResetFilters = () => {
    setSelectedFilter(null);
  };

  const handleApplyFilters = () => {
    // Logic to apply filters
    setIsMobileFilterOpen(false);
  };

  return (
    <>
      <div className={`${style.filter} ${style.desktopOnly}`}>
        <h3 className={style.filter__title}>Вид услуги</h3>
        <ul className={style.filter__list}>
          {["Маникюр, педикюр", "Услуги парикмахера", "Ресницы, брови", "Массаж", "Косметология", "Эпиляция", "Макияж", "Другое"].map((filter) => (
            <li
              key={filter}
              className={`${style.filter__item} ${selectedFilter === filter ? style.filter__itemSelected : ""}`}
              onClick={() => handleFilterSelect(filter)}
            >
              {filter}
            </li>
          ))}
        </ul>
        <h3 className={style.filter__title}>Цена</h3>
        <div className={style.filter__priceRange}>
          <input type="text" placeholder="от" className={style.filter__priceInput} />
          <input type="text" placeholder="до" className={style.filter__priceInput} />
        </div>
        <div className={style.filter__buttons}>
          <button className={style.resetButton} onClick={handleResetFilters}>Сбросить</button>
          <button className={style.applyButton} onClick={handleApplyFilters}>Принмать</button>
        </div>
      </div>

      {/* Mobile filter button */}
      <div className={style.mobileFilterButton} onClick={toggleMobileFilter}>
        <FontAwesomeIcon icon={faFilter} />
      </div>

      {/* Mobile filter overlay */}
      <div className={`${style.mobileFilterOverlay} ${isMobileFilterOpen ? style.open : ""}`}>
        <div className={style.mobileFilter}>
          <button className={style.closeButton} onClick={toggleMobileFilter}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h3 className={style.filter__title}>Вид услуги</h3>
          <ul className={style.filter__list}>
            {["Маникюр, педикюр", "Услуги парикмахера", "Ресницы, брови", "Массаж", "Косметология", "Эпиляция", "Макияж", "Другое"].map((filter) => (
              <li
                key={filter}
                className={`${style.filter__item} ${selectedFilter === filter ? style.filter__itemSelected : ""}`}
                onClick={() => handleFilterSelect(filter)}
              >
                {filter}
              </li>
            ))}
          </ul>
          <h3 className={style.filter__title}>Цена</h3>
          <div className={style.filter__priceRange}>
            <input type="text" placeholder="от" className={style.filter__priceInput} />
            <input type="text" placeholder="до" className={style.filter__priceInput} />
          </div>
          <div className={style.filter__buttons}>
            <button className={style.resetButton} onClick={handleResetFilters}>Сбросить</button>
            <button className={style.applyButton} onClick={handleApplyFilters}>Принмать</button>
          </div>
        </div>
      </div>
    </>
  );
}
