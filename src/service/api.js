export const fetchUserImage = (setImageUrl) => {
  fetch("https://picsum.photos/200/300")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      setImageUrl(imageUrl);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};
