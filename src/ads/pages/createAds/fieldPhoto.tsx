import React from "react";
import styles from "./main.module.scss";
import photoContainer from "../../../assets/PhotoContainer.png";
import { useFieldArray, useFormContext } from "react-hook-form";
import { BaseForm } from "./CreateAds";

export default function FieldPhoto() {
  const { control } = useFormContext<BaseForm>();
  const {
    fields: photo,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "photo",
  });

  const addPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const newPhotoUrl = URL.createObjectURL(file);
      append({ url: newPhotoUrl, file: file });
    }
  };

  const removePhoto = (indexToRemove: number) => {
    remove(indexToRemove);
  };

  return (
    <div>
      <h2 className={styles.titlePhotoSection}> Фото</h2>
      <div className={styles.sectionPhoto}>
        <img
          className={styles.buttonPhoto}
          src={photoContainer}
          alt={"photo"}
          onClick={() => document.getElementById("fileInput")!.click()}
        />
        <input
          id="fileInput"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => addPhoto(e)}
        />
        <div className={styles.photoGallery}>
          {photo.map((item) => {
            if (item.url != "") {
              return (
                <div
                  key={item.id}
                  className={styles.photoWrapper}
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <img
                    src={item.url}
                    alt={"photo"}
                    className={styles.uploadedPhoto}
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(Number(item.id))}
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      background: "rgba(0,0,0,0.5)",
                      border: "none",
                      borderRadius: "50%",
                      color: "white",
                      width: 24,
                      height: 24,
                      cursor: "pointer",
                    }}
                    aria-label="Удалить фото"
                  >
                    ×
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
