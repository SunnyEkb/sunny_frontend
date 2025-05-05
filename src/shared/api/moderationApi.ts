import { BASE_URL } from "../../utils/constans";

export const fetchAds = async () => {
  const adsRequestOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const adsResponse = await fetch(
    `${BASE_URL}moderator/ads/`,
    adsRequestOptions
  );
  if (adsResponse.status === 401) {
    throw new Error("Пользователь не авторизован");
  }
  if (!adsResponse.ok) {
    throw new Error(
      `Ошибка при получении объявлений: ${adsResponse.statusText}`
    );
  }

  return await adsResponse.json();
};

export const fetchServices = async () => {
  const servicesRequestOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const servicesResponse = await fetch(
    `${BASE_URL}moderator/services/`,
    servicesRequestOptions
  );
  if (servicesResponse.status === 401) {
    throw new Error("Пользователь не авторизован");
  }
  if (!servicesResponse.ok) {
    throw new Error(
      `Ошибка при получении услуг: ${servicesResponse.statusText}`
    );
  }

  return await servicesResponse.json();
};


export const fetchComments = async () => {
  const commentsRequestOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const commentsResponse = await fetch(
    `${BASE_URL}moderator/comments/`,
    commentsRequestOptions
  );
  if (commentsResponse.status === 401) {
    throw new Error("Пользователь не авторизован");
  }
  if (!commentsResponse.ok) {
    throw new Error(
      `Ошибка при получении комментариев: ${commentsResponse.statusText}`
    );
  }

  return await commentsResponse.json();
}
