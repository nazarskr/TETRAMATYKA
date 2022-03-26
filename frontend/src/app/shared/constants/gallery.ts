import {GALLERY_CONF} from "ngx-image-gallery";
import {GalleryChapter} from '@shared/interfaces/gallery';

export const tetramatykaGallery = {
  galleryConfig: {
    showDeleteControl: false,
    showImageTitle: true,
    reactToKeyboard: true,
    closeOnEsc: true,
    backdropColor: 'black',
    showThumbnails: false
  } as GALLERY_CONF,
}
