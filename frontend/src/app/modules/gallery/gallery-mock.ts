import {GalleryImage} from "@shared/interfaces/gallery";

export const galleryMock = (): GalleryImage[] => {
  const gallery = [];
  for (let i = 0; i < 15; i++) {
    gallery.push({
      _id: `galleryid${i}`,
      title: `Image ${i}`,
      url: 'https://firebasestorage.googleapis.com/v0/b/ns-frontend.appspot.com/o/audiovisual2809.jpeg?alt=media&token=4d9b6a4c-38eb-4416-bf52-2240d9131b6b',
      archiveYear: 2021
    });
  }
  return gallery;
}
