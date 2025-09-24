import React from "react";
import styles from "./main.module.scss";
import photoContainer from "../../../assets/PhotoContainer.png";
import { useFormContext, useWatch } from "react-hook-form";
import { IPhoto } from "./CreateAds";

export default function FieldPhoto() {
  const { setValue, control } = useFormContext();
  const photo = useWatch({ control, name: "photo" });

  const addPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const newPhotoUrl = URL.createObjectURL(file);
      const newPhoto = [...photo, { url: newPhotoUrl, file: file }];
      setValue("photo", newPhoto, { shouldValidate: true });
    }
  };

  const removePhoto = (indexToRemove: number) => {
    const newPhoto = photo.filter(
      (_, index: number) => index !== indexToRemove
    );
    setValue("photo", newPhoto, { shouldValidate: true });
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
          {photo.map((item: IPhoto, index: number) => {
            if (item.url != "") {
              return (
                <div
                  key={index}
                  className={styles.photoWrapper}
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <img
                    key={index}
                    src={item.url}
                    alt={"photo"}
                    className={styles.uploadedPhoto}
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
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
