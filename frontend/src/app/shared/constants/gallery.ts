import {GALLERY_CONF} from "ngx-image-gallery";
import {GalleryChapter} from '@shared/interfaces/gallery';

export const tetramatykaGallery = {
  galleryConfig: {
    showDeleteControl: false,
    showImageTitle: true,
    reactToKeyboard: true,
    closeOnEsc: true,
    backdropColor: 'black',
    showThumbnails: true
  } as GALLERY_CONF,
  galleryChapters: [
    {
      title: {en: 'Exhibitions', ua: 'Виставкова частина'},
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/ns-frontend.appspot.com/o/audiovisual2809.jpeg?alt=media&token=4d9b6a4c-38eb-4416-bf52-2240d9131b6b',
      route: 'exhibition',
      isActive: true
    },
    {
      title: {en: 'Performances', ua: 'Перформативна частина'},
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/ns-frontend.appspot.com/o/audiovisual2809.jpeg?alt=media&token=4d9b6a4c-38eb-4416-bf52-2240d9131b6b',
      route: 'performance',
      isActive: false
    },
    {
      title: {en: 'Education', ua: 'Освітня частина'},
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/ns-frontend.appspot.com/o/audiovisual2809.jpeg?alt=media&token=4d9b6a4c-38eb-4416-bf52-2240d9131b6b',
      route: 'education',
      isActive: false
    },
  ] as GalleryChapter[]
}
