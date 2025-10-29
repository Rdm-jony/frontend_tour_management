import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";

import NextJsImage from './NextJsImage';

const ImageGallery = ({ open, setOpen, images }: { open: boolean, setOpen: (param: boolean) => void, images: string[] }) => {

    return (
        <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={images.map((src) => ({ src }))}
            render={{ slide: NextJsImage }}
        />
    );
};

export default ImageGallery;
